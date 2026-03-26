import prisma from "@/lib/prisma";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { q, category } = await searchParams;

  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q ? { name: { contains: q, mode: "insensitive" } } : {},
        category ? { category: { slug: category } } : {},
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const activeCategory = category
    ? categories.find((c) => c.slug === category)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar categories={categories} />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-gray-900">
              {q
                ? `Results for "${q}"`
                : activeCategory
                  ? activeCategory.name
                  : "All Products"}
            </h1>
            <div className="flex items-center gap-4 text-[13px] font-black uppercase tracking-widest text-gray-400">
              <span>{products.length} Products Found</span>
              {(q || category) && (
                <Link
                  href="/products"
                  className="text-blue-600 hover:underline"
                >
                  Clear Filters
                </Link>
              )}
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="bg-gray-50 rounded-[3rem] p-20 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">
              No products found
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-10 py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
