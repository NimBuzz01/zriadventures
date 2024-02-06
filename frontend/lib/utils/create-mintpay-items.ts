import { getExperienceTotal, getFilteredItems } from "../utils";
import { CartItem } from "../types/common-types";
import { ExperienceCartItem } from "../types/experience-types";
import { MerchandiseCartItem } from "../types/merchandise-types";
import { VoucherCartItem } from "../types/voucher-types";
import { EventCartItem } from "../types/event-types";
import { RentalCartItem } from "../types/rental-types";

interface MintpayProduct {
  name: string;
  product_id: string;
  sku: string;
  quantity: number;
  unit_price: number;
  discount: number;
  created_date: Date;
  updated_date: Date;
}

export function createMintpayProducts() {
  const local = localStorage.getItem("Cart");
  let items: any[] = [];
  if (local) {
    items = JSON.parse(local);
  }
  const experiences: CartItem[] = getFilteredItems(items, "EXPERIENCE");
  const merchandise: CartItem[] = getFilteredItems(items, "MERCHANDISE");
  const vouchers: CartItem[] = getFilteredItems(items, "VOUCHER");
  const events: CartItem[] = getFilteredItems(items, "EVENT");
  const rentals: CartItem[] = getFilteredItems(items, "RENTAL");

  const filteredExperiences: MintpayProduct[] = experiences.map(
    (item: CartItem) => {
      const experienceItem = item.item as ExperienceCartItem;
      return {
        name: experienceItem.experience.name,
        product_id: experienceItem.experience.id,
        sku: "EXPERIENCE",
        quantity: 1,
        unit_price: getExperienceTotal(
          experienceItem.experience,
          experienceItem.duration,
          experienceItem.adults,
          experienceItem.children,
          experienceItem.extras
        ).LKR,
        discount: experienceItem.experience.offer ?? 0,
        created_date: new Date(),
        updated_date: new Date(),
      };
    }
  );

  const filteredMerchandise: MintpayProduct[] = merchandise.map(
    (item: CartItem) => {
      const merchandiseItem = item.item as MerchandiseCartItem;
      return {
        name: merchandiseItem.merchandise.name,
        product_id: merchandiseItem.merchandise.id,
        sku: "MERCHANDISE",
        quantity: merchandiseItem.quantity,
        unit_price: merchandiseItem.selectedOption.cost.LKR,
        discount: merchandiseItem.merchandise.offer ?? 0,
        created_date: new Date(),
        updated_date: new Date(),
      };
    }
  );
  const filteredVouchers: MintpayProduct[] = vouchers.map((item: CartItem) => {
    const vouicherItem = item.item as VoucherCartItem;
    return {
      name: vouicherItem.voucher.voucherType,
      product_id: vouicherItem.id,
      sku: "VOUCHER",
      quantity: 1,
      unit_price: vouicherItem.voucher.voucherAmount?.amount ?? 0,
      discount: 0,
      created_date: new Date(),
      updated_date: new Date(),
    };
  });
  const filteredEvents: MintpayProduct[] = events.map((item: CartItem) => {
    const eventItem = item.item as EventCartItem;
    return {
      name: eventItem.event.name,
      product_id: eventItem.event.id,
      sku: "Event",
      quantity: eventItem.info.pax,
      unit_price: eventItem.event.cost.LKR,
      discount: 0,
      created_date: new Date(),
      updated_date: new Date(),
    };
  });
  const filteredRentals: MintpayProduct[] = rentals.map((item: CartItem) => {
    const rentalItem = item.item as RentalCartItem;
    return {
      name: rentalItem.rental.name,
      product_id: rentalItem.rental.id,
      sku: "RENTAL",
      quantity: rentalItem.quantity,
      unit_price: rentalItem.selectedOption.cost.LKR,
      discount: 0,
      created_date: new Date(),
      updated_date: new Date(),
    };
  });

  const combinedItems: MintpayProduct[] = [
    ...filteredExperiences,
    ...filteredEvents,
    ...filteredMerchandise,
    ...filteredRentals,
    ...filteredVouchers,
  ];

  return combinedItems;
}
