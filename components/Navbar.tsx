import HoverLink from "./HoverLink";

export default function Navbar(){
  return (
    <nav
      className="fixed top-5 left-5 right-5 z-50 border border-white rounded-lg px-4 py-3 max_width mx-auto flex items-center justify-between bg-white/10 backdrop-blur-2xl"
    >
      <h2 className="text-2xl font-semibold text-white">Invoice Tracker</h2>
      
      <HoverLink>
        Sign In
      </HoverLink>
    </nav>
  )
}