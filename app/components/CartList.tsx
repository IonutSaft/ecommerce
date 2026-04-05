"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartList() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-40 bg-gray-50 rounded-3xl" />
        <div className="h-40 bg-gray-50 rounded-3xl" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
        <div className="mb-6 inline-flex p-6 bg-white rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2V6l-3 -4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1 -8 0" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Your bag is empty</h2>
        <p className="text-gray-500 mb-8 font-medium">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-block bg-gray-900 text-white px-10 py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="lg:w-2/3 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex gap-6 p-6 bg-white rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500"
          >
            <div className="relative w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden bg-gray-50">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] text-gray-300 uppercase tracking-widest">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-grow flex flex-col justify-between py-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="text-lg font-black text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-900 hover:bg-white rounded-xl transition-all font-black text-xl active:scale-90"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-900 hover:bg-white rounded-xl transition-all font-black text-xl active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-1/3">
        <div className="sticky top-32 p-10 bg-gray-900 rounded-[3rem] text-white shadow-2xl shadow-blue-100">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-gray-400 mb-8">
            Order Summary
          </h3>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold">Subtotal</span>
              <span className="text-xl font-black">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold">Shipping</span>
              <span className="text-gray-400 font-bold uppercase text-[11px] tracking-widest">Calculated at next step</span>
            </div>
            
            <div className="h-px bg-white/10 w-full my-4" />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-black uppercase tracking-widest">Total</span>
              <span className="text-3xl font-black text-blue-400">${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-6 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20 mt-4">
              Checkout Now
            </button>
            
            <p className="text-center text-[10px] text-gray-500 font-black uppercase tracking-tighter mt-6">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
