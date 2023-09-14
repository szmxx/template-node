/*
 * @Author: cola
 * @Date: 2023-09-14 17:21:54
 * @LastEditors: cola
 * @Description:
 */
import type Koa from "koa";
import { fileURLToPath } from "url";
import { dirname } from "pathe";
import Router from "@koa/router";
import glob from "fast-glob";
import { getRouteName } from "../utils";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = glob.sync(`${__dirname}/*.ts`);
console.log(routes, __dirname);
const baseURL = "/";
const router = new Router();
router.get(baseURL, (ctx) => {
  ctx.body = "/";
});

routes.map(async (route) => {
  if (!route.endsWith("index.ts")) {
    const module = await import(route);
    const routeName = getRouteName(route, baseURL);
    router.use(routeName, module.routes(), module.allowedMethods());
  }
});

export default (app: Koa) => {
  app.use(router.routes()).use(router.allowedMethods());
};
