import MainHeader from "@/components/common/MainHeader";
import { ABOUT_WHY_CHOOSE_US } from "@/constants/pages/AboutPageConstants";
import React from "react";
import ChoiceCard from "./cards/choice-card";

const WhyChoose = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-16 sm:px-16">
      <MainHeader subtitle="How we work" title="Why Choose ZRI Adventures" />
      <div className="mt-10 flex w-full max-w-[1400px] flex-wrap justify-center gap-16">
        {ABOUT_WHY_CHOOSE_US.map((data, index) => (
          <ChoiceCard
            key={index}
            title={data.title}
            image={data.image}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
