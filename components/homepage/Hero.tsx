import Image from "next/image";
import SignInDashboardLink from "../SignInDashboardLink";

export default function Hero() {
  return (
    <div className="py-10 rounded-bl-2xl rounded-br-2xl relative p-5">
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <h2 className="text-white text-5xl md:text-6xl text-center tracking-widest playfair">
          Welcome To InvoTracker
        </h2>

        <p className="md:w-[50%] text-center text-gray-300">
          Invoice Tracker made easy to track, build, and manage invoices to keep
          your business organized
        </p>

        <SignInDashboardLink />
      </div>

      <div className="w-full max-w-[800px] h-[180px] mx-auto md:h-[400px] mt-10 rounded-lg relative overflow-hidden shadow-white/40 shadow-xl">
        <Image
          src="/dashboard.png"
          alt="dashboard"
          fill
          className="object-fill lg:object-cover object-top"
        />
      </div>
    </div>
  );
}
