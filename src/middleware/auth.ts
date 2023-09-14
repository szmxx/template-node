import type { Context, Next } from "koa";
import { verifyJWTToken } from "../utils/jwt";
import { parseToken } from "../utils";
import logger from "../utils/logger";
const WHITE_LIST = ["/"];
export default async function (ctx: Context, next: Next) {
  const path = ctx.request.path;
  if (!WHITE_LIST.includes(path)) {
    const token = parseToken(ctx);
    try {
      verifyJWTToken(token!);
    } catch {
      ctx.auth({});
      return;
    }
  }
  return next().catch((error) => {
    logger.error(error);
    if ((error.status = 401)) {
      ctx.auth();
    } else {
      throw error;
    }
  });
}
