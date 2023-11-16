import type { Context, Next } from "koa";
import { verifyJWTToken } from "##/utils/jwt.ts";
import { parseToken } from "##/utils/index.ts";
const WHITE_LIST = ["/", "/wx/login"];
export default async function (ctx: Context, next: Next) {
  const path = ctx.request.path;
  if (!WHITE_LIST.includes(path)) {
    const token = parseToken(ctx);
    try {
      const jwt = verifyJWTToken(token!);
      ctx.user = jwt?.payload || {};
    } catch (error) {
      ctx.auth({});
      return;
    }
  }
  return next().catch((error) => {
    if (error.status === 401) {
      ctx.auth({});
    } else {
      ctx.fail({
        msg: error?.message || error,
      });
      return error;
    }
  });
}
