import prisma from "@/lib/prisma";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartList from "../components/CartList";

export default async function CartPage() {
  const categories = await prisma.category.findMany({ take: 6 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar categories={categories} />

      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-12 uppercase">
          Your <span className="text-blue-600">Shopping Bag</span>
        </h1>

        <CartList />
      </main>

      <Footer />
    </div>
  );
}
