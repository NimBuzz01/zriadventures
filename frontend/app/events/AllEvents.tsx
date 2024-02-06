"use client";
import NotFoundLabel from "@/components/NotFoundLabel";
import EventCard from "@/components/cards/EventCard";
import MainHeader from "@/components/common/MainHeader";
import { useDataContext } from "@/contexts/data-context";
import React, { useState } from "react";

const AllEvents = () => {
  const { events } = useDataContext();
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.startDate);

    if (filter === "upcoming") {
      return eventDate > currentDate;
    } else if (filter === "past") {
      return eventDate < currentDate;
    } else {
      return true;
    }
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-blue-50 px-6 py-16">
      <MainHeader subtitle="What's new" title="All Events" />
      <div className="w-full max-w-[1600px]">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            className={`rounded px-4 py-2 text-sm font-medium uppercase tracking-wide ${
              filter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("all")}
          >
            All Events
          </button>
          <button
            className={`rounded px-4 py-2 text-sm font-medium uppercase tracking-wide ${
              filter === "upcoming"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`rounded px-4 py-2 text-sm font-medium uppercase tracking-wide ${
              filter === "past"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFilter("past")}
          >
            Past Events
          </button>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-5">
          {filteredEvents.length > 0 ? (
            <>
              {filteredEvents.map((event) => (
                <EventCard event={event} key={event.id} width="w-96" />
              ))}
            </>
          ) : (
            <NotFoundLabel text="No Events Found!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
