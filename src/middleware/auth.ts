/*
 * @Author: cola
 * @Date: 2023-09-14 19:52:35
 * @LastEditors: cola
 * @Description:
 */
import type { Context, Next } from "koa";
import { verifyJWTToken } from "../utils/jwt";
import { parseToken } from "../utils";
const WHITE_LIST = ["/"];
export default async function (ctx: Context, next: Next) {
  const path = ctx.request.path;
  if (!WHITE_LIST.includes(path)) {
    const token = parseToken(ctx);
    try {
      verifyJWTToken(token!);
    } catch (error) {
      console.error(error);
      ctx.auth({});
      return;
    }
  }
  return next().catch((error) => {
    console.error(error);
    if ((error.status = 401)) {
      ctx.auth();
    } else {
      throw error;
    }
  });
}
