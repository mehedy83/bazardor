"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRound, LockKeyhole, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (name.trim() === user?.name) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f1f6f1]">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#f1f6f1] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-700"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার ব্যক্তিগত তথ্য পরিচালনা করুন
          </p>
        </div>

        {/* Profile Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-6 sm:flex-row">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-20 w-20 rounded-full border-4 border-green-50 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                {user.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
              <p className="mt-2 text-xs font-medium text-green-700">
                বাজার দর সদস্য
              </p>
            </div>
          </div>

          {/* Update Name */}
          <div className="mt-6">
            <div className="mb-5 flex items-center gap-2">
              <UserRound size={19} className="text-green-700" />
              <h3 className="font-bold text-gray-800">
                ব্যক্তিগত তথ্য
              </h3>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  আপনার নাম
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  ইমেইল
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
                />

                <p className="mt-1 text-xs text-gray-400">
                  ইমেইল পরিবর্তন করা যাবে না।
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Save size={17} />
                {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <LockKeyhole size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    পাসওয়ার্ড
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    আপনার অ্যাকাউন্টের নিরাপত্তা বজায় রাখুন
                  </p>
                </div>
              </div>

              <Link
                href="/profile/password"
                className="rounded-lg border border-green-700 px-4 py-2.5 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                পাসওয়ার্ড পরিবর্তন
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}