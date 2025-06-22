import { ReactNode } from "react";
import { getUser } from "@/lib/supabaseDataFns";
import SideBar from "./SideBar";
import MediaNavBar from "./MediaNavBar";
import { BorderBeam } from "@/components/magicui/border-beam";



export default async function DashboardLayout({ children } : { children : ReactNode }){
  const user = await getUser();


  return (
    <div className="dashboard_max_width mx-auto flex">
      <SideBar name={user?.user_metadata.display_name}/>
      <MediaNavBar />
      <div className="m-5 p-5 bg-white/10 w-full rounded-lg text-white self-start relative">
        <BorderBeam duration={6} size={200} className="overflow-hidden"/>
        {children}
      </div>
    </div>
  )
}