"use client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import Overview from "./Overview";
import Information from "./Information";
import { useSearchParams } from "next/navigation";
import { useCheckout } from "@/contexts/checkout-context";

const PageContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { paymentStatus, editPaymentStatus } = useCheckout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    const step = searchParams.get("step");
    const status = searchParams.get("status");
    const vendor = searchParams.get("vendor");
    const orderId = searchParams.get("orderId");
    const trnId = searchParams.get("trnId");

    if (trnId && orderId && status) {
      setCurrentStep(2);
    } else if (step === "final" && status && vendor && orderId) {
      setCurrentStep(2);
    }

    const tempStatus: "PENDING" | "SUCCESS" | "FAILED" =
      status === "success" || "SUCCESS"
        ? "SUCCESS"
        : status === "failed" || "FAILED"
        ? "FAILED"
        : "PENDING";

    if (status) {
      editPaymentStatus({
        ...paymentStatus,
        status: tempStatus,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const step = searchParams.get("step");
    const status = searchParams.get("status");
    const vendor = searchParams.get("vendor");
    const orderId = searchParams.get("orderId");
    const trnId = searchParams.get("trnId");

    if (trnId) {
      if (
        paymentStatus.total === 0 &&
        !status &&
        currentStep != 2 &&
        !orderId
      ) {
        router.push("/cart");
      }
    } else if (
      paymentStatus.total === 0 &&
      currentStep != 2 &&
      step !== "final" &&
      !status &&
      !vendor &&
      !orderId
    ) {
      router.push("/cart");
    }
  }, [router, currentStep]);
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center py-16"
      id="#checkout"
    >
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <h1
          className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                  currentStep === 0 ? "bg-blue-950 text-white" : "bg-gray-300"
                }`}
        >
          1 . Information
        </h1>
        <h1
          className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                  currentStep === 1 ? "bg-blue-950 text-white" : "bg-gray-300"
                }`}
        >
          2 . Payment
        </h1>
        <h1
          className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                  currentStep === 2 ? "bg-blue-950 text-white" : "bg-gray-300"
                }`}
        >
          3 . Overview
        </h1>
      </div>
      <div className="my-5 w-full max-w-[1000px]">
        <Card>
          {currentStep === 0 && (
            <Information
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 1 && (
            <Payment
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && <Overview />}
        </Card>
      </div>
    </div>
  );
};

export default PageContent;
