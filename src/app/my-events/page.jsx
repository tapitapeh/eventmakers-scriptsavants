"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

export default function Page() {
  const [events, setEvents] = useState([]);

  async function getEvents() {
    // Get Event API
    const res = await fetch(`https://eventmakers.devscale.id/events`);
    const { data } = await res.json();
    setEvents(data);
  }

  function checkIfAuthor(event) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && event.author === userData.id) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="flex justify-between items-center  mb-5">
        <h2 className="text-2xl font-bold">My Events</h2>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 bg-white">
        {events.map((detail, index) => {
          if (checkIfAuthor(detail.events))
            return <EventCard key={index} event={detail.events} />;
        })}
      </div>
    </main>
  );
}
