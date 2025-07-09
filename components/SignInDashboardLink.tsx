import { getUser } from "@/lib/supabaseDataFns";
import HoverAction from "./HoverAction";
import { links } from "@/lib/link";

type Props = {
  text?: string;
};

export default async function SignInDashboardLink({ text = "Sign In" }: Props) {
  const user = await getUser();

  if (user) {
    return <HoverAction href={links.dashboard}>My Dashboard</HoverAction>;
  }

  return <HoverAction href="/login">{text}</HoverAction>;
}
