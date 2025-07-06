import Link from "next/link";
import HoverAction from "./HoverAction";

export default function Footer() {
  return (
    <footer className="mt-20 px-5 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5 text-white">
      <div className="max_width mx-auto py-16 flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold playfair">
          Your earnings start here
        </h2>
        <p className="text-lg text-white/80">Get started in just minutes</p>
        <HoverAction href="/login">Sign Up Now</HoverAction>

        <p className="text-sm text-white/60">
          Questions?{" "}
          <Link
            href="mailto:invotrackerteam@gmail.com"
            className="underline hover:text-white"
          >
            Contact us
          </Link>
        </p>
      </div>

      <div className="border-t border-white/10 py-6 text-sm text-white/50 text-center">
        © {new Date().getFullYear()} InvoTracker. All rights reserved.
      </div>
    </footer>
  );
}