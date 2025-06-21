import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import LoginForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import AnimateForm from "@/components/animation-components/AnimateForms";

type Props = {
  searchParams: { mode?: string };
};

export default async function Login({ searchParams }: Props) {
  const mode = (await searchParams).mode;

  return (
    <div className="flex items-center justify-center h-screen p-5 overflow-auto">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 max_width mx-auto w-full py-10 md:py-0">
        <div className="w-full h-full flex flex-col items-center justify-center playfair text-white gap-5">
          <h2 className="text-3xl md:text-4xl text-center">Sign Up And Get Your Personal Dashboard!</h2>
          <div className="hidden md:inline-block h-[300px] w-[90%] bg-gray-300 rounded-lg"/>
          <p className="text-xl text-gray-300">Your Earnings Just Minutes Away</p>
        </div> 

        <div className="w-full">
          <Link 
            href="/" 
            className="flex items-center group cursor-pointer text-white py-1 relative group gap-3 w-[120px] self-start mb-5"
          >
            <IoArrowBack className="text-xl"/>
            <span>Back Home</span>
            <span className="absolute bottom-[-1px] h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-all duration-300 ease-in-out border w-full"></span>
          </Link>

          <AnimateForm modeKey={mode ?? "signin"}>
            {mode === "signup" ? <SignUpForm /> : <LoginForm />}
          </AnimateForm>
        </div>
      </div>
    </div>
  );
}
