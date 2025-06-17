import HoverLink from "../HoverLink";

export default function Hero(){
  return (
     <div className="py-10 rounded-bl-2xl rounded-br-2xl relative h-screen overflow-hidden max-h-[800px] p-5 border-b border-white/10 shadow-black/60 shadow-2xl">
        <div className="mt-20 flex flex-col items-center justify-center ">
        
          <h2 className="text-white text-6xl text-center tracking-widest">
            <span>Invoice</span>
            <span>{" "} Tracker</span>
          </h2>

          <p className="md:w-[50%] text-center mb-10 text-gray-300">
            Invoice Tracker made easy to track, build, and manage invoices to keep your business organized 
          </p>

          <HoverLink>
            Sign up Now
          </HoverLink>
        </div>

        <div className="border max_width mx-auto h-[500px] mt-10 bg-gray-300 rounded-lg"/> 
      </div>
  )
}