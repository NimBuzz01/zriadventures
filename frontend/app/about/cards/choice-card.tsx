import BlurImage from "@/components/common/BlurImage";
import React from "react";

interface Props {
  title: string;
  image: string;
  description: string;
}

const ChoiceCard = ({ title, image, description }: Props) => {
  return (
    <div className="flex flex-col gap-6 w-96">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <BlurImage src={image} alt={title} objectFit="contain" />
        </div>
        <h1 className="text-xl font-medium text-blue-900 md:text-2xl">
          {title}
        </h1>
      </div>
      <div className="text-center text-gray-500">{description}</div>
    </div>
  );
};

export default ChoiceCard;
