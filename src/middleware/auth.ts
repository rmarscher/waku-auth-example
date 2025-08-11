import type { Middleware } from "waku/config";
import { auth } from "../auth";
import { getHonoContext } from "waku/unstable_hono";

const authMiddleware: Middleware = () => {
  return async (ctx, next) => {
    // Need to use Hono context to get actual request object
    const c = getHonoContext();
    console.log("Auth middleware running", ctx.req.headers);
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    console.log("Session in middleware:", session);
    ctx.data.session = session;
    await next();
  };
};

export default authMiddleware;
