"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";

export default function Page() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  async function getEvents() {
    // Get Event API
    const res = await fetch(`https://eventmakers.devscale.id/events`);
    const { data } = await res.json();
    setEvents(data);
    setFilteredEvents(data);
  }

  function searchEvent(e) {
    const search = e.target.value;
    const filtered = events.filter((event) => {
      return event.events.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredEvents(filtered);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="flex justify-between items-center  mb-5">
        <h2 className="text-2xl font-bold">Events</h2>
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="🔍 Search event"
          onChange={searchEvent}
          className="input input-bordered w-full"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 bg-white mt-5">
        {filteredEvents.length ? (
          filteredEvents.map((detail, index) => {
            return <EventCard key={index} event={detail.events} />;
          })
        ) : (
          <div className="text-center w-full col-span-full">
            No events found
          </div>
        )}
      </div>
    </main>
  );
}
