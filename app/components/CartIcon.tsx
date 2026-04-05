"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link
        href="/cart"
        className="relative p-2 text-gray-900 hover:text-blue-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2V6l-3 -4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1 -8 0" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-900 hover:text-blue-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2V6l-3 -4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1 -8 0" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
