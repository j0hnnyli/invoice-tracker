import HoverAction from "../HoverAction";

export default function Hero() {
  return (
    <div className="py-10 rounded-bl-2xl rounded-br-2xl relative h-screen overflow-hidden max-h-[800px] p-5">
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <h2 className="text-white text-5xl md:text-6xl text-center tracking-widest playfair">
          Welcome To InvoTracker
        </h2>

        <p className="md:w-[50%] text-center text-gray-300">
          Invoice Tracker made easy to track, build, and manage invoices to keep
          your business organized
        </p>

        <HoverAction href="/login">Sign up Now</HoverAction>
      </div>

      <div className="border max_width mx-auto h-[500px] mt-10 bg-gray-300 rounded-lg" />
    </div>
  );
}
