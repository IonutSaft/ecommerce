import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">Create Account</h2>
        <p className="mt-2 text-[15px] font-semibold text-gray-500">
          Join us and start shopping today
        </p>
      </div>

      <form className="space-y-6" action="#" method="POST">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-[13px] font-black uppercase tracking-widest text-gray-400">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-[15px] text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-gray-300"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[13px] font-black uppercase tracking-widest text-gray-400">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-[15px] text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-gray-300"
            placeholder="name@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-[13px] font-black uppercase tracking-widest text-gray-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-[15px] text-gray-900 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-gray-300"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all shadow-xl shadow-gray-200"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-[15px] font-semibold text-gray-500">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
