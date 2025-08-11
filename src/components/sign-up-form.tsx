"use client";

import { useState, useTransition } from "react";
import { authClient } from "../lib/auth-client";

export function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email(
          { email, password, name },
          {
            onRequest: () => {},
            onSuccess: () => {
              if (onSuccess) onSuccess();
            },
            onError: (ctx) => {
              setError(ctx.error.message);
            },
          }
        );
        if (error) setError(error.message || String(error));
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded"
    >
      <h2 className="text-xl font-bold mb-2">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
        minLength={8}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
}
