"use client";

import { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";

export function AuthForms() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");

  return (
    <div>
      {mode === "signup" ? (
        <>
          <SignUpForm />
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="underline text-blue-600"
              onClick={() => setMode("signin")}
            >
              Sign in.
            </button>
          </div>
        </>
      ) : (
        <>
          <SignInForm />
          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="underline text-blue-600"
              onClick={() => setMode("signup")}
            >
              Sign up.
            </button>
          </div>
        </>
      )}
    </div>
  );
}
