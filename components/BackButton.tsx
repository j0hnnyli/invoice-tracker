import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function BackButton(){
  
  return (
    <Link href="/" className="flex items-center group cursor-pointer">
      <IoArrowBack className="text-xl mr-2 group-hover:mr-3 transition-all duration-300 ease-in-out"/>
      <span>Back</span>
    </Link>
  )
}