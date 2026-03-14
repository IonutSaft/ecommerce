import prisma from "@/lib/prisma";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default async function Home() {
  const categories = await prisma.category.findMany({
    take: 6,
  });

  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
    },
    take: 8,
    include: {
      category: true,
    },
  });

  // If no featured products found, just take some products to display
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : await prisma.product.findMany({
        take: 8,
        include: {
          category: true,
        },
      });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar categories={categories} />
      <main className="flex-grow">
        <Hero products={displayProducts} />
      </main>
      <Footer />
    </div>
  );
}
