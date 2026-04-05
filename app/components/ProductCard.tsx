import Image from "next/image";
import Link from "next/link";
import { Decimal } from "@prisma/client/runtime/index-browser";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: Decimal;
    image: string | null;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border border-gray-50">
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[4/5] overflow-hidden"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center font-bold text-gray-300 uppercase tracking-widest text-center px-4">
            No Image
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter text-blue-600 shadow-sm">
            New Arrival
          </span>
        </div>
      </Link>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
              {product.category.name}
            </p>
            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="font-black text-lg text-gray-900">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image || "",
            slug: product.slug,
          }}
        />
      </div>
    </div>
  );
}
