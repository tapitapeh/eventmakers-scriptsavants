"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";

export default function Page() {
  const [events, setEvents] = useState([]);

  async function getEvents() {
    // Get Event API
    const res = await fetch(`https://eventmakers.devscale.id/events`);
    const { data } = await res.json();

    const userData = JSON.parse(localStorage.getItem("userData"));

    const authorEvents = data.filter((event) => {
      return event.events.author === userData.id;
    });

    setEvents(authorEvents);
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
        {events.length ? (
          events.map((detail, index) => {
            // if (checkIfAuthor(detail.events))
            return <EventCard key={index} event={detail.events} />;
          })
        ) : (
          <div className="text-center col-span-full py-40">
            <p className="text-lg">You don&apos;t have any events</p>
            <div></div>
            <Link href="/event/create">
              <button className="btn btn-primary mt-5">Create event</button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
