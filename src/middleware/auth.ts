import type { Middleware } from "waku/config";
import { getSession } from "../auth";
import { getSessionCookie } from "better-auth/cookies";

const authMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const sessionCookie = getSessionCookie(
      new Request(ctx.req.url, {
        body: ctx.req.body,
        headers: ctx.req.headers,
        method: ctx.req.method,
      })
    );
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!sessionCookie && ctx.req.url.pathname !== "/") {
      if (!ctx.req.url.pathname.endsWith(".txt")) {
        // Currently RSC requests end in .txt and don't handle redirect responses
        // The redirect needs to be encoded in the React flight stream somehow
        // There is some functionality in Waku to do this from a server component
        // but not from middleware.
        ctx.res.status = 302;
        ctx.res.headers = {
          Location: new URL("/", ctx.req.url).toString(),
        };
      }
    }

    // TODO possible to inspect ctx.req.url and not do this on every request
    // Or skip starting the promise here and just invoke from server components and functions
    getSession();
    await next();
    if (ctx.data.betterAuthSetCookie) {
      ctx.res.headers ||= {};
      let origSetCookie = ctx.res.headers["set-cookie"] || ([] as string[]);
      if (typeof origSetCookie === "string") {
        origSetCookie = [origSetCookie];
      }
      ctx.res.headers["set-cookie"] = [
        ...origSetCookie,
        ctx.data.betterAuthSetCookie as string,
      ];
    }
  };
};

export default authMiddleware;
