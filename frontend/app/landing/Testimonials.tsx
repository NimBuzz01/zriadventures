"use client";
import TestimonialCard from "./cards/TestimonialCard";
import Carousel from "@/components/carousels/Carousel";
import TripAdvisorBadge from "@/components/TripAdvisorBadge";
import {
  LANDING_TESTIMONIALS_MAIN_TITLE,
  LANDING_TESTIMONIALS_SUB_TITLE,
} from "@/constants/pages/LandingPageConstants";
import MainHeader from "@/components/common/MainHeader";
import { testimonialData } from "@/lib/data/testimonial-data";
import { ElfsightWidget } from "react-elfsight-widget";
import { TRIPADVISOR_WIDGET_ID } from "@/app.config";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-16">
      <MainHeader
        subtitle={LANDING_TESTIMONIALS_SUB_TITLE}
        title={LANDING_TESTIMONIALS_MAIN_TITLE}
      />
      <ElfsightWidget widgetId={TRIPADVISOR_WIDGET_ID} lazy modern />
      <div className="flex w-full flex-col justify-around gap-10 px-4 lg:flex-row lg:px-20">
        {/* <div className="flex items-center justify-center lg:w-[30%]">
                    <TripAdvisorBadge />
                </div> */}
        <div className="mt-1 w-full lg:w-[90%]">
          <Carousel
            perView={1.1}
            sm={1.65}
            md={2.4}
            lg={2.4}
            xl={3}
            xl2={3.8}
            spacing={10}
            arrows
            dots
          >
            {testimonialData.map((testimonial, index) => (
              <div key={index}>
                <TestimonialCard
                  name={testimonial.name}
                  location={testimonial.location}
                  stars={testimonial.stars}
                  review={testimonial.review}
                  image={testimonial.image}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
