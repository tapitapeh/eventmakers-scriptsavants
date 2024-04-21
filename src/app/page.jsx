import EventCard from "@/components/EventCard";

export default async function Home() {
  const res = await fetch(`https://eventmakers.devscale.id/events`);
  const { data } = await res.json();

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-3 gap-5 bg-white p-5">
        {data.map((detail, index) => {
          return <EventCard key={index} event={detail.events} />;
        })}
      </div>
    </main>
  );
}
