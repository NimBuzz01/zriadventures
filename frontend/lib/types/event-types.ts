import {
  About,
  Cost,
  Duration,
  FAQ,
  Image,
  Location,
  Requirements,
} from "./common-types";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  nationality: string;
  pax: number;
  requests: string;
}

export interface EventTypes {
  name: string;
  id: string;
  location: Location;
  duration: Duration;
  cost: Cost;
  images: Image[];
  about: About;
  included: string[];
  requirements: Requirements[];
  faq: FAQ[];
  terms: string[];
  startDate: Date;
  endDate: Date;
  groupSize: number;
}

export interface EventCartItem {
  id: string;
  info: PersonalInfo;
  event: EventTypes;
}
