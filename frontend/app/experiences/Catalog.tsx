"use client";
import React, { useEffect, useState } from "react";
import { ExperienceCategory, ExperienceTypes } from "@/types/experienceTypes";
import CatalogCard from "./CatalogCard";
import { getExperienceCategoryData } from "@/lib/data/experience-data";
import MainHeader from "@/components/common/MainHeader";
import SVGWave from "@/components/common/SVGWave";
import {
  EXPERIENCE_CATALOG_CARD_WATER_ACTIVITIES_NAME,
  EXPERIENCE_CATALOG_CARD_WATER_ACTIVITIES_IMAGE,
  EXPERIENCE_CATALOG_CARD_AIR_ACTIVITIES_IMAGE,
  EXPERIENCE_CATALOG_CARD_AIR_ACTIVITIES_NAME,
  EXPERIENCE_CATALOG_CARD_LAND_ACTIVITIES_IMAGE,
  EXPERIENCE_CATALOG_CARD_LAND_ACTIVITIES_NAME,
} from "@/constants/pages/ExperiencesPageConstants";

const Catalog = () => {
  const [waterCategories, setWaterCategories] = useState<ExperienceCategory[]>(
    []
  );
  const [landCategories, setLandCategories] = useState<ExperienceCategory[]>(
    []
  );
  const [airCategories, setAirCategories] = useState<ExperienceCategory[]>([]);

  useEffect(() => {
    fetchData("water", setWaterCategories);
    fetchData("land", setLandCategories);
    fetchData("air", setAirCategories);
  }, []);

  async function fetchData(
    categoryType: string,
    setData: React.Dispatch<React.SetStateAction<ExperienceCategory[]>>
  ) {
    try {
      const mappedCategories = await getExperienceCategoryData();
      const filteredCategories = mappedCategories.filter(
        (e) => e.type === categoryType
      );
      setData(filteredCategories);
    } catch (error) {
      console.error(`Error fetching and mapping ${categoryType} data:`, error);
    }
  }

  return (
    <div className="relative w-full bg-blue-50 pb-60 pt-16">
      <MainHeader subtitle="All in one" title="Browse our Catalog" />
      <div className="flex w-full flex-col flex-wrap justify-center lg:flex-row">
        <CatalogCard
          categories={waterCategories}
          name={EXPERIENCE_CATALOG_CARD_WATER_ACTIVITIES_NAME}
          image={EXPERIENCE_CATALOG_CARD_WATER_ACTIVITIES_IMAGE}
        />
        <CatalogCard
          categories={landCategories}
          name={EXPERIENCE_CATALOG_CARD_LAND_ACTIVITIES_NAME}
          image={EXPERIENCE_CATALOG_CARD_LAND_ACTIVITIES_IMAGE}
        />
        <CatalogCard
          categories={airCategories}
          name={EXPERIENCE_CATALOG_CARD_AIR_ACTIVITIES_NAME}
          image={EXPERIENCE_CATALOG_CARD_AIR_ACTIVITIES_IMAGE}
        />
      </div>
      <SVGWave fillColor="fill-gray-50" />
    </div>
  );
};

export default Catalog;
