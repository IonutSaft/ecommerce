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
