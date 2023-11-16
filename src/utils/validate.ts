import type { Schema } from "joi";
import type { Context, Next } from "koa";
import { CodeMap } from "##/config/index.ts";

export function validate(schema: Schema) {
  return async (ctx: Context, next: Next) => {
    const { body, query } = ctx.request;
    const { params } = ctx;
    let obj = {};

    switch (ctx.method) {
      case "GET":
        obj = query;
        break;
      default:
        obj = body;
        break;
    }

    const error = validateData(schema, { ...params, ...obj });
    if (error) {
      ctx.error({
        code: CodeMap.params,
        msg: error?.details?.[0]?.message,
      });
    } else {
      await next();
    }
  };
}

export function validateData(schema: Schema, data: Record<string, unknown>) {
  const { error } = schema.validate(data, {
    allowUnknown: true,
  });
  return error;
}
