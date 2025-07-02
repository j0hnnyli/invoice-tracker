'use client'

import { signout } from "@/app/actions/signout";
import { useTransition } from "react";
import { PiSignOutFill } from "react-icons/pi";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  onComplete?: () => void;
};

export default function SignoutButton({ className, onComplete } : Props) {
  const [isPending, startTransition] = useTransition();

  async function handleSignout() {
    startTransition(async () => {
      await signout();
      onComplete?.();
    });
  }

  return (
    <button
      onClick={handleSignout}
      className={twMerge("flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 cursor-pointer", className)}
      disabled={isPending}
    >
      {isPending ? (
        <CgSpinnerTwoAlt className="text-xl md:text-3xl animate-spin" />
      ) : (
        <PiSignOutFill className="text-xl md:text-3xl" />
      )}
      <p className="text-xl">Sign Out</p>
    </button>
  );
}
