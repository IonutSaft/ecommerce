import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900">
          MODERN<span className="text-blue-600">STORE</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-[15px] font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-xl px-12 hidden md:block">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search for items, brands and more..."
            className="w-full bg-gray-50 border-none rounded-2xl py-3 px-6 text-[15px] text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-gray-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/auth/signin"
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-[15px] font-bold hover:bg-gray-800 active:scale-95 transition-all shadow-lg shadow-gray-200"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
