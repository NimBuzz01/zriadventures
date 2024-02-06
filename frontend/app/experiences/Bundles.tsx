"use client";
import NotFoundLabel from "@/components/NotFoundLabel";
import ExperienceCard from "@/components/cards/ExperienceCard";
import Carousel from "@/components/carousels/Carousel";
import MainHeader from "@/components/common/MainHeader";
import { EXPERIENCES_NOT_FOUND } from "@/constants/NotFoundConstants";
import { useDataContext } from "@/contexts/data-context";
import React from "react";

const Bundles = () => {
  const { experiences } = useDataContext();

  const bundles = experiences.filter(
    (experience) => experience.bundle === true
  );

  return (
    <div className="relative flex flex-col items-center px-6 py-16 lg:px-10">
      <MainHeader subtitle="Combo deals" title="Experience Bundles" />
      <div className="mt-10 w-full sm:w-[90%]">
        {bundles.length > 0 ? (
          <Carousel
            perView={1}
            sm={1.55}
            md={1.8}
            lg={2.5}
            xl={3.1}
            xl2={3.8}
            spacing={10}
            arrows
            dots
          >
            {bundles.map((bundle) => (
              <ExperienceCard experience={bundle} key={bundle.id} />
            ))}
          </Carousel>
        ) : (
          <NotFoundLabel text={EXPERIENCES_NOT_FOUND} />
        )}
      </div>
    </div>
  );
};

export default Bundles;
