import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem, Cost, Duration } from "./types/common-types";
import { APP_BASE_URL, CURRENCY_EXCHANGE_API_KEY } from "@/app.config";
import {
  ExperienceExtras,
  ExperienceOptions,
  ExperienceTypes,
} from "./types/experience-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFilteredItems = (
  items: CartItem[],
  itemType: "EXPERIENCE" | "MERCHANDISE" | "VOUCHER" | "EVENT" | "RENTAL"
) => {
  return items.filter((item: CartItem) => item.itemType === itemType);
};

export const calcOffer = (price: number, offer: number) => {
  return price * (1 - offer / 100);
};

export async function convertLKRtoUSD(LKR: number) {
  const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${CURRENCY_EXCHANGE_API_KEY}&symbols=LKR,USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rateLKRtoEUR = 1 / data.rates.LKR;
    const rateEURtoUSD = data.rates.USD;
    const USD = LKR * rateLKRtoEUR * rateEURtoUSD;
    return USD;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const getCurrentDate = (separator = "") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
};

export const formatDate = (inputDate: Date | string) => {
  const temp = inputDate.toString();
  const dateParts = temp.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${day} ${months[Number(month) - 1]} ${year}`;
  return formattedDate;
};

export const incrementOrderId = (orderId: string) => {
  const parts = orderId.split("-");
  const numberPart = parseInt(parts[1]);
  const maxNumberPart = 99999999;
  if (numberPart >= maxNumberPart) {
    throw new Error("Maximum orderId value reached.");
  }
  const nextNumberPart = numberPart + 1;
  const nextOrderId = `zri-${nextNumberPart.toString().padStart(8, "0")}`;

  return nextOrderId;
};

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  body: string
) {
  return fetch(APP_BASE_URL + "/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipientEmail,
      subject,
      body,
    }),
  });
}

export function generateVoucherCode() {
  var voucher_codes = require("voucher-code-generator");

  return voucher_codes.generate({
    pattern: "####-####-####",
  });
}

export const getExperiencePrices = (
  duration: Duration,
  pax: number,
  options: any[]
) => {
  if (!duration || pax === null) {
    return null;
  }

  const selectedOption = options.find(
    (option: ExperienceOptions) =>
      option.duration.type === duration.type &&
      option.duration.amount === duration.amount
  );

  if (!selectedOption) {
    return null;
  }

  let matchingPaxRate = selectedOption.paxRates[0];
  for (const rate of selectedOption.paxRates) {
    if (pax >= rate.minPax) {
      matchingPaxRate = rate;
    } else {
      break;
    }
  }

  const { USD, LKR } = matchingPaxRate.rates;
  const childCostReduction = selectedOption.childCostReduction;

  return {
    adult: { USD, LKR },
    child: {
      USD: USD - childCostReduction.USD,
      LKR: LKR - childCostReduction.LKR,
    },
  };
};

export const getExperienceTotal = (
  experience: ExperienceTypes,
  duration: Duration,
  adults: number,
  child: number,
  extras: ExperienceExtras[]
) => {
  const pax = adults + child;
  const rates = getExperiencePrices(duration, pax, experience.options);

  let total: Cost = { USD: 0, LKR: 0 };

  if (rates) {
    total.USD = rates.adult.USD * adults + rates.child.USD * child;
    total.LKR = rates.adult.LKR * adults + rates.child.LKR * child;
  }

  extras.forEach((extra) => {
    total.USD += extra.cost.USD * extra.quantity;
    total.LKR += extra.cost.LKR * extra.quantity;
  });

  if (experience.offer) {
    total.LKR = calcOffer(total.LKR, experience.offer);
    total.USD = calcOffer(total.USD, experience.offer);
  }

  return total;
};
