import { formatDate, getFilteredItems } from "../utils";

export const getSortedItems = (items: any) => {
  const experiences = getFilteredItems(items, "EXPERIENCE");
  const merchandise = getFilteredItems(items, "MERCHANDISE");
  const vouchers = getFilteredItems(items, "VOUCHER");
  const events = getFilteredItems(items, "EVENT");
  const rentals = getFilteredItems(items, "RENTAL");

  const refactoredExperiences: any[] =
    experiences.length > 0
      ? experiences.map((item: any) => {
          return {
            sku: "Experience",
            name: item.name,
            content: [
              `Start Date: ${item.date}`,
              `Check in time: ${item.checkInTime}`,
              `Adults: ${item.adults}`,
              `Children: ${item.children}`,
              `Extras: ${item.extras
                .map(
                  (extra: { name: any; quantity: any }) =>
                    `Name: ${extra.name}, Quantity: ${extra.quantity}`
                )
                .join(", ")}`,
            ],
          };
        })
      : [];

  const refactoredMerchandise: any[] =
    merchandise.length > 0
      ? merchandise.map((item: any) => {
          return {
            sku: "Merchandise",
            name: item.name,
            content: [
              `${item.type}: ${item.selectedOption.name}`,
              `Quantity: ${item.quantity}`,
            ],
          };
        })
      : [];

  const refactoredVouchers: any[] =
    vouchers.length > 0
      ? vouchers.map((item: any) => {
          return {
            sku: "Voucher",
            name: item.item.voucher.voucherType,
            content: [
              `couponCode: ${item.item.voucher.couponId[0]}`,
              item.item.voucher.voucherType === "Cash"
                ? `Cash: ${item.item.voucher.voucherAmount.currency} ${item.item.voucher.voucherAmount.amount}`
                : item.item.voucher.voucherType === "Experience"
                ? `Experience: Name: ${
                    item.item.voucher.voucherExperience.item.name
                  }, Adults: ${
                    item.item.voucher.voucherExperience.item.adults
                  }, Children: ${
                    item.item.voucher.voucherExperience.item.children
                  }, Extras: ${item.item.voucher.voucherExperience.item.extras
                    .map(
                      (extra: { name: any; quantity: any }) =>
                        `Name: ${extra.name}, Quantity: ${extra.quantity}`
                    )
                    .join(", ")}`
                : "Invalid Voucher Type",
            ],
          };
        })
      : [];

  const refactoredEvents: any[] =
    events.length > 0
      ? events.map((item: any) => {
          return {
            sku: "Event",
            name: item.name,
            content: [`Start Date: ${item.startDate}`, `Pax: ${item.info.pax}`],
          };
        })
      : [];

  const refactoredRentals: any[] =
    rentals.length > 0
      ? rentals.map((item: any) => {
          return {
            sku: "Rental",
            name: item.name,
            content: [
              `Start Date: ${formatDate(
                item.startDate.toString().split("T")[0]
              )}`,
              `End Date: ${formatDate(item.endDate.toString().split("T")[0])}`,
              `Duration: ${item.options[0].duration}`,
              `Quantity: ${item.quantity}`,
            ],
          };
        })
      : [];

  const refactoredItems: any[] = [
    ...refactoredExperiences,
    ...refactoredEvents,
    ...refactoredMerchandise,
    ...refactoredRentals,
    ...refactoredVouchers,
  ];

  return refactoredItems;
};
