import EventCard from "@/components/EventCard";

export default async function Home() {
  const res = await fetch(`https://eventmakers.devscale.id/events`);
  const { data } = await res.json();

  return (
    <main className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 bg-white">
        {data.map((detail, index) => {
          return <EventCard key={index} event={detail.events} />;
        })}
      </div>
    </main>
  );
}
