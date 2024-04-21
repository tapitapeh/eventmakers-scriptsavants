import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div>
      <Link href={`/event/${event.id}`}>
        {/* <div className="text-black">
          <div>{event.id}</div>
          <div>{event.title}</div>
          <div>{event.description}</div>
        </div> */}

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={event.image} alt={event.title} width={500} height={500} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <p>{event.description}</p>
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
