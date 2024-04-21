"use client";

import Link from "next/link";
/* 
  TODO:
  - [x] Implement get event API
  - [ ] Implement edit/delete if author is the same as the logged in user (show buttons, implement the APIs)
  - [x] Implement join event if the user is not the author (show button, implement the API)
  - [x] Implement show list of participants
  - [x] Enhance the UI
   */

import { useEffect, useState, useRef } from "react";
export default function Page({ params }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);
  const joinFormRef = useRef(null);

  async function getEvent() {
    // Get Event API
    const res = await fetch(
      `https://eventmakers.devscale.id/events/${params.slug}`
    );
    const { data } = await res.json();
    const _event = data.events;
    setEvent(_event);
    setParticipants(data.participants);

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
      // Do nothing
    }
  }

  async function joinEvent(formData) {
    const data = Object.fromEntries(formData);

    // Join Event API
    const res = await fetch(
      `https://eventmakers.devscale.id/events/${params.slug}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const jsonRes = await res.json();

    if (res.status === 201) {
      alert(jsonRes.message);
      joinFormRef.current.reset();
      document.getElementById("join-modal").close();

      getEvent(); // reload the event data
    } else {
      alert(jsonRes.message);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <Link href="/">
        <button class="btn">⬅️ Back</button>
      </Link>
      <div className="flex justify-between items-center mt-5 mb-5">
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
              {isAuthor ? (
                <div className="flex gap-2">
                  <Link href={`/event/${params.slug}/edit`}>
                    <button className="btn">Edit</button>
                  </Link>
                  <button className="btn" onClick={deleteEvent}>
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("join-modal").showModal()
                    }
                  >
                    Join
                  </button>

                  <dialog id="join-modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Join event</h3>
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div>
                        <form ref={joinFormRef} action={joinEvent}>
                          <div className="space-y-2 mb-5">
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Your name</span>
                              </div>
                              <input
                                name="name"
                                type="text"
                                placeholder="Input your name"
                                className="input input-bordered w-full"
                                required
                              />
                            </label>
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Email</span>
                              </div>
                              <input
                                name="email"
                                type="email"
                                placeholder="Input your email"
                                className="input input-bordered w-full"
                                required
                              />
                            </label>
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Phone number</span>
                              </div>
                              <input
                                name="phoneNumber"
                                type="tel"
                                placeholder="Input your phone number"
                                className="input input-bordered w-full"
                                required
                              />
                            </label>
                          </div>
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            type="submit"
                            className="btn btn-primary w-full mt-5"
                          >
                            Join
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              )}
            </div>
            <p className="text-gray-900">{event.dateTime}</p>

            {/* participant */}
            {participants.length ? (
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("participants-modal").showModal()
                }
              >
                👥 {participants.length} participant
                {participants.length > 1 ? "s" : ""}
              </button>
            ) : (
              <p className="text-sm text-gray-600">No participants yet</p>
            )}

            <dialog id="participants-modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Participants</h3>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="space-y-2 mt-5">
                  {participants.map((participant, index) => {
                    return (
                      <div key={participant.id} className="flex items-center">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">
                              {participant.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="ml-3">
                          <div className="text-bold">{participant.name}</div>
                          {isAuthor && (
                            <>
                              <div className="text-xs text-gray-700">
                                {participant.email}
                              </div>
                              <div className="text-xs text-gray-700">
                                {participant.phoneNumber}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </dialog>
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
