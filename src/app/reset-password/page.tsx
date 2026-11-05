
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {ArrowLeft,LockKeyhole,Save,Eye,EyeOff,} from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [checking, setChecking] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");
    const error = params.get("error");

    if (resetToken) {
      setToken(resetToken);
    } else if (error) {
      toast.error("Reset link invalid অথবা মেয়াদ শেষ হয়েছে");
    }

    setChecking(false);
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      toast.error("Valid reset token পাওয়া যায়নি");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (error) {
        toast.error(error.message || "Password reset করা যায়নি");
        return;
      }

      toast.success("Password সফলভাবে পরিবর্তন হয়েছে!");
      router.replace("/signin");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f1f6f1]">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </main>
    );
  }

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
          <LockKeyhole size={27} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          নতুন পাসওয়ার্ড সেট করো
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          তোমার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড তৈরি করো।
        </p>

        {!token ? (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Reset link পাওয়া যায়নি অথবা মেয়াদ শেষ হয়েছে।
            </p>

            <Link
              href="/forgot-password"
              className="mt-3 inline-block text-sm font-semibold text-green-700 underline"
            >
              নতুন Reset Link চাও
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নতুন পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-green-700"
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-green-700"
                  aria-label={
                    showConfirmPassword
                      ? "পাসওয়ার্ড লুকান"
                      : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {loading
                ? "পরিবর্তন হচ্ছে..."
                : "নতুন পাসওয়ার্ড সেট করো"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
