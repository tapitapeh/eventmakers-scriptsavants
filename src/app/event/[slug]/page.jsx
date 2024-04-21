export default async function Page({ params }) {
  const res = await fetch(
    `https://eventmakers.devscale.id/events/${params.slug}`
  );
  const { data } = await res.json();

  /* 
  TODO:
  - [x] Implement get event API
  - [ ] Implement edit/delete if author is the same as the logged in user (show buttons, implement the APIs)
  - [ ] Implement join event if the user is not the author (show button, implement the API)
  - [ ] Implement show list of participants
  - [ ] Enhance the UI
   */
  return (
    <div>
      <div>{data.events.id}</div>
      <div>{data.events.title}</div>
      <div>{data.events.description}</div>
      <div>{data.events.image}</div>
      <div>{data.events.dateTime}</div>
      <div>{data.events.author}</div>
    </div>
  );
}
