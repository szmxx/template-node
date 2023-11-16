import type { Context, Next } from "koa";

export default async function (ctx: Context, next: Next) {
  ctx.success = ({ code = 200, data = null, msg = "ok" }) => {
    ctx.status = 200;
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  ctx.fail = ({ code = 500, data = null, msg = "error" }) => {
    ctx.status = 500;
    console.error(msg);
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  ctx.error = ({ code = 400, data = null, msg = "error" }) => {
    ctx.status = 400;
    console.error(msg);
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
    console.error(msg);
    ctx.body = {
      code: code,
      message: msg,
      data: data,
    };
  };
  await next();
}
