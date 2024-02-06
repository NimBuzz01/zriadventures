import BlurImage from "@/components/common/BlurImage";
import Carousel from "@/components/carousels/Carousel";
import React, { SetStateAction, useEffect, useState } from "react";
import { useVoucher, useVoucherActions } from "@/contexts/voucher-context";
import { VoucherTemplate } from "@/types/experienceTypes";
import { getVoucherData } from "@/lib/data/voucher-data";
import NotFoundLabel from "@/components/NotFoundLabel";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

const VoucherTemplate = ({ currentStep, setCurrentStep }: Props) => {
  const selectedVoucher = useVoucher();
  const voucherActions = useVoucherActions();
  const [isFilled, setIsFilled] = useState(false);
  const [voucherTemplates, setVoucherTemplates] = useState<VoucherTemplate[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const mappedVouchers = await getVoucherData();
        setVoucherTemplates(mappedVouchers);
      } catch (error) {
        console.error("Error fetching and mapping data:", error);
      }
    }

    fetchData();
  }, []);

  const handleVoucherSelect = (voucher: VoucherTemplate) => {
    voucherActions.setVoucherId(voucher.id);
    voucherActions.setVoucherTemplate(voucher.name);
    voucherActions.setVoucherImage(voucher.src);
    setIsFilled(true);
  };

  const handleNext = () => {
    if (isFilled) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Not selected");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div className="p-4">
        <p className="mb-5 text-center text-2xl font-medium">
          Select the voucher type
        </p>
        <div className="my-5 sm:px-10">
          {voucherTemplates && voucherTemplates.length > 0 ? (
            <Carousel perView={1} spacing={0} arrows>
              {voucherTemplates.map((voucher) => (
                <div
                  key={voucher.id}
                  className={`group flex flex-col items-center gap-4 ${
                    selectedVoucher.voucherId === voucher.id ? "selected" : ""
                  }`}
                  onClick={() => handleVoucherSelect(voucher)}
                >
                  <div className="relative h-96 w-full">
                    <BlurImage
                      src={voucher.src}
                      alt={voucher.alt}
                      objectFit="contain"
                      style={`border-2 ${
                        selectedVoucher.voucherId === voucher.id
                          ? "selected border-blue-500"
                          : "border-transparent"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xl font-medium">
                    <input
                      type="radio"
                      checked={selectedVoucher.voucherId === voucher.id}
                      onChange={() => handleVoucherSelect(voucher)}
                    />
                    <p>{voucher.name}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <NotFoundLabel text="No voucher templates found!" />
          )}
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
      </div>
    </>
  );
};

export default VoucherTemplate;
