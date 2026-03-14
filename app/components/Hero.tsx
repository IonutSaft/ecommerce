import Link from "next/link";
import ProductGrid from "./ProductGrid";
import { Decimal } from "@prisma/client/runtime/index-browser";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: Decimal;
  image: string | null;
  category: {
    name: string;
  };
}

interface HeroProps {
  products: Product[];
}

export default function Hero({ products }: HeroProps) {
  return (
    <section className="px-6 pt-12">
      <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden mb-20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Style Meets <br />
            <span className="text-blue-200">Innovation.</span>
          </h1>
          <p className="text-xl text-blue-100 font-medium leading-relaxed mb-10 max-w-lg">
            Explore our latest collection of cutting-edge technology and modern
            lifestyle essentials. Free shipping on all orders over $100.
          </p>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
            Shop Collection
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-700/50 to-transparent"></div>
          {/* Abstract shape for flair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] opacity-50"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              Featured Products
            </h2>
            <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <Link
            href="/products"
            className="font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest text-[13px]"
          >
            View all products →
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
