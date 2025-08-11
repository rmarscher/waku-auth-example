import { Link } from "waku";
import { SignOutLink } from "./sign-out-link";

export const Header = ({ greeting }: { greeting: string }) => {
  return (
    <header className="flex flex-col items-start gap-2 p-6 lg:fixed lg:left-0 lg:top-0">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Waku starter</Link>
      </h2>
      {greeting && (
        <div>
          <p>{greeting}</p>
          <SignOutLink />
        </div>
      )}
    </header>
  );
};
