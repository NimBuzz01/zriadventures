"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import QuantitySelector from "@/components/common/QuantitySelector";
import SubHero from "@/components/common/SubHero";
import ThumbnailCarousel from "@/components/carousels/ThumbnailCarousel";
import BaseSkeleton from "@/components/skeletons/BaseSkeleton";
import { useLocal } from "@/contexts/local-context";
import { MerchandiseCart, MerchandiseTypes } from "@/types/merchandiseTypes";
import React, { useEffect, useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import NotFoundLabel from "@/components/NotFoundLabel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { calcOffer } from "@/lib/utils/func";
import MainButton from "@/components/common/MainButton";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MERCHANDISE_HERO_IMAGE } from "@/constants/pages/MerchandisePageConstants";
import Markdown from "react-markdown";

const MerchandiseContent = ({ merchandiseId }: { merchandiseId: string }) => {
  const router = useRouter();
  let { merchandise } = useDataContext();
  const merch =
    merchandise &&
    merchandise.find((merch: MerchandiseTypes) => merch.id === merchandiseId);

  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { local, setKey } = useLocal();
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    merch && merch.options.option[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!merch) {
      return; // Early return if merchandise is not found
    }

    setSelectedOption(merch && merch.options.option[0]);

    const img = new Image();
    img.src = merch.images[0].src;
    img.onload = () => setImageLoaded(true);
    setLoading(false);
  }, [merch]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <NotFoundLabel text="Loading..." loading />
      </div>
    );
  }

  if (!merch) {
    return (
      <div className="h-screen w-full">
        <NotFoundLabel text="Sorry! The searched merchandise is not found" />
      </div>
    );
  }

  function handlePurchase(type: "add" | "buy") {
    if (quantity > 0 && selectedOption != undefined && merch) {
      setError(false);
      const cartItem: MerchandiseCart = {
        item: {
          id: uuidv4(),
          quantity: quantity,
          selectedOption: selectedOption,
          merchandise: merch,
        },
        itemType: "MERCHANDISE",
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
      if (type === "add") {
        toast.success("Your Merchandise is Added to Cart!");
      } else {
        router.push("/cart");
      }
      setKey();
    } else {
      setError(true);
    }
  }
  return (
    <>
      <SubHero
        title={merch.name}
        image={MERCHANDISE_HERO_IMAGE}
        fillColor="fill-gray-50"
      />
      <div className="flex w-full flex-col items-center bg-gray-50 py-16">
        <div className="flex w-full flex-col items-center justify-center gap-10 px-4 pb-10 sm:px-10 lg:flex-row lg:items-start">
          <div className="flex w-full max-w-[550px] flex-col lg:w-1/2">
            <div className="mb-5">
              <Breadcrumbs
                first="Merchandise"
                firstHref="/merchandise"
                last={merch.name}
              />
            </div>
            {merch.images && merch.images.length > 0 ? (
              <ThumbnailCarousel>
                {merch.images.map((image, index) => (
                  <div key={index} className="h-full w-full object-contain">
                    {imageLoaded ? (
                      <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="h-full max-h-[600px] w-full object-contain"
                      />
                    ) : (
                      <BaseSkeleton />
                    )}
                  </div>
                ))}
              </ThumbnailCarousel>
            ) : (
              <NotFoundLabel text="No images available for this merchandise." />
            )}
          </div>
          <div className="mt-5 flex w-full max-w-[550px] flex-col self-stretch lg:w-1/2">
            <h1 className="mb-1 mt-5 text-2xl font-semibold text-blue-950 sm:text-3xl lg:text-4xl">
              {merch.name}
            </h1>
            <h2 className="mb-5 text-lg font-medium text-gray-400 md:text-xl">
              {merch.category.name}
            </h2>
            <p className="mb-8 text-sm font-medium md:text-base">
              {merch.shortDescription}
            </p>
            <p className="font-medium text-blue-900">Price</p>
            {merch.offer && selectedOption ? (
              <div className="flex items-center gap-2">
                <div className="relative inline-block">
                  <div className="relative top-4 h-0 w-full rotate-[-14deg] border-t-2 border-red-600"></div>
                  <p className="mb-8 text-lg font-medium text-gray-500 md:text-xl">
                    {local ? (
                      <>LKR {selectedOption?.cost.LKR}</>
                    ) : (
                      <>USD ${selectedOption?.cost.USD}</>
                    )}
                  </p>
                </div>
                <p className="mb-8 text-2xl font-semibold text-blue-900 md:text-3xl">
                  {local ? (
                    <>LKR {calcOffer(selectedOption?.cost.LKR, merch.offer)}</>
                  ) : (
                    <>USD ${calcOffer(selectedOption?.cost.USD, merch.offer)}</>
                  )}
                </p>
              </div>
            ) : (
              <p className="mb-8 text-2xl font-semibold text-blue-900 md:text-3xl">
                {local ? (
                  <>LKR {selectedOption?.cost.LKR}</>
                ) : (
                  <>USD ${selectedOption?.cost.USD}</>
                )}
              </p>
            )}
            <ul className="mb-8 ml-5 flex list-disc flex-col gap-2 text-sm text-gray-500">
              {merch.features &&
                merch.features.map((item, index: number) => (
                  <li key={index}>
                    <Markdown>{item}</Markdown>
                  </li>
                ))}
            </ul>
            <div className="mb-4 mt-5">
              <p className="mb-1 font-medium capitalize text-gray-600">
                Select {merch.options.type}
              </p>
              <div className="flex flex-wrap gap-2">
                {merch.options.option.map((option) => (
                  <label
                    key={option.id}
                    className={`inline-flex items-center rounded-md border-2 px-3 py-2 text-sm font-medium capitalize ${
                      selectedOption?.id === option.id
                        ? "border-gray-400 bg-gray-100 text-blue-950"
                        : "border-gray-300"
                    } cursor-pointer`}
                  >
                    <input
                      type="radio"
                      value={option.id}
                      checked={selectedOption?.id === option.id}
                      onChange={() => setSelectedOption(option)}
                      className="peer mr-2 hidden"
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-auto">
              <p className="mb-1 font-medium">Select Quantity</p>
              <QuantitySelector value={quantity} setValue={setQuantity} />
              {error && (
                <p className="mt-1 text-xs text-red-600">
                  Please select quantity
                </p>
              )}
            </div>
            <div className="mb-6 mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <MainButton
                text={"Add to Cart"}
                onClick={() => {
                  handlePurchase("add");
                }}
                bgColor="bg-gray-600 group-hover:bg-gray-800"
              />
              <MainButton
                text={"Buy Now"}
                onClick={() => {
                  handlePurchase("buy");
                }}
              />
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="description"
          className="w-full max-w-[1220px] px-4 sm:px-10"
        >
          <TabsList className="flex justify-center gap-4 border font-medium sm:gap-10">
            <TabsTrigger
              value="description"
              className="border-b-2 border-transparent p-2 transition-all data-[state=active]:border-blue-600 data-[state=active]:bg-slate-100"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="information"
              className="border-b-2 border-transparent p-2 transition-all data-[state=active]:border-blue-600 data-[state=active]:bg-slate-100"
            >
              Additional Information
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-2 px-6 py-4">
            <Markdown>{merch.description}</Markdown>
          </TabsContent>
          <TabsContent value="information" className="mt-2 px-6 py-4">
            <Markdown>{merch.additionalInformation}</Markdown>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MerchandiseContent;
