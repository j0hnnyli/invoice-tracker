'use client'

import { signout } from "@/app/actions/signout";
import { useTransition } from "react";
import { PiSignOutFill } from "react-icons/pi";
import { CgSpinnerTwoAlt } from "react-icons/cg";

type Props = {
  onSignoutComplete?: () => void;
};

export default function SignoutButton({ onSignoutComplete }: Props) {
  const [isPending, startTransition] = useTransition();

  async function handleSignout() {
    startTransition(async () => {
      await signout();
      if (onSignoutComplete) {
        onSignoutComplete();
      }
    });
  }

  return (
    <button
      onClick={handleSignout}
      className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 cursor-pointer"
      disabled={isPending}
    >
      {isPending ? (
        <CgSpinnerTwoAlt className="text-3xl animate-spin" />
      ) : (
        <PiSignOutFill className="text-3xl" />
      )}
      <p className="text-xl">Sign Out</p>
    </button>
  );
}
