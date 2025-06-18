import HoverAction from "./HoverAction";

export default function Footer() {
  return (
    <footer className="py-20 flex flex-col items-center justify-center text-white gap-5 border-t border-white/10 ">
      <h2 className="text-3xl md:text-4xl text-center font-semibold playfair">
        Your earnings start here
      </h2>
      <p className="text-lg opacity-90">It only takes minutes</p>
      <HoverAction href="/login">Sign Up Now</HoverAction>
    </footer>
  );
}
