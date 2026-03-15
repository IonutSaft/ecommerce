import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const categories = await prisma.category.findMany({
    take: 6,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar categories={categories} />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase mb-8">
            Your Profile
          </h1>
          <div className="bg-gray-50 rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-black uppercase tracking-widest text-gray-400 mb-2">
                Name
              </label>
              <div className="text-xl font-bold text-gray-900">
                {session.user.name}
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-black uppercase tracking-widest text-gray-400 mb-2">
                Email
              </label>
              <div className="text-xl font-bold text-gray-900">
                {session.user.email}
              </div>
            </div>
            <div className="pt-6">
               <Link 
                href="/"
                className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all shadow-xl shadow-gray-200"
               >
                Back to Shopping
               </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
