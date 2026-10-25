"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Check if user is already logged in
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace(redirectTo);
      }
    });
  }, [router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(
          error.message === "Invalid login credentials"
            ? "Invalid email or password. Please check your credentials and try again."
            : error.message
        );
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A0A0F]/80 p-8 shadow-2xl backdrop-blur-xl">
      {errorMessage && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-red/30 bg-red/10 p-4 text-xs sm:text-sm text-red"
          role="alert"
        >
          <svg
            className="h-5 w-5 shrink-0 text-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 border border-white/15 outline-none transition-all duration-200 focus:border-yellow focus:ring-1 focus:ring-yellow"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-white/80"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/30 border border-white/15 outline-none transition-all duration-200 focus:border-yellow focus:ring-1 focus:ring-yellow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 rounded-full bg-cyan py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#009bd6] hover:shadow-cyan/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Signing In...</span>
            </span>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-white/60">
        Don&apos;t have an account yet?{" "}
        <Link
          href={redirectTo !== "/" ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : "/signup"}
          className="font-semibold text-yellow hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-navy text-white flex flex-col justify-center items-center px-6 py-24 sm:py-32">
      {/* Background ambient glow matching Itihasika's palette */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-yellow/10 via-red/5 to-transparent blur-3xl opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and brand mark */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Itihasika"
              width={90}
              height={68}
              className="h-14 w-auto mx-auto brightness-0 invert"
              priority
            />
          </Link>
          <span className="mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            Account Access
          </span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-normal text-white">
            Welcome <span className="text-red italic">Back</span>
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Sign in to access your library, films, and chronicles.
          </p>
        </div>

        {/* Card wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0F]/80 p-8 shadow-2xl backdrop-blur-xl animate-pulse min-h-[300px] flex items-center justify-center text-white/40 text-sm">
              Loading login...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
