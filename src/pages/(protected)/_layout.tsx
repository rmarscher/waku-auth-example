import { Suspense, type ReactNode } from "react";
import { Link } from "waku";
import { AuthForms } from "@/components/auth-forms";
import { getSession } from "@/auth";

type RootLayoutProps = { children: ReactNode };

export default async function ProtectedLayout({ children }: RootLayoutProps) {
  const session = await getSession();
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
