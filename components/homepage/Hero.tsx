import Image from "next/image";
import SignInDashboardLink from "../SignInDashboardLink";
import { Suspense } from "react";
import FadeInContainer from "../animation-components/AnimateFadeInContiner";

export default function Hero() {
  return (
    <div className="py-10 rounded-bl-2xl rounded-br-2xl relative p-5">
      <FadeInContainer direction="down" duration={0.4}>
        <div className="mt-20 flex flex-col items-center justify-center gap-5">
          <h2 className="text-white text-5xl md:text-6xl text-center tracking-widest playfair">
            Welcome To InvoTracker
          </h2>

          <p className="md:w-[50%] text-center text-gray-300">
            Invoice Tracker made easy to track, build, and manage invoices to keep
            your business organized
          </p>

          <Suspense fallback={<div className="w-[100px] h-[40px] bg-white/20 animate-pulse rounded-lg"/>}>
            <SignInDashboardLink text="Sign Up Now"/>
          </Suspense>
        </div>
      </FadeInContainer>

      <FadeInContainer direction="up" duration={0.4}>
        <div className="w-full max-w-[800px] h-[180px] mx-auto md:h-[400px] mt-10 rounded-lg relative overflow-hidden shadow-white/40 shadow-xl">
          <Image
            src="/dashboard.png"
            alt="dashboard"
            priority
            fill
            className="object-fill lg:object-cover object-top"
          />
        </div>
      </FadeInContainer>
    </div>
  );
}
