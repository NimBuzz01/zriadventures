import { AxiosResponse } from "axios";
import { getVoucherTemplates } from "../utils/strapi-utils";
import { VoucherTemplate } from "../types/voucher-types";

export async function getVoucherData(): Promise<VoucherTemplate[]> {
  const response = await getVoucherTemplates();
  const mappedVouchers: VoucherTemplate[] = (
    response as AxiosResponse<VoucherTemplate[]>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.voucherId,
      name: data.name,
      src: data.image.data
        ? data.image.data.attributes.url.replace(/\.[^.]+$/, ".webp")
        : "",
      alt: data.image.data ? data.image.data.attributes.alternativeText : "",
    };
  });
  return mappedVouchers;
}
