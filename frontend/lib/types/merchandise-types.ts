import { Cost, Image } from "./common-types";

export interface MerchandiseCategory {
  name: string;
  id: string;
}

interface Option {
  id: string;
  name: string;
  cost: Cost;
}

interface Options {
  type: string;
  option: Option[];
}

export interface MerchandiseTypes {
  name: string;
  id: string;
  category: MerchandiseCategory;
  options: Options;
  images: Image[];
  shortDescription: string;
  features: string[];
  description: string;
  additionalInformation: string;
  terms: string[];
  trending: boolean;
  onlyRental: boolean;
  offer: number | null;
}

export interface MerchandiseCartItem {
  id: string;
  quantity: number;
  selectedOption: Option;
  merchandise: MerchandiseTypes;
}
