"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { isDrawerOpen, closeDrawer, items, removeItem, updateQuantity } = useCartStore();
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Your <span className="text-blue-600">Bag</span>
              </h2>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </p>
            </div>
            <button
              onClick={closeDrawer}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:rotate-90 transition-transform duration-300"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-8 space-y-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-[8px] text-gray-300 uppercase tracking-widest text-center px-1">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                        <Link href={`/product/${item.slug}`} onClick={closeDrawer}>
                          {item.name}
                        </Link>
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-gray-50 rounded-xl p-0.5 border border-gray-100">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-900 hover:bg-white rounded-lg transition-all font-black"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-black text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-900 hover:bg-white rounded-lg transition-all font-black"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-300"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2V6l-3 -4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1 -8 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900">Bag is empty</h3>
                <p className="text-gray-400 font-medium text-sm mt-2 max-w-[200px]">
                  Looks like you haven&apos;t added any items yet.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] font-black uppercase tracking-widest text-gray-400">
                Subtotal
              </span>
              <span className="text-3xl font-black text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="space-y-3">
              <button
                disabled={items.length === 0}
                className="w-full bg-blue-600 text-white py-6 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/10 disabled:opacity-50"
              >
                Checkout Now
              </button>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="block w-full text-center bg-gray-900 text-white py-6 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                View Full Bag
              </Link>
            </div>
            <p className="text-center text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-4">
              Free shipping on orders over $150
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
