import HoverLink from "./HoverLink";

export default function Footer() {
  return (
    <footer
      className="py-20 rounded-tl-[100%] rounded-tr-[100%] flex flex-col items-center justify-center text-white gap-5 shadow-black/60 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border-t border-white/10"
    >
      <h2 className="text-3xl md:text-4xl text-center font-semibold">
        Your earnings start here
      </h2>
      <p className="text-lg opacity-90">It only takes minutes</p>
      <HoverLink>
        Sign Up Now
      </HoverLink>
    </footer>
  );
}
