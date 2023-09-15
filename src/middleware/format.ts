/*
 * @Author: cola
 * @Date: 2023-09-14 17:59:39
 * @LastEditors: cola
 * @Description:
 */
import type { Context, Next } from "koa";

export default async function (ctx: Context, next: Next) {
  ctx.success = ({ code = 200, data = null, msg = "success" }) => {
    ctx.status = 200;
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  ctx.fail = ({ code = 500, data = null, msg = "fail" }) => {
    ctx.status = 500;
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  ctx.error = ({ code = 400, data = null, msg = "fail" }) => {
    ctx.status = 400;
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  ctx.auth = ({
    code = 401,
    data = null,
    msg = "Protected resource, use Authorization header to get access",
  }) => {
    ctx.status = 401;
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  await next();
}
