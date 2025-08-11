import { Link } from "waku";

import { Counter } from "../components/counter";
import { AuthForms } from "../components/auth-forms";
import { getContextData } from "waku/middleware/context";

export default async function HomePage() {
  const data = await getData();
  const session = getContextData().session;

  // If not signed in, show auth forms
  if (!session) {
    return (
      <div>
        <title>{data.title}</title>
        <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
        <p>{data.body}</p>
        <AuthForms />
      </div>
    );
  }

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
