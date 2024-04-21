import MainForm from "@/components/MainForm";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between items-center  mb-5">
        <h2 className="text-2xl font-bold">Create event</h2>
      </div>

      <MainForm />
    </div>
  );
}
