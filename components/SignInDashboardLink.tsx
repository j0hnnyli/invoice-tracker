import { getUser } from "@/lib/supabaseDataFns";
import HoverAction from "./HoverAction";

type Props = {
  text?: string;
};

export default async function SignInDashboardLink({ text = "Sign In" }: Props) {
  const user = await getUser();

  if (user) {
    return <HoverAction href="/dashboard">My Dashboard</HoverAction>;
  }

  return <HoverAction href="/login">{text}</HoverAction>;
}
