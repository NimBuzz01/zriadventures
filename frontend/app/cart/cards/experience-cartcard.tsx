import { Card } from "@/components/ui/card";
import React from "react";
import { BsFillCalendar2MinusFill } from "react-icons/bs";
import BlurImage from "@/components/common/BlurImage";
import { useLocal } from "@/contexts/local-context";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaChild } from "react-icons/fa";
import { IoManSharp } from "react-icons/io5";
import { CartItem } from "@/lib/types/common-types";
import { ExperienceCartItem } from "@/lib/types/experience-types";
import { formatDate, getExperienceTotal } from "@/lib/utils";

interface Props {
  item: CartItem;
  onDelete: (itemId: string) => void;
}

const ExperienceCartCard = ({ item, onDelete }: Props) => {
  const { local, setKey } = useLocal();
  const handleDeleteClick = () => {
    onDelete(item.item.id); // Call the onDelete callback with the item id
    setKey();
  };

  const experienceItem = item.item as ExperienceCartItem;

  return (
    <Card className="relative flex flex-col w-full mb-4 md:flex-row">
      <div>
        <div className="relative w-full h-44 md:h-full md:w-44">
          <BlurImage
            src={experienceItem.experience.images[0].src}
            alt={experienceItem.experience.images[0].alt}
            objectFit="cover"
            style="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex flex-col justify-between w-full lg:flex-row">
          <h1 className="text-lg font-medium md:text-xl">
            {experienceItem.experience.name}
          </h1>
          <p className="text-lg font-medium md:text-xl">
            {Boolean(experienceItem.experience.offer) && (
              <span className="p-1 mr-2 text-sm bg-green-200 rounded-md">
                {experienceItem.experience.offer}% Off
              </span>
            )}
            {local ? (
              <>
                LKR{" "}
                {getExperienceTotal(
                  experienceItem.experience,
                  experienceItem.duration,
                  experienceItem.adults,
                  experienceItem.children,
                  experienceItem.extras
                ).LKR.toFixed(2)}
              </>
            ) : (
              <>
                USD $
                {getExperienceTotal(
                  experienceItem.experience,
                  experienceItem.duration,
                  experienceItem.adults,
                  experienceItem.children,
                  experienceItem.extras
                ).USD.toFixed(2)}
              </>
            )}
          </p>
        </div>
        <button
          onClick={handleDeleteClick}
          className="self-end text-sm text-red-600 transition-all hover:text-red-800 focus:outline-none"
        >
          Remove
        </button>
        <div className="my-2 border-t border-gray-200" />
        <div className="flex flex-col w-full md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col mb-2">
              <p className="text-xs text-gray-500 uppercase">Duration</p>
              <span className="flex items-center gap-2 text-">
                <AiOutlineClockCircle />
                {experienceItem.duration.amount} {experienceItem.duration.type}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <p className="text-xs text-gray-500 uppercase">Date</p>
              <span className="flex items-center gap-2 text-">
                <BsFillCalendar2MinusFill />
                {formatDate(
                  experienceItem.date.toString().split("T")[0]
                )} - {experienceItem.checkInTime}
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-col mb-2">
              <p className="text-xs text-gray-500 uppercase">Adults</p>
              <span className="flex items-center gap-2 text-">
                <IoManSharp /> {experienceItem.adults} Pax
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <p className="text-xs text-gray-500 uppercase">Children</p>
              <span className="flex items-center gap-2 text-">
                <FaChild /> {experienceItem.children} Pax
              </span>
            </div>
          </div>
        </div>
        {experienceItem.experience.bundle && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase">Bundle</p>
            <ul className="ml-6 list-disc">
              {experienceItem.experience.category
                .filter(
                  (category) =>
                    ![
                      "water-activities",
                      "land-activities",
                      "air-activities",
                    ].includes(category.id)
                )
                .map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
            </ul>
          </div>
        )}
        {experienceItem.extras.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase">Extras</p>
            {experienceItem.extras.map((item, index) => (
              <div key={index} className="w-full">
                <span className="inline-flex w-32 ">{item.name}</span>{" "}
                {item.quantity} Pax
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExperienceCartCard;
