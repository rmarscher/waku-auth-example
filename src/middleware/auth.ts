import type { Middleware } from "waku/config";
import { auth } from "../auth";
import { getSessionCookie, parseSetCookieHeader } from "better-auth/cookies";
import { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { getContext, getContextData } from "waku/middleware/context";

const authMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const sessionCookie = getSessionCookie(
      new Request(ctx.req.url, {
        body: ctx.req.body,
        headers: ctx.req.headers,
        method: ctx.req.method,
      })
    );
    // TODO possible to inspect ctx.req.url and not do this on every request
    // Or skip starting the promise here and just invoke from server components and functions
    ctx.data.sessionPromise = auth.api.getSession({
      headers: new Headers(ctx.req.headers),
    });
    await next();
    if (ctx.data.betterAuthSetCookie) {
      console.log("Found betterAuthSetCookie", ctx.data.betterAuthSetCookie);
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
