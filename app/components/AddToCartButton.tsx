"use client";

import { useCartStore } from "@/lib/store/useCartStore";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({
  product,
  className,
  children,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addItem(product);
      }}
      className={
        className ||
        "w-full mt-2 bg-gray-50 text-gray-900 py-3.5 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
      }
    >
      {children || "Add to Cart"}
    </button>
  );
}
