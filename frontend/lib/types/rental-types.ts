import { Cost } from "./common-types";
import { MerchandiseTypes } from "./merchandise-types";

interface Option {
  duration: string;
  cost: Cost;
}

export interface RentalTypes {
  id: string;
  name: string;
  item: MerchandiseTypes;
  options: Option[];
}

export interface RentalCartItem {
  id: string;
  quantity: number;
  selectedOption: Option;
  startDate: Date;
  endDate: Date;
  rental: RentalTypes;
}
