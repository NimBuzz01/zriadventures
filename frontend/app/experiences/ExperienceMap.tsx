"use client";
import SLMap from "@/components/SLMap";
import MainHeader from "@/components/common/MainHeader";
import { getExperienceLocationData } from "@/lib/data/experience-data";
import { ExperienceLocation } from "@/types/experienceTypes";
import React, { useEffect, useState } from "react";

const ExperienceMap = () => {
  const [locations, setLocations] = useState<ExperienceLocation[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const mappedLocations = await getExperienceLocationData();
        setLocations(mappedLocations);
      } catch (error) {
        console.error("Error fetching and mapping data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex w-full flex-col items-center justify-center px-2 py-10 sm:px-10">
      <MainHeader subtitle={"Discover"} title={"Experience Map"} />
      <SLMap markers={locations} />
    </div>
  );
};

export default ExperienceMap;
