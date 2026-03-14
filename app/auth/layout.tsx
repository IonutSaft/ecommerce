import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center text-3xl font-black tracking-tighter text-gray-900 mb-10">
          MODERN<span className="text-blue-600">STORE</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-10 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100">
          {children}
        </div>
      </div>
      
      <div className="mt-8 text-center text-[13px] font-bold text-gray-400 uppercase tracking-widest">
        <p>© 2026 MODERNSTORE. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
}
