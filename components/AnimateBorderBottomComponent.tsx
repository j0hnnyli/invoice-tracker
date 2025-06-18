import { ReactNode } from "react";

export default function AnimateBorderBottomComponent({children} : { children : ReactNode}){
  return (
     <div className="relative group focus-within">
      {children}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full scale-x-0 origin-left bg-white transition-transform duration-300 ease-in-out group-focus-within:scale-x-100 rounded-lg" />
    </div>
  )
}