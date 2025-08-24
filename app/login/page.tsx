"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-4 lg:p-8 flex flex-col gap-6 border border-gray-100"
        style={{ boxSizing: "border-box" }}
      >
        <h2 className="font-bold text-2xl lg:text-3xl text-center text-gray-900 mb-2">
          {step === "signIn" ? "Sign in" : "Sign up"}
        </h2>

        <form
          className="flex flex-col gap-4 w-full"
          style={{ boxSizing: "border-box" }}
          onSubmit={async (event) => {
            event.preventDefault();
            setIsLoggingIn(true);
            const formData = new FormData(event.currentTarget);
            try {
              await signIn("password", formData);
              router.push("/chat-example/1234");
            } catch (error: any) {
              setError(true);
            } finally {
              setIsLoggingIn(false);
            }
          }}
        >
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              inputMode="email"
              autoComplete="email"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base w-full"
              required
            />
          </div>
          <input name="flow" type="hidden" value={step} />

          {error && (
            <div className="text-red-500 text-sm">
              Invalid email or password
            </div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition text-base"
          >
            {isLoggingIn
              ? "Logging in..."
              : step === "signIn"
                ? "Sign in"
                : "Sign up"}
          </button>
          <button
            type="button"
            className="w-full py-2 mt-1 hover:underline text-xs lg:text-sm cursor-pointer text-gray-700 font-medium rounded-md transition"
            onClick={() => {
              setStep(step === "signIn" ? "signUp" : "signIn");
            }}
          >
            {step === "signIn"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
