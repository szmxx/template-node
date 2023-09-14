import type { Schema } from "joi";
import type { Context, Next } from "koa";

export function validate(schema: Schema) {
  return async (ctx: Context, next: Next) => {
    const { body, query } = ctx.request;
    let params = {};
    switch (ctx.method) {
      case "GET":
        params = query;
        break;
      default:
        params = body;
        break;
    }
    const { error } = schema.validate(params, {
      allowUnknown: true,
    });
    if (error) {
      ctx.error({
        msg: error?.details?.[0]?.message,
      });
    } else {
      await next();
    }
  };
}
