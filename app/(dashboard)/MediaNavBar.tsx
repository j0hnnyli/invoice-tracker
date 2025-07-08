import YearDropDown from "@/components/YearDropDown";
import MediaNavBarMenu from "./MediaNavBarMenu";
import { Suspense } from "react";

type MediaNavBarProps = {
  name : string;
}

export default function MediaNavBar( { name } : MediaNavBarProps){

  return (
    <nav className="fixed bottom-0 w-full px-5 py-3 bg-white/10 backdrop-blur-3xl text-white z-50 md:hidden playfair flex items-center justify-between">
      <Suspense fallback={<div className="text-sm text-white/70">Loading...</div>}>
        <YearDropDown />
      </Suspense>

      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold">InvoTracker</h2>
      </div>

      <div className="">
        <MediaNavBarMenu inital={name[0]} />
      </div>
    </nav>
  )
}