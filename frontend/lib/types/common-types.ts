import { EventCartItem } from "./event-types";
import { ExperienceCartItem } from "./experience-types";
import { MerchandiseCartItem } from "./merchandise-types";
import { RentalCartItem } from "./rental-types";
import { VoucherCartItem } from "./voucher-types";

export interface Duration {
  type: "Minutes" | "Hours" | "Days";
  amount: number;
}

export interface Image {
  src: string;
  alt: string;
}

export interface About {
  shortDescription: string;
  longDescription: string;
}

export interface Cost {
  USD: number;
  LKR: number;
}

export interface Location {
  name: string;
  id: string;
  coordinates: { latitude: number; longitude: number };
  description: string;
  trending: boolean;
  image: Image;
  googleMapsLink: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Requirements {
  name: string;
  description: string;
}

export interface CartItem {
  item:
    | ExperienceCartItem
    | MerchandiseCartItem
    | VoucherCartItem
    | EventCartItem
    | RentalCartItem;
  itemType: "EXPERIENCE" | "MERCHANDISE" | "VOUCHER" | "EVENT" | "RENTAL";
}
