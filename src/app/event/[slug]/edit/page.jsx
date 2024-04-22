"use client";

import MainForm from "@/components/MainForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import IconBack from "@/components/icons/IconBack";

export default function Page({ params }) {
  const [event, setEvent] = useState({});
  // Get Event API
  async function getEvent() {
    const res = await fetch(
      `https://eventmakers.devscale.id/events/${params.slug}`
    );
    const { data } = await res.json();
    let _event = data.events;
    setEvent(_event);
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <Link href={`/event/${params.slug}`}>
        <button class="btn flex items-center gap-2">
          <IconBack />
          Back
        </button>
      </Link>
      <div className="flex justify-between items-center mt-5 mb-5">
        <h2 className="text-2xl font-bold">Edit event</h2>
      </div>

      <MainForm value={event} />
    </div>
  );
}
