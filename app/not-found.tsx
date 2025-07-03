import { getUser } from "@/lib/supabaseDataFns";
import Link from "next/link";

export default async function NotFoundPage() {
  const user = await getUser();

  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="max_width text-center text-white p-6">
        <h1 className="text-4xl font-bold playfair mb-8">InvoTracker</h1>
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <h3 className="text-3xl mb-2 playfair">Page Not Found</h3>
        <p className="text-gray-300 mb-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href={user ? "/dashboard" : "/"}
          className="px-4 py-2 bg-white/20 hover:bg-white/10 text-white rounded transition"
        >
          {user ? "Go to Dashboard" : "Go Home"}
        </Link>
      </div>
    </div>
  );
}
