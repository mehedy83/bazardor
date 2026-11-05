
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      });

      if (error) {
        toast.error(error.message || "Request পাঠানো যায়নি");
        return;
      }

      setSubmitted(true);
      toast.success("Reset link পাঠানোর request গ্রহণ করা হয়েছে!");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f1f6f1] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/signin"
          className="mb-7 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Sign In-এ ফিরে যাও
        </Link>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-green-700">
          <Mail size={27} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          পাসওয়ার্ড ভুলে গেছো?
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          তোমার অ্যাকাউন্টের email address দাও। আমরা password reset করার
          নির্দেশনা পাঠানোর ব্যবস্থা করব।
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-800">
              Request গ্রহণ করা হয়েছে!
            </p>
            <p className="mt-2 text-sm leading-6 text-green-700">
              এই email address-এর জন্য অ্যাকাউন্ট থাকলে reset link পাঠানো হবে।
              Inbox এবং Spam folder চেক করো।
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-sm font-semibold text-green-800 underline"
            >
              আবার চেষ্টা করো
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="তোমার email লিখুন"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={17} />
              {loading ? "পাঠানো হচ্ছে..." : "Reset Password Link পাঠাও"}
            </button>
          </form>
        )}

        <p className="mt-7 text-center text-xs text-gray-400">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </div>
    </main>
  );
}
