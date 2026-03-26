import prisma from "@/lib/prisma";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({ take: 6 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar categories={categories} />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 group">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-black text-gray-300 uppercase tracking-widest text-2xl">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <Link 
                href={`/products?category=${product.category.slug}`}
                className="inline-block text-[13px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors"
              >
                {product.category.name}
              </Link>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="text-3xl font-black text-gray-900">
                ${Number(product.price).toFixed(2)}
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            <div className="space-y-6">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-gray-400">
                Description
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[13px] font-black uppercase tracking-widest text-gray-900">
                    {product.stock > 0 ? 'In Stock & Ready to Ship' : 'Out of Stock'}
                  </span>
               </div>
               
               <button 
                 disabled={product.stock === 0}
                 className="w-full bg-gray-900 text-white py-6 rounded-[2rem] text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all shadow-2xl shadow-gray-200 disabled:opacity-50 disabled:scale-100"
               >
                 {product.stock > 0 ? 'Add to Shopping Bag' : 'Join Waitlist'}
               </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Shipping</h4>
                <p className="font-bold text-gray-900">Free global delivery</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Returns</h4>
                <p className="font-bold text-gray-900">30-day easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
