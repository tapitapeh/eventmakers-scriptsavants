"use client";

import Cookies from "js-cookie";
import { useRef, useState } from "react";

export default function MainForm({ value, slug }) {
  const formRef = useRef();
  const [message, setMessage] = useState("");

  async function handleCreateEvent(formData) {
    const data = Object.fromEntries(formData);

    const userData = JSON.parse(localStorage.getItem("userData"));
    data["author"] = userData.id;

    // POST Create Event API
    const token = Cookies.get("token");
    const res = await fetch(
      `https://eventmakers.devscale.id/events/${slug ?? ""}`,
      {
        method: value ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    // TODO : Redirect to event detail after create/update
    if (res.status === 200 || res.status === 201) {
      const jsonRes = await res.json();
      alert(jsonRes.message);
      formRef.current.reset();

      // router.push("/my-events");
      if (slug) {
        window.location.href = `/event/${slug}`;
      } else {
        window.location.href = `/my-events`;
      }
    } else {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }
  return (
    <div>
      <form ref={formRef} action={handleCreateEvent}>
        <div className="space-y-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              name="title"
              type="text"
              defaultValue={value?.title ?? ""}
              placeholder="Input event title"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              name="description"
              type="text"
              defaultValue={value?.description ?? ""}
              placeholder="Input event description"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Image URL</span>
            </div>
            <input
              name="image"
              type="url"
              defaultValue={value?.image ?? ""}
              placeholder="Insert image URL"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Date/Time</span>
            </div>
            <input
              name="dateTime"
              type="text"
              defaultValue={value?.dateTime ?? ""}
              placeholder="Insert date and time of the event"
              className="input input-bordered w-full"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            {value ? "Update Event" : "Create Event"}
          </button>

          <div className="flex justify-center mt-3">
            {message !== "" ? (
              <div className="bg-red-500 text-white p-5 text-center  rounded text-sm">
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
