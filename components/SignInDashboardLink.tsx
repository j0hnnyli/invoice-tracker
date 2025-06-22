import { getUser } from "@/lib/supabaseDataFns";
import HoverAction from "./HoverAction";

export default async function SignInDashboardLink(){
  const user = await getUser();

  if(!user){
    return <HoverAction href="/login">Sign In</HoverAction>
  }

  return (
    <HoverAction href="/dashboard">My Dashboard</HoverAction>
  )
}
