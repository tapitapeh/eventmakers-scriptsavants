"use client";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div>
      <Link href={`/event/${event.id}`}>
        <div className="card w-full h-full bg-base-100 transition border hover:shadow-xl">
          <figure>
            <img
              src={event.image}
              alt={event.title}
              width={500}
              height={500}
              className="aspect-square object-cover w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <p className="line-clamp-3">{event.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
