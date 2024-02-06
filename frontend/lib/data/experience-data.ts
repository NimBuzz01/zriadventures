import { Location } from "../types/common-types";
import { ExperienceCategory, ExperienceTypes } from "../types/experience-types";
import {
  getBundles,
  getExperienceCategories,
  getExperienceLocations,
  getExperiences,
} from "../utils/strapi-utils";
import { AxiosResponse } from "axios";

export async function getExperienceData(): Promise<ExperienceTypes[]> {
  const response = await getExperiences();
  const mappedExperiences: ExperienceTypes[] = (
    response as AxiosResponse<any>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.experienceId || "",
      name: data.name || "",
      category: data.experience_categories.data.map(
        (category: {
          attributes: {
            categoryId: string;
            name: string;
            type: string;
          };
        }) => ({
          id: category.attributes.categoryId || "",
          name: category.attributes.name || "",
          type: category.attributes.type || "",
        })
      ),
      difficulty: data.difficulty || "",
      location: {
        id: data.location.data.attributes.locationId || "",
        name: data.location.data.attributes.name || "",
        coordinates: {
          latitude: data.location.data.attributes.coordinates.latitude || "",
          longitude: data.location.data.attributes.coordinates.longitude || "",
        },
        description: data.location.data.attributes.description || "",
        trending: data.location.data.attributes.trending || false,
        image: {
          src:
            data.location.data.attributes.image.data.attributes.url.replace(
              /\.[^.]+$/,
              ".webp"
            ) || "",
          alt:
            data.location.data.attributes.image.data.attributes
              .alternativeText || "",
        },
        googleMapsLink: data.location.data.attributes.googleMapsLink || "",
      },
      options: data.options.map((option: any) => ({
        duration: {
          type: option.duration.type || "",
          amount: option.duration.amount || 0,
        },
        paxRates: option.paxRates.map((rate: any) => ({
          minPax: rate.minPax || 0,
          maxPax: rate.maxPax || 0,
          rates: {
            USD: rate.rates.USD || 0,
            LKR: rate.rates.LKR || 0,
          },
        })),
        childCostReduction: {
          USD: option.childCostReduction ? option.childCostReduction.USD : 0,
          LKR: option.childCostReduction ? option.childCostReduction.LKR : 0,
        },
      })),
      extras:
        data.extras &&
        data.extras.map((extra: any) => ({
          id: extra.extrasId,
          name: extra.name,
          cost: {
            USD: extra.cost ? extra.cost.USD : 0,
            LKR: extra.cost ? extra.cost.LKR : 0,
          },
          quantity: 0,
        })),
      images: data.images.data
        ? data.images.data.map((image: any) => ({
            src: image.attributes.url.replace(/\.[^.]+$/, ".webp") || "",
            alt: image.attributes.alternativeText || "",
          }))
        : [
            {
              src: "",
              alt: "",
            },
          ],
      about: {
        shortDescription: data.about.shortDescription || "",
        longDescription: data.about.longDesc || "",
      },
      included: data.included ? data.included.split("\n") : "",
      requirements:
        data.additionalInformation &&
        data.additionalInformation.map(
          (requirement: { name: string; description: string }) => ({
            name: requirement.name || "",
            description: requirement.description || "",
          })
        ),
      faq: data.faqs.data.map((data: any) => ({
        question: data.attributes.question || "",
        answer: data.attributes.answer || "",
      })),
      terms: data.terms_and_condition.data
        ? data.terms_and_condition.data.attributes.terms.split("\n")
        : "",
      suitedVoucher: data.voucher_templates.data.map((voucher: any) => ({
        id: voucher.attributes.voucherId || "",
        name: voucher.attributes.name || "",
        src:
          voucher.attributes.image.data.attributes.url.replace(
            /\.[^.]+$/,
            ".webp"
          ) || "",
        alt: voucher.attributes.image.data.attributes.alternativeText || "",
      })),
      trending: data.trending || false,
      offer: data.offer || 0,
      bundle: data.bundle || false,
    };
  });
  return mappedExperiences;
}

export async function getExperienceLocationData(): Promise<Location[]> {
  const response = await getExperienceLocations();
  const mappedLocations: Location[] = (response as AxiosResponse<any>).data.map(
    (res: any) => {
      const data = res.attributes;
      return {
        id: data.locationId,
        name: data.name,
        coordinates: {
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
        },
        description: data.description,
        trending: data.trending,
        image: {
          src: data.image.data.attributes.url.replace(/\.[^.]+$/, ".webp"),
          alt: data.image.data.attributes.alternativeText,
        },
      };
    }
  );
  return mappedLocations;
}

export async function getExperienceCategoryData(): Promise<
  ExperienceCategory[]
> {
  const response = await getExperienceCategories();
  const mappedCategories: ExperienceCategory[] = (
    response as AxiosResponse<any>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.categoryId,
      name: data.name,
      type: data.type,
    };
  });
  return mappedCategories;
}
