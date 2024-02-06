"use client";
import ExperienceCard from "../../components/cards/ExperienceCard";
import Carousel from "@/components/carousels/Carousel";
import {
  LANDING_TRENDING_BUTTON,
  LANDING_TRENDING_BUTTON_URL,
  LANDING_TRENDING_MAIN_TITLE,
  LANDING_TRENDING_SUB_TITLE,
} from "@/constants/pages/LandingPageConstants";
import { ExperienceTypes } from "@/types/experienceTypes";
import MainHeader from "@/components/common/MainHeader";
import { useDataContext } from "@/contexts/data-context";
import NotFoundLabel from "@/components/NotFoundLabel";
import MainButton from "../../components/common/MainButton";
import { EXPERIENCES_NOT_FOUND } from "@/constants/NotFoundConstants";
import SVGWave from "@/components/common/SVGWave";

const Experience = () => {
  const { experiences } = useDataContext();
  const trendingExperiences = experiences.filter(
    (experience: ExperienceTypes) => experience.trending
  );

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-100 to-blue-50 px-4 py-16">
      <MainHeader
        subtitle={LANDING_TRENDING_SUB_TITLE}
        title={LANDING_TRENDING_MAIN_TITLE}
      />
      <div className="z-10 w-full sm:w-[90%]">
        {trendingExperiences.length > 0 ? (
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
            {trendingExperiences.map((experience: ExperienceTypes) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </Carousel>
        ) : (
          <NotFoundLabel text={EXPERIENCES_NOT_FOUND} />
        )}
      </div>
      <MainButton
        href={LANDING_TRENDING_BUTTON_URL}
        text={LANDING_TRENDING_BUTTON}
        style="z-10"
      />
      <div className="w-full sm:h-10 md:h-20 "></div>
      <SVGWave fillColor="fill-gray-50" />
    </div>
  );
};

export default Experience;
