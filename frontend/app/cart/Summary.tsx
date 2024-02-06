import MainButton from "@/components/common/MainButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/contexts/checkout-context";
import { getExperienceTotal } from "@/contexts/experience-context";
import { useLocal } from "@/contexts/local-context";
import { cn } from "@/lib/utils";
import { validateVoucherId } from "@/lib/utils/strapi-utils";
import { calcOffer, formatDate } from "@/lib/utils/func";
import { EventCart } from "@/types/eventTypes";
import { ExperienceCart } from "@/types/experienceTypes";
import { MerchandiseCart } from "@/types/merchandiseTypes";
import { RentalCart } from "@/types/rentalTypes";
import { VoucherCart } from "@/types/voucherTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  cartItems: any;
}

const Summary = ({ cartItems }: Props) => {
  const { local } = useLocal();
  const { setItems, editPaymentStatus, paymentStatus, setVoucherAdded } =
    useCheckout();
  const [total, setTotal] = useState({ USD: 0, LKR: 0 });
  const [experienceTotal, setExperienceTotal] = useState({ USD: 0, LKR: 0 });
  const [merchTotal, setMerchTotal] = useState({ USD: 0, LKR: 0 });
  const [rentalTotal, setRentalTotal] = useState({ USD: 0, LKR: 0 });
  const [eventTotal, setEventTotal] = useState({ USD: 0, LKR: 0 });
  const [voucherTotal, setVoucherTotal] = useState({ USD: 0, LKR: 0 });
  const [shippingTotal, setShippingTotal] = useState({ USD: 0, LKR: 0 });
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState({ id: 0, USD: 0, LKR: 0 });

  const handleCouponClaim = async () => {
    const response = await validateVoucherId(couponCode, local);
    if (response === "Valid") {
      const temp = localStorage.getItem("Coupon");
      if (temp) {
        const coupon = JSON.parse(temp);
        if (coupon.currency === "USD") {
          setCoupon({
            id: coupon.id,
            USD: coupon.amount,
            LKR: 0,
          });
        } else if (coupon.currency === "LKR") {
          setCoupon({
            id: coupon.id,
            USD: 0,
            LKR: coupon.amount,
          });
        }
        toast.success("Your coupon is added!");
      }
    } else {
      toast.error("An error occured: " + response);
    }
  };

  const getFilteredItems = (
    itemType: "EXPERIENCE" | "MERCHANDISE" | "VOUCHER" | "EVENT" | "RENTAL"
  ) => {
    return cartItems.filter((item: any) => item.itemType === itemType);
  };

  const calculateExperienceTotal = () => {
    let tempUSD: number = 0;
    let tempLKR: number = 0;

    const experiences: ExperienceCart[] = getFilteredItems("EXPERIENCE");

    experiences.forEach((item: ExperienceCart) => {
      const experienceTotalItem = getExperienceTotal(
        item.item.experience,
        item.item.duration,
        item.item.adults,
        item.item.children,
        item.item.extras
      );

      tempUSD += experienceTotalItem.USD;
      tempLKR += experienceTotalItem.LKR;
    });

    setExperienceTotal({ USD: tempUSD, LKR: tempLKR });
  };

  const calculateEventTotal = () => {
    let tempUSD: number = 0;
    let tempLKR: number = 0;

    const events: EventCart[] = getFilteredItems("EVENT");

    events.forEach((item: EventCart) => {
      tempUSD += item.item.event.cost.USD * item.item.info.pax;
      tempLKR += item.item.event.cost.LKR * item.item.info.pax;
    });

    setEventTotal({ USD: tempUSD, LKR: tempLKR });
  };

  const calculateMerchTotal = () => {
    let tempUSD: number = 0;
    let tempLKR: number = 0;

    const merch: MerchandiseCart[] = getFilteredItems("MERCHANDISE");

    merch.forEach((item: MerchandiseCart) => {
      if (item.item.merchandise.offer) {
        tempUSD += calcOffer(
          item.item.selectedOption.cost.USD * item.item.quantity,
          item.item.merchandise.offer
        );
        tempLKR += calcOffer(
          item.item.selectedOption.cost.LKR * item.item.quantity,
          item.item.merchandise.offer
        );
      } else {
        tempUSD += item.item.selectedOption.cost.USD * item.item.quantity;
        tempLKR += item.item.selectedOption.cost.LKR * item.item.quantity;
      }
    });

    setMerchTotal({ USD: tempUSD, LKR: tempLKR });
  };

  const calculateRentalTotal = () => {
    let tempUSD: number = 0;
    let tempLKR: number = 0;

    const rentals: RentalCart[] = getFilteredItems("RENTAL");

    rentals.forEach((item: RentalCart) => {
      tempUSD += item.item.selectedOption.cost.USD * item.item.quantity;
      tempLKR += item.item.selectedOption.cost.LKR * item.item.quantity;
    });

    setRentalTotal({ USD: tempUSD, LKR: tempLKR });
  };

  const calculateVoucherTotal = () => {
    let tempUSD: number = 0;
    let tempLKR: number = 0;

    const vouchers: VoucherCart[] = getFilteredItems("VOUCHER");

    vouchers.forEach((item: VoucherCart) => {
      if (item.item.voucher.voucherType === "Cash") {
        if (item.item.voucher.voucherAmount?.currency === "LKR") {
          tempLKR += item.item.voucher.voucherAmount?.amount;
        } else if (item.item.voucher.voucherAmount?.currency === "USD") {
          tempUSD += item.item.voucher.voucherAmount?.amount;
        }
      } else if (
        item.item.voucher.voucherType === "Experience" &&
        item.item.voucher.voucherExperience?.item.experience
      ) {
        const experienceTotalItem = getExperienceTotal(
          item.item.voucher.voucherExperience?.item.experience,
          item.item.voucher.voucherExperience?.item.duration,
          item.item.voucher.voucherExperience?.item.adults,
          item.item.voucher.voucherExperience?.item.children,
          item.item.voucher.voucherExperience?.item.extras
        );

        tempUSD += experienceTotalItem.USD;
        tempLKR += experienceTotalItem.LKR;
      }
    });

    setVoucherTotal({ USD: tempUSD, LKR: tempLKR });
  };

  // Calculate experienceTotal when the component mounts or when cartItems change
  useEffect(() => {
    calculateExperienceTotal();
    calculateEventTotal();
    calculateMerchTotal();
    calculateVoucherTotal();
    calculateRentalTotal();
  }, [cartItems]);

  useEffect(() => {
    setTotal({
      USD:
        experienceTotal.USD +
        eventTotal.USD +
        merchTotal.USD +
        rentalTotal.USD +
        voucherTotal.USD +
        shippingTotal.USD -
        coupon.USD,
      LKR:
        experienceTotal.LKR +
        eventTotal.LKR +
        merchTotal.LKR +
        rentalTotal.LKR +
        voucherTotal.LKR +
        shippingTotal.LKR -
        coupon.LKR,
    });
  }, [
    experienceTotal,
    eventTotal,
    merchTotal,
    rentalTotal,
    voucherTotal,
    shippingTotal,
    coupon,
  ]);

  useEffect(() => {
    if (total.USD < 0 || total.LKR < 0) {
      setTotal({ USD: 0, LKR: 0 });
    }
  }, [total]);

  const router = useRouter();
  const handleCheckout = () => {
    let currency: string;
    let tempTotal: number;
    if (local) {
      currency = "LKR";
      tempTotal = total.LKR;
    } else {
      currency = "USD";
      tempTotal = total.USD;
    }

    const experiences: ExperienceCart[] = getFilteredItems("EXPERIENCE");

    const simplifiedExperiences = experiences.map((experience) => {
      const { name } = experience.item.experience;
      const { offer } = experience.item.experience;
      const simplifiedExtras = experience.item.extras.map((extra) => {
        const { name, quantity } = extra;
        return { name, quantity };
      });

      return {
        id: experience.item.id,
        name,
        offer,
        adults: experience.item.adults,
        children: experience.item.children,
        checkInTime: experience.item.checkInTime,
        date: formatDate(experience.item.date.toString().split("T")[0]),
        duration: experience.item.duration,
        extras: simplifiedExtras,
        itemType: experience.itemType,
      };
    });

    const events: EventCart[] = getFilteredItems("EVENT");

    const simplifiedEvents = events.map((event) => {
      const { name } = event.item.event;
      const { startDate } = event.item.event;

      return {
        id: event.item.id,
        name,
        startDate,
        info: event.item.info,
        itemType: event.itemType,
      };
    });

    const merchandise: MerchandiseCart[] = getFilteredItems("MERCHANDISE");

    const simplifiedMerchandise = merchandise.map((merch) => {
      const { name } = merch.item.merchandise;
      const { offer } = merch.item.merchandise;
      const { type } = merch.item.merchandise.options;

      return {
        id: merch.item.id,
        name,
        offer,
        type,
        selectedOption: merch.item.selectedOption,
        quantity: merch.item.quantity,
        itemType: merch.itemType,
      };
    });

    const rentals: RentalCart[] = getFilteredItems("RENTAL");

    const simplifiedRentals = rentals.map((rental) => {
      const { item, ...rest } = rental.item.rental;
      const { startDate } = rental.item;
      const { endDate } = rental.item;
      const { quantity } = rental.item;
      const { itemType } = rental;
      return { ...rest, startDate, endDate, quantity, itemType };
    });

    const vouchers: VoucherCart[] = getFilteredItems("VOUCHER");

    const simplifiedVouchers = vouchers.map((voucher) => {
      const newItem: any = { ...voucher };
      if (newItem.item.voucher.voucherExperience?.item.experience) {
        newItem.item.voucher.voucherExperience.item.name =
          newItem.item.voucher.voucherExperience.item.experience.name;
        delete newItem.item.voucher.voucherExperience.item.experience;
      }
      return newItem;
    });

    if (simplifiedVouchers.length > 0) {
      setVoucherAdded(true);
    } else {
      setVoucherAdded(false);
    }

    const combinedItems: any[] = [
      ...simplifiedExperiences,
      ...simplifiedEvents,
      ...simplifiedMerchandise,
      ...simplifiedRentals,
      ...simplifiedVouchers,
    ];

    setItems(combinedItems);

    editPaymentStatus({
      ...paymentStatus,
      status: "PENDING",
      currency: currency,
      tempTotal: tempTotal,
      total: tempTotal,
      payAmount: tempTotal,
    });
    router.push("/checkout");
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold uppercase tracking-wide md:text-2xl lg:text-3xl">
        Order Summary
      </h1>
      <div className="mb-4 w-full border-t border-gray-200" />
      <div className="flex justify-between p-1 font-semibold">
        <p className="text-gray-800">Items</p>
      </div>
      {(experienceTotal.USD > 0 || experienceTotal.LKR > 0) && (
        <div className="flex justify-between p-1 text-sm">
          <p className="text-gray-800">Experiences</p>
          <p className="font-medium text-gray-800">
            {local ? (
              <>LKR {experienceTotal.LKR.toFixed(2)}</>
            ) : (
              <>USD ${experienceTotal.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}
      {(eventTotal.USD > 0 || eventTotal.LKR > 0) && (
        <div className="flex justify-between p-1 text-sm">
          <p className="text-gray-800">Events</p>
          <p className="font-medium text-gray-800">
            {local ? (
              <>LKR {eventTotal.LKR.toFixed(2)}</>
            ) : (
              <>USD ${eventTotal.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}
      {(merchTotal.USD > 0 || merchTotal.LKR > 0) && (
        <div className="flex justify-between p-1 text-sm">
          <p className="text-gray-800">Merchandise</p>
          <p className="font-medium text-gray-800">
            {local ? (
              <>LKR {merchTotal.LKR.toFixed(2)}</>
            ) : (
              <>USD ${merchTotal.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}
      {(rentalTotal.USD > 0 || rentalTotal.LKR > 0) && (
        <div className="flex justify-between p-1 text-sm">
          <p className="text-gray-800">Rentals</p>
          <p className="font-medium text-gray-800">
            {local ? (
              <>LKR {rentalTotal.LKR.toFixed(2)}</>
            ) : (
              <>USD ${rentalTotal.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}
      {(voucherTotal.USD > 0 || voucherTotal.LKR > 0) && (
        <div className="flex justify-between p-1 text-sm">
          <p className="text-gray-800">Vouchers</p>
          <p className="font-medium text-gray-800">
            {local ? (
              <>LKR {voucherTotal.LKR.toFixed(2)}</>
            ) : (
              <>USD ${voucherTotal.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}

      {/*
            <div className="mt-4 flex justify-between p-1 text-sm">
                <p className="text-gray-800">Shipping</p>
                <p className="text-gray-800">
                    {local ? (
                        <>LKR {shippingTotal.LKR}</>
                    ) : (
                        <>USD ${shippingTotal.USD}</>
                    )}
                </p>
            </div> */}
      <div className="mt-6 flex items-center gap-2">
        <Input
          type="text"
          id="coupon"
          name="coupon"
          value={couponCode}
          placeholder="Enter Coupon Code"
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
        />
        <Button onClick={handleCouponClaim}>Apply</Button>
      </div>

      <div className="my-4 w-full border-t border-gray-200" />
      {coupon.id > 0 && (
        <div className="flex justify-between p-1 font-semibold">
          <p className="text-gray-800">Discount</p>
          <p className="text-gray-800">
            {local ? (
              <>LKR {coupon.LKR.toFixed(2)}</>
            ) : (
              <>USD ${coupon.USD.toFixed(2)}</>
            )}
          </p>
        </div>
      )}
      <div className="mb-4 flex justify-between p-1 font-semibold">
        <p className="text-gray-800">Total</p>
        <p className="text-gray-800">
          {local ? (
            <>LKR {total.LKR.toFixed(2)}</>
          ) : (
            <>USD ${total.USD.toFixed(2)}</>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <MainButton text="Checkout" onClick={handleCheckout} />
        <MainButton
          text="Continue Shopping"
          href="/"
          bgColor="bg-gray-600 hover:bg-gray-800"
        />
      </div>
    </>
  );
};

export default Summary;
