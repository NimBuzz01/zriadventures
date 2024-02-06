import {
  About,
  Duration,
  FAQ,
  Image,
  Cost,
  Requirements,
} from "./common-types";
import { VoucherTemplate } from "./voucher-types";

export interface ExperienceCategory {
  name: string;
  id: string;
  type: "water" | "land" | "air";
}

export interface ExperiencePaxRates {
  minPax: number;
  maxPax: number;
  rates: Cost;
}

export interface ExperienceOptions {
  duration: Duration;
  paxRates: ExperiencePaxRates;
  childCostReduction: Cost;
}

export interface ExperienceExtras {
  id: string;
  name: string;
  cost: Cost;
  quantity: number;
}

export interface ExperienceTypes {
  name: string;
  id: string;
  category: ExperienceCategory[];
  location: Location;
  difficulty: string;
  options: ExperienceOptions[];
  images: Image[];
  about: About;
  included: string[];
  extras: ExperienceExtras[];
  requirements: Requirements[];
  faq: FAQ[];
  terms: string[];
  suitedVoucher: VoucherTemplate[];
  trending: boolean;
  offer: number | null;
  bundle: boolean;
}

export interface ExperienceCartItem {
  id: string;
  date: Date;
  checkInTime: string;
  duration: Duration;
  adults: number;
  children: number;
  requests: string;
  experience: ExperienceTypes;
  extras: ExperienceExtras[];
}
