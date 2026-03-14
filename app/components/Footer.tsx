import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900">
            MODERN<span className="text-blue-600">STORE</span>
          </Link>
          <p className="text-gray-500 leading-relaxed max-w-xs">
            Experience the future of online shopping with our curated selection of premium products. Quality and style, delivered to your doorstep.
          </p>
          <div className="flex gap-4">
             {/* Simple placeholders for social icons */}
             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors text-xs font-black text-gray-900">X</div>
             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors text-xs font-black text-gray-900">f</div>
             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors text-xs font-black text-gray-900">IG</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 lg:col-span-3">
          <div className="space-y-6">
            <h4 className="text-[13px] font-black uppercase tracking-widest text-gray-400">Company</h4>
            <ul className="space-y-4 font-semibold text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Store Locator</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[13px] font-black uppercase tracking-widest text-gray-400">Help</h4>
            <ul className="space-y-4 font-semibold text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-bold text-gray-400">
        <p>© 2026 MODERNSTORE. BUILT WITH PASSION.</p>
        <div className="flex gap-8 uppercase tracking-widest">
          <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
