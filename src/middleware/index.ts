import type Koa from "koa";
import auth from "./auth.ts";
import format from "./format.ts";

const middlewares = [format, auth];

export default async (app: Koa) => {
  for (const middleware of middlewares) {
    app.use(middleware);
  }
};
