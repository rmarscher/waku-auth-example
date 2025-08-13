"use server"; // Waku currently only supports file-level "use server"

import { auth } from "../auth";
import { getContext } from "waku/middleware/context";

export const someAuthenticatedAction = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: new Headers(getContext().req.headers),
  });
};
