import SignInDashboardLink from "./SignInDashboardLink";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-1 left-5 right-5 z-50 border border-white rounded-lg px-4 py-3 max_width mx-auto flex items-center justify-between bg-white/10 backdrop-blur-3xl">
      <h2 className="text-2xl font-semibold text-white playfair">
        InvoTracker
      </h2>

      <Suspense fallback={<div className="w-[100px] h-[40px] bg-white/20 animate-pulse rounded-lg"/>}>
        <SignInDashboardLink />
      </Suspense>
    </nav>
  );
}

