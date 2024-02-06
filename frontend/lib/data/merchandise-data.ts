import { AxiosResponse } from "axios";
import {
  getMerchandise,
  getMerchandiseCategories,
} from "../utils/strapi-utils";
import {
  MerchandiseCategory,
  MerchandiseTypes,
} from "../types/merchandise-types";

export async function getMerchandiseData(): Promise<MerchandiseTypes[]> {
  const response = await getMerchandise();
  const mappedMerchandise: MerchandiseTypes[] = (
    response as AxiosResponse<MerchandiseTypes[]>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.merchandiseId,
      name: data.name,
      category: {
        id: data.merchandise_category.data.attributes.categoryId,
        name: data.merchandise_category.data.attributes.name,
      },
      options: {
        type: data.options.type,
        option: data.options.option.map((option: any) => ({
          id: option.optionId,
          name: option.name,
          cost: {
            USD: option.cost.USD,
            LKR: option.cost.LKR,
          },
        })),
      },
      images: data.images.data.map((image: any) => ({
        src: image.attributes.url.replace(/\.[^.]+$/, ".webp"),
        alt: image.attributes.alternativeText,
      })),
      shortDescription: data.shortDescription,
      description: data.description,
      additionalInformation: data.additionalInformation,
      features: data.features ? data.features.split("\n") : "",
      terms: data.terms_and_condition.data
        ? data.terms_and_condition.data.attributes.terms.split("\n")
        : "",
      trending: data.trending,
      onlyRental: data.onlyRental,
      offer: data.offer,
    };
  });
  return mappedMerchandise;
}

export async function getMerchandiseCategoryData(): Promise<
  MerchandiseCategory[]
> {
  const response = await getMerchandiseCategories();
  const mappedCategories: MerchandiseCategory[] = (
    response as AxiosResponse<MerchandiseCategory[]>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.categoryId,
      name: data.name,
    };
  });
  return mappedCategories;
}
