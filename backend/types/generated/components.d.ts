import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonImages extends Schema.Component {
  collectionName: 'components_common_images';
  info: {
    displayName: 'images';
    icon: 'picture';
  };
  attributes: {
    src: Attribute.String;
    alt: Attribute.String;
  };
}

export interface ExperienceAbout extends Schema.Component {
  collectionName: 'components_experience_abouts';
  info: {
    displayName: 'about';
    icon: 'book';
    description: '';
  };
  attributes: {
    shortDescription: Attribute.Text;
    longDesc: Attribute.RichText;
  };
}

export interface ExperienceCoordinates extends Schema.Component {
  collectionName: 'components_experience_coordinates';
  info: {
    displayName: 'coordinates';
    icon: 'pinMap';
  };
  attributes: {
    latitude: Attribute.Float;
    longitude: Attribute.Float;
  };
}

export interface ExperienceDurationRates extends Schema.Component {
  collectionName: 'components_experience_duration_rates';
  info: {
    displayName: 'durationRates';
    icon: 'priceTag';
  };
  attributes: {
    duration: Attribute.Component<'experience.duration'>;
    rates: Attribute.Component<'experience.rates'>;
  };
}

export interface ExperienceDuration extends Schema.Component {
  collectionName: 'components_experience_durations';
  info: {
    displayName: 'duration';
    icon: 'clock';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['Minutes', 'Hours', 'Days']>;
    amount: Attribute.Integer;
  };
}

export interface ExperienceExtras extends Schema.Component {
  collectionName: 'components_experience_extras';
  info: {
    displayName: 'extras';
    icon: 'chartBubble';
  };
  attributes: {
    extrasId: Attribute.String;
    name: Attribute.String;
    cost: Attribute.Component<'experience.rates'>;
  };
}

export interface ExperienceOptions extends Schema.Component {
  collectionName: 'components_experience_options';
  info: {
    displayName: 'options';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    duration: Attribute.Component<'experience.duration'>;
    paxRates: Attribute.Component<'experience.pax-rates', true>;
    childCostReduction: Attribute.Component<'experience.rates'>;
  };
}

export interface ExperiencePaxRates extends Schema.Component {
  collectionName: 'components_experience_pax_rates';
  info: {
    displayName: 'paxRates';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    minPax: Attribute.Integer;
    rates: Attribute.Component<'experience.rates'>;
    maxPax: Attribute.Integer;
  };
}

export interface ExperienceRates extends Schema.Component {
  collectionName: 'components_rates_rates';
  info: {
    displayName: 'rates';
    icon: 'stack';
    description: '';
  };
  attributes: {
    USD: Attribute.Integer;
    LKR: Attribute.Integer;
  };
}

export interface ExperienceRequirements extends Schema.Component {
  collectionName: 'components_experience_requirements';
  info: {
    displayName: 'requirements';
    icon: 'archive';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
  };
}

export interface MerchandiseMerchOption extends Schema.Component {
  collectionName: 'components_merchandise_merch_options';
  info: {
    displayName: 'MerchOption';
  };
  attributes: {
    optionId: Attribute.String;
    name: Attribute.String;
    cost: Attribute.Component<'experience.rates'>;
  };
}

export interface MerchandiseOptions extends Schema.Component {
  collectionName: 'components_merchandise_options';
  info: {
    displayName: 'Options';
  };
  attributes: {
    type: Attribute.String;
    option: Attribute.Component<'merchandise.merch-option', true>;
  };
}

export interface RentalsRentRates extends Schema.Component {
  collectionName: 'components_rentals_rent_rates';
  info: {
    displayName: 'RentRates';
    icon: 'archive';
  };
  attributes: {
    duration: Attribute.Enumeration<['days-1', 'days-3', 'days-7']>;
    cost: Attribute.Component<'experience.rates'>;
  };
}

export interface VoucherCash extends Schema.Component {
  collectionName: 'components_voucher_cash';
  info: {
    displayName: 'cash';
  };
  attributes: {
    amount: Attribute.Float;
    currency: Attribute.Enumeration<['LKR', 'USD']>;
  };
}

export interface VoucherExperience extends Schema.Component {
  collectionName: 'components_voucher_experiences';
  info: {
    displayName: 'experience';
  };
  attributes: {
    name: Attribute.String;
    adults: Attribute.Integer;
    children: Attribute.Integer;
    extras: Attribute.Component<'voucher.extras', true>;
  };
}

export interface VoucherExtras extends Schema.Component {
  collectionName: 'components_voucher_extras';
  info: {
    displayName: 'extras';
  };
  attributes: {
    name: Attribute.String;
    quantity: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.images': CommonImages;
      'experience.about': ExperienceAbout;
      'experience.coordinates': ExperienceCoordinates;
      'experience.duration-rates': ExperienceDurationRates;
      'experience.duration': ExperienceDuration;
      'experience.extras': ExperienceExtras;
      'experience.options': ExperienceOptions;
      'experience.pax-rates': ExperiencePaxRates;
      'experience.rates': ExperienceRates;
      'experience.requirements': ExperienceRequirements;
      'merchandise.merch-option': MerchandiseMerchOption;
      'merchandise.options': MerchandiseOptions;
      'rentals.rent-rates': RentalsRentRates;
      'voucher.cash': VoucherCash;
      'voucher.experience': VoucherExperience;
      'voucher.extras': VoucherExtras;
    }
  }
}
