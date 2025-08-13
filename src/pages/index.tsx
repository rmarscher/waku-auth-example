import { Link } from "waku";

import { Counter } from "../components/counter";
import { AuthForms } from "../components/auth-forms";
import { getSession } from "@/auth";

export default async function HomePage() {
  const data = await getData();
  const session = await getSession();

  // If signed in, show main content
  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p>{data.body}</p>
      <Counter />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
      {!session && (
        <div className="mt-8">
          <AuthForms />
        </div>
      )}
    </div>
  );
}

const getData = async () => {
  const data = {
    title: "Waku",
    headline: "Waku",
    body: "Hello world!",
  };
  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
