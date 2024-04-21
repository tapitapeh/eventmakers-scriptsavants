"use client";

import Link from "next/link";
/* 
  TODO:
  - [x] Implement get event API
  - [ ] Implement edit/delete if author is the same as the logged in user (show buttons, implement the APIs)
  - [ ] Implement join event if the user is not the author (show button, implement the API)
  - [ ] Implement show list of participants
  - [ ] Enhance the UI
   */

import { useEffect, useState } from "react";
export default function Page({ params }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [event, setEvent] = useState({});

  async function getEvent() {
    // Get Event API
    const res = await fetch(
      `https://eventmakers.devscale.id/events/${params.slug}`
    );
    const { data } = await res.json();
    const _event = data.events;
    setEvent(_event);

    // Check if the author is the same as the logged in user
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && _event.author === userData.id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }

  async function deleteEvent() {
    if (confirm("Are you sure you want to remove this event?")) {
      // DELETE Event API
      const token = Cookies.get("token");
      const res = await fetch("https://eventmakers.devscale.id/events/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // TODO : Redirect to home after delete
    } else {
      // Do nothing!
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center  mb-5">
        <h2 className="text-2xl font-bold">Detail event</h2>
      </div>
      <div>
        <div className="flex gap-5 w-full">
          {/* image */}
          <div className="flex-shrink-0 w-1/4 rounded-xl overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full" />
          </div>
          <div className="space-y-5 w-full">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              {isAuthor && (
                <div className="flex gap-2">
                  <Link href={`/event/${params.slug}/edit`}>
                    <button className="btn">Edit</button>
                  </Link>
                  <button className="btn" onClick={deleteEvent}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-900">{event.dateTime}</p>

            {/* participant */}
            {/* <div>
            {data.participants.map((participant, index) => {
              return <div key={participant.id}>{participant.name}</div>;
            })}
          </div> */}
            <hr />
            <div>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
