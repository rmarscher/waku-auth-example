import type { Middleware } from "waku/config";
import { auth } from "../auth";

const authMiddleware: Middleware = () => {
  return async (ctx, next) => {
    console.log("Auth middleware running", ctx.req.headers);
    const session = await auth.api.getSession({
      headers: new Headers(ctx.req.headers),
    });
    console.log("Session in middleware:", session);
    ctx.data.session = session;
    await next();
  };
};

export default authMiddleware;
