"use client";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div>
      <Link href={`/event/${event.id}`}>
        <div className="card w-full h-full bg-base-100 transition shadow-lg hover:shadow-xl">
          <figure className="p-4">
            <img
              src={event.image}
              alt={event.title}
              width={500}
              height={500}
              className="aspect-square object-cover w-full h-full rounded-xl overflow-hidden"
              onError={(event) => {
                event.target.src = "/img/devscale-placeholder-dark.svg";
                event.onerror = null;
              }}
            />
          </figure>
          <div className="card-body pt-4">
            <div className="text-sm font-bold text-sky-700 flex items-center gap-2">
              {event.dateTime.toUpperCase()}
            </div>
            <h2 className="card-title line-clamp-1">{event.title}</h2>
            <p className="text-slate-500 line-clamp-2">{event.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
