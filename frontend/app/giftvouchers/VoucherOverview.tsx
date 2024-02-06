import BlurImage from "@/components/common/BlurImage";
import MainButton from "@/components/common/MainButton";
import { getExperienceTotal } from "@/contexts/experience-context";
import { useLocal } from "@/contexts/local-context";
import { useVoucher, useVoucherActions } from "@/contexts/voucher-context";
import { cn } from "@/lib/utils";
import { generateVoucherCode } from "@/lib/utils/func";
import { VoucherCart } from "@/types/voucherTypes";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

const VoucherOverview = ({ currentStep, setCurrentStep }: Props) => {
  const selectedVoucher = useVoucher();
  const { local, setKey } = useLocal();
  const voucherActions = useVoucherActions();
  const couponCode = generateVoucherCode();
  const router = useRouter();

  useEffect(() => {
    voucherActions.setCouponId(couponCode);

    if (selectedVoucher.voucherType == "Cash") {
      var d = new Date();
      d.setMonth(d.getMonth() + 6);
      voucherActions.setValidDate(d);
    } else if (selectedVoucher.voucherType == "Experience") {
      var d = new Date();
      d.setMonth(d.getMonth() + 3);
      voucherActions.setValidDate(d);
    }
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (type: "add" | "buy") => {
    const cartItem: VoucherCart = {
      item: {
        id: uuidv4(),
        info: {
          sendersName: selectedVoucher.senderName,
          personalMessage: selectedVoucher.personalMessage,
          recipientsName: selectedVoucher.recipientName,
          recipientsEmail: selectedVoucher.recipientEmail,
        },
        voucher: {
          couponId: selectedVoucher.couponId,
          voucherType: selectedVoucher.voucherType,
          ...(selectedVoucher.voucherType === "Cash" && {
            voucherAmount: {
              amount: selectedVoucher.cashAmount ?? 0,
              currency: local ? "LKR" : "USD",
            },
          }),
          ...(selectedVoucher.voucherType === "Experience" && {
            voucherExperience: selectedVoucher.selectedExperience,
          }),
          expiryDate: selectedVoucher.validDate,
          voucherTemplate: {
            id: selectedVoucher.voucherId,
            name: selectedVoucher.voucherTemplate,
            src: selectedVoucher.voucherImage,
            alt: selectedVoucher.voucherTemplate + " Template Image",
          },
        },
      },
      itemType: "VOUCHER",
    };

    const existingCartJSON = localStorage.getItem("Cart");

    if (existingCartJSON !== null) {
      const existingCart = JSON.parse(existingCartJSON);

      const cartArray = Array.isArray(existingCart) ? existingCart : [];

      cartArray.push(cartItem);

      localStorage.setItem("Cart", JSON.stringify(cartArray));
    } else {
      localStorage.setItem("Cart", JSON.stringify([cartItem]));
    }
    localStorage.removeItem("Gift");
    setKey();
    if (type === "buy") {
      router.push("/cart");
    } else {
      toast.success("Your Voucher is Added to Cart!");
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10 p-4 lg:flex-row lg:gap-16">
        <div className="w-full lg:w-1/2">
          <p className="mb-4 text-xl font-medium">
            {selectedVoucher.voucherTemplate} Gift Voucher
          </p>
          <div className="relative h-96">
            <BlurImage
              src={selectedVoucher.voucherImage}
              alt=""
              objectFit="contain"
            />
          </div>
          <p className="mb-1 mt-5 font-medium text-gray-800">
            Coupon ID: <span className="font-normal">{couponCode}</span>
          </p>
          <p className="mb-1 font-medium text-gray-800">
            Voucher valid till:{" "}
            <span className="font-normal">
              {selectedVoucher.validDate.toDateString()}
            </span>
          </p>
        </div>
        <div className="flex w-full flex-grow flex-col lg:w-1/2">
          <p className="mb-1 flex justify-between font-medium text-gray-800">
            Senders Name:{" "}
            <span className="font-normal">{selectedVoucher.senderName}</span>
          </p>
          <p className="mb-4 flex justify-between font-medium text-gray-800">
            Recipients Name:{" "}
            <span className="font-normal">{selectedVoucher.recipientName}</span>
          </p>
          <p className="mb-4 flex flex-col gap-1 font-medium text-gray-800">
            Personal Message:{" "}
            <span className="font-normal">
              {selectedVoucher.personalMessage}
            </span>
          </p>
          <div className="mb-4 border-t border-gray-300"></div>
          <p className="mb-1 flex justify-between font-medium text-gray-800">
            Voucher Type:{" "}
            <span className="font-normal">{selectedVoucher.voucherType}</span>
          </p>
          {selectedVoucher.voucherType === "Cash" ? (
            <p className="mb-4 flex justify-between font-medium text-gray-800">
              Voucher Amount:{" "}
              <span className="font-normal">
                {local ? (
                  <>
                    LKR {selectedVoucher.cashAmount?.toFixed(2)}
                    /-
                  </>
                ) : (
                  <>USD ${selectedVoucher.cashAmount?.toFixed(2)}</>
                )}
              </span>
            </p>
          ) : (
            <>
              {selectedVoucher.selectedExperience && (
                <>
                  <p className="mb-1 flex justify-between font-medium text-gray-800">
                    Voucher Experience:{" "}
                    <span className="font-normal">
                      {selectedVoucher.selectedExperience?.item.experience.name}
                    </span>
                  </p>
                  <p className="mb-4 flex justify-between font-medium text-gray-800">
                    Experience Amount:{" "}
                    <span className="font-normal">
                      {local ? (
                        <>
                          LKR{" "}
                          {getExperienceTotal(
                            selectedVoucher.selectedExperience.item.experience,
                            selectedVoucher.selectedExperience.item.duration,
                            selectedVoucher.selectedExperience.item.adults,
                            selectedVoucher.selectedExperience.item.children,
                            selectedVoucher.selectedExperience.item.extras
                          ).LKR.toFixed(2)}
                        </>
                      ) : (
                        <>
                          USD $
                          {getExperienceTotal(
                            selectedVoucher.selectedExperience.item.experience,
                            selectedVoucher.selectedExperience.item.duration,
                            selectedVoucher.selectedExperience.item.adults,
                            selectedVoucher.selectedExperience.item.children,
                            selectedVoucher.selectedExperience.item.extras
                          ).USD.toFixed(2)}
                        </>
                      )}
                    </span>
                  </p>
                </>
              )}
            </>
          )}

          <ul className="ml-4 mt-auto list-disc text-sm text-gray-400">
            <li>This voucher cannot be cashed out</li>
            <li>The bookings should be made 05 days in advance.</li>
            <li>
              The voucher can be used as a full or part payment for any activity
              or experience
            </li>
            <li>
              The voucher is valid 6 months from the purchase date. (if it is
              amount voucher)
            </li>
            <li>
              The voucher is valid 3 months from the purchase date. (if it is
              experience voucher)
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between border-t p-5">
        <button
          onClick={handleBack}
          className={`w-44 bg-gray-200 py-3 text-lg font-semibold uppercase text-gray-600 transition-all hover:bg-gray-300 ${
            currentStep < 1 ? "opacity-0" : "opacity-100"
          }`}
          disabled={currentStep < 1}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`w-44 bg-green-500 py-3 text-lg font-semibold uppercase text-white transition-all hover:bg-green-600 ${
            currentStep > 1 ? "opacity-0" : "opacity-100"
          }`}
          disabled={currentStep > 1}
        >
          Continue
        </button>
        <div className="flex justify-end gap-4">
          <MainButton
            text="Buy Now"
            onClick={() => {
              handleSubmit("buy");
            }}
          />
          <MainButton
            onClick={() => {
              handleSubmit("add");
            }}
            text="Add to Cart"
            bgColor="bg-gray-600 group-hover:bg-gray-800"
          />
        </div>
      </div>
    </>
  );
};

export default VoucherOverview;
