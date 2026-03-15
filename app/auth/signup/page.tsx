"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/auth/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
          Create Account
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-gray-500">
          Join us and start shopping today
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
            htmlFor="name"
            className="block text-[13px] font-black uppercase tracking-widest text-gray-400"
          >
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
          <label
            htmlFor="password"
            className="block text-[13px] font-black uppercase tracking-widest text-gray-400"
          >
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
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[15px] font-black uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-[15px] font-semibold text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
