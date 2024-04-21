"use client";

import Cookies from "js-cookie";

export default function MainForm({ value }) {
  async function handleCreateEvent(formData) {
    const data = Object.fromEntries(formData);

    // POST Create Event API
    const token = Cookies.get("token");
    const res = await fetch("https://eventmakers.devscale.id/events/", {
      method: value ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // TODO : Redirect to event detail after create/update
  }
  return (
    <div>
      <form action={handleCreateEvent}>
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
        </div>
      </form>
    </div>
  );
}
