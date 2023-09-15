import { fileURLToPath } from "url";
import { dirname } from "pathe";
import Router from "@koa/router";
import glob from "fast-glob";
import { getRouteName } from "../utils";
const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = glob.sync(`${__dirname}/*.ts`);
const baseURL = "/";
const router = new Router();
router.get(baseURL, (ctx) => {
    ctx.body = "/";
});
routes.map(async (route) => {
    var _a;
    if (!route.endsWith("index.ts")) {
        let module = await import(route);
        module = (_a = module.default) !== null && _a !== void 0 ? _a : module;
        const routeName = getRouteName(route, baseURL);
        router.use(routeName, module.routes(), module.allowedMethods());
    }
});
export default (app) => {
    app.use(router.routes()).use(router.allowedMethods());
};
