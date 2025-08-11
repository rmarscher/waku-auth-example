"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "waku";

export function SignOutLink() {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.reload();
        },
      },
    });
  };

  return (
    <button onClick={handleSignOut} className="text-sm text-gray-500 underline">
      Sign out
    </button>
  );
}
