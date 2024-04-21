// import { useEffect, useState } from "react";

import Link from "next/link";

export default async function Home() {
  const res = await fetch(`https://eventmakers.devscale.id/events`);
  const { data } = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="btn btn-primary">Button</button>

      <div className="bg-white p-5">
        {data.map((detail, index) => {
          return (
            <Link href={`/event/${detail.events.id}`} key={index}>
              <div key={detail.events.id} className="text-black">
                <div>{detail.events.id}</div>
                <div>{detail.events.title}</div>
                <div>{detail.events.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
