"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
          Welcome Back
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-gray-500">
          Please enter your details to sign in
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-2xl border border-red-100 font-bold">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-[13px] font-black uppercase tracking-widest text-gray-400"
          >
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-[13px] font-black uppercase tracking-widest text-gray-400"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-[13px] font-bold text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
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
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-[11px] font-black uppercase tracking-tighter">
          <span className="bg-white px-4 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex justify-center items-center py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
          <span className="text-[13px] font-black uppercase tracking-widest text-gray-900">
            Google
          </span>
        </button>
        <button className="flex justify-center items-center py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
          <span className="text-[13px] font-black uppercase tracking-widest text-gray-900">
            GitHub
          </span>
        </button>
      </div>

      <p className="text-center text-[15px] font-semibold text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
