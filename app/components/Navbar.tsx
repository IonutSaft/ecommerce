import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import HamburgerMenu from "./HamburgerMenu";
import CartIcon from "./CartIcon";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  categories: Category[];
}

export default async function Navbar({ categories }: NavbarProps) {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-gray-900"
          >
            E<span className="text-blue-600">COMMERCE</span>
          </Link>
          <HamburgerMenu categories={categories} />
        </div>

        <div className="flex-1 max-w-xl px-12 hidden md:block">
          <form action="/products" method="GET" className="relative group">
            <input
              type="text"
              name="q"
              placeholder="Search for items, brands and more..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 text-[15px] text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6">
          <CartIcon />
          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="text-[15px] font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Hi, {session.user.name?.split(" ")[0]}
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="bg-gray-100 text-gray-900 px-6 py-3 rounded-2xl text-[15px] font-bold hover:bg-gray-200 active:scale-95 transition-all"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-[15px] font-bold hover:bg-gray-800 active:scale-95 transition-all shadow-lg shadow-gray-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
