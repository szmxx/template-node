/*
 * @Author: cola
 * @Date: 2023-09-14 18:01:48
 * @LastEditors: cola
 * @Description:
 */
import type Koa from "koa";
import glob from "fast-glob";
import { fileURLToPath } from "url";
import { dirname } from "pathe";
import auth from "./auth";
import format from "./format";

const middlewares = [format, auth];

export default async (app: Koa) => {
  for (const middleware of middlewares) {
    app.use(middleware);
  }
};
