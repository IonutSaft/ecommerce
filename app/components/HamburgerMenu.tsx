"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface HamburgerMenuProps {
  categories: Category[];
}

export default function HamburgerMenu({ categories }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-900 group"
        aria-label="Toggle menu"
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
          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 py-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-6 py-2">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">
              Shop Categories
            </h3>
            <div className="space-y-1">
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 -mx-4 rounded-xl text-[15px] font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 -mx-4 rounded-xl text-[15px] font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
