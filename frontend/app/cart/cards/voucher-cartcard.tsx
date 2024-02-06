import { Card } from "@/components/ui/card";
import React from "react";
import {
  BsCashStack,
  BsFillBoxFill,
  BsFillCalendar2MinusFill,
} from "react-icons/bs";
import BlurImage from "@/components/common/BlurImage";
import { useLocal } from "@/contexts/local-context";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { VoucherCartItem } from "@/lib/types/voucher-types";
import { CartItem } from "@/lib/types/common-types";
import { getExperienceTotal } from "@/lib/utils";

interface Props {
  item: CartItem;
  onDelete: (itemId: string) => void;
}

const VoucherCartCard = ({ item, onDelete }: Props) => {
  const voucherItem = item.item as VoucherCartItem
  const { local, setKey } = useLocal();
  const handleDeleteClick = () => {
    onDelete(voucherItem.id);
    setKey();
  };

  return (
    <Card className="relative mb-4 flex w-full flex-col md:flex-row">
      <div>
        <div className="relative h-44 w-full md:h-full md:w-44">
          <BlurImage
            src={voucherItem.voucher.voucherTemplate.src}
            alt={voucherItem.voucher.voucherTemplate.alt}
            objectFit="contain"
            style="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <div className="flex w-full flex-col justify-between lg:flex-row">
          <h1 className="text-lg font-medium md:text-xl">
            {voucherItem.voucher.voucherTemplate.name} Voucher
          </h1>
          <p className="text-lg font-medium md:text-xl">
            {voucherItem.voucher.voucherType === "Cash" ? (
              `${voucherItem.voucher.voucherAmount?.currency || ""} ${
                voucherItem.voucher.voucherAmount?.amount || ""
              }`
            ) : voucherItem.voucher.voucherType === "Experience" &&
              voucherItem.voucher.voucherExperience ? (
              <>
                {local
                  ? `LKR ${getExperienceTotal(
                      voucherItem.voucher.voucherExperience.experience,
                      voucherItem.voucher.voucherExperience.duration,
                      voucherItem.voucher.voucherExperience.adults,
                      voucherItem.voucher.voucherExperience.children,
                      voucherItem.voucher.voucherExperience.extras
                    ).LKR.toFixed(2)}`
                  : `USD $${getExperienceTotal(
                      voucherItem.voucher.voucherExperience.experience,
                      voucherItem.voucher.voucherExperience.duration,
                      voucherItem.voucher.voucherExperience.adults,
                      voucherItem.voucher.voucherExperience.children,
                      voucherItem.voucher.voucherExperience.extras
                    ).USD.toFixed(2)}`}
              </>
            ) : null}
          </p>
        </div>
        <button
          onClick={handleDeleteClick}
          className="self-end text-sm text-red-600 transition-all hover:text-red-800 focus:outline-none"
        >
          Remove
        </button>
        <div className="my-2 border-t border-gray-200" />
        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="mb-2 flex flex-col">
              <p className="text-xs uppercase text-gray-500">Voucher Type</p>
              <span className="text- flex items-center gap-2">
                <BsFillBoxFill />
                {voucherItem.voucher.voucherType}
              </span>
            </div>
            {voucherItem.voucher.voucherType === "Cash" ? (
              <div className="mb-2 flex flex-col">
                <p className="text-xs uppercase text-gray-500">Cash Amount</p>
                <span className="text- flex items-center gap-2">
                  <BsCashStack />
                  {voucherItem.voucher.voucherAmount?.currency}{" "}
                  {voucherItem.voucher.voucherAmount?.amount}
                </span>
              </div>
            ) : (
              <div>
                <div className="mb-2 flex flex-col">
                  <p className="text-xs uppercase text-gray-500">Experience</p>
                  <span className="text- flex items-center gap-2">
                    <FiPackage />
                    {voucherItem.voucher.voucherExperience?.experience.name}
                  </span>
                </div>
                <div className="flex w-full flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <div className="mb-2 flex flex-col">
                      <p className="text-xs uppercase text-gray-500">
                        Duration
                      </p>
                      <span className="text- flex items-center gap-2">
                        <AiOutlineClockCircle />
                        {
                          voucherItem.voucher.voucherExperience?.duration
                            .amount
                        }{" "}
                        {
                          voucherItem.voucher.voucherExperience?.duration
                            .type
                        }
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="mb-2 flex flex-col">
                      <p className="text-xs uppercase text-gray-500">Adults</p>
                      <span className="text- flex items-center gap-2">
                        <IoManSharp />{" "}
                        {voucherItem.voucher.voucherExperience?.adults} Pax
                      </span>
                    </div>
                    <div className="mb-2 flex flex-col">
                      <p className="text-xs uppercase text-gray-500">
                        Children
                      </p>
                      <span className="text- flex items-center gap-2">
                        <FaChild />{" "}
                        {voucherItem.voucher.voucherExperience?.children} Pax
                      </span>
                    </div>
                  </div>
                </div>
                {voucherItem.voucher.voucherExperience?.experience
                  .bundle && (
                  <div className="mt-4">
                    <p className="text-xs uppercase text-gray-500">Bundle</p>
                    <ul className="ml-6 list-disc">
                      {voucherItem.voucher.voucherExperience?.experience.category
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
                {voucherItem.voucher.voucherExperience?.extras.length &&
                  voucherItem.voucher.voucherExperience?.extras.length >
                    0 && (
                    <div className="mt-4">
                      <p className="text-xs uppercase text-gray-500">Extras</p>
                      {voucherItem.voucher.voucherExperience?.extras.map(
                        (item, index) => (
                          <div key={index} className="w-full">
                            <span className="inline-flex w-32 ">
                              {item.name}
                            </span>{" "}
                            {item.quantity} Pax
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoucherCartCard;
