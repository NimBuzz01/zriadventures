import { AxiosResponse } from "axios";
import { getEvents } from "../utils/strapi-utils";
import { EventTypes } from "../types/event-types";

export async function getEventData(): Promise<EventTypes[]> {
  const response = await getEvents();
  const mappedEvents: EventTypes[] = (
    response as AxiosResponse<EventTypes[]>
  ).data.map((res: any) => {
    const data = res.attributes;
    return {
      id: data.eventId || "",
      name: data.name || "",
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
      duration: {
        type: data.duration.type || "",
        amount: data.duration.amount || 0,
      },
      cost: {
        USD: data.cost.USD || 0,
        LKR: data.cost.LKR || 0,
      },
      groupSize: data.groupSize || 0,
      startDate: data.startDate || new Date(),
      endDate: data.endDate || new Date(),
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
        question: data.attributes.question,
        answer: data.attributes.answer,
      })),
      terms: data.terms_and_condition.data
        ? data.terms_and_condition.data.attributes.terms.split("\n")
        : "",
    };
  });
  return mappedEvents;
}
