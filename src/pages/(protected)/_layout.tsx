import { Suspense, type ReactNode } from "react";
import { Link } from "waku";
import { getContextData } from "waku/middleware/context";
import { Session } from "@/lib/auth-client";
import { AuthForms } from "@/components/auth-forms";

type RootLayoutProps = { children: ReactNode };

export default async function ProtectedLayout({ children }: RootLayoutProps) {
  const session = getContextData().session as Session | undefined;
  if (!session) {
    return (
      <div>
        <div className="text-4xl font-bold tracking-tight">
          Sign In Required
        </div>
        <div className="mb-8">
          <Link to="/" className="mt-4 inline-block underline">
            Return home
          </Link>
        </div>
        <AuthForms />
      </div>
    );
  }
  console.log("Session in layout:", session);

  return <Suspense>{children}</Suspense>;
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
