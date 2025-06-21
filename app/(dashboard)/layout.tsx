import { ReactNode } from "react";
import { getUser } from "@/lib/supabaseDataFns";
import SideBar from "./SideBar";
import MediaSideBar from "./MediaSideBar";



export default async function DashboardLayout({ children } : { children : ReactNode }){
  const user = await getUser();


  return (
    <div className="dashboard_max_width mx-auto flex">
      <SideBar name={user?.user_metadata.display_name}/>
      <MediaSideBar />
      <div className="m-5 p-5 bg-white/10 w-full rounded-lg text-white self-start">
        {children}
      </div>
    </div>
  )
}