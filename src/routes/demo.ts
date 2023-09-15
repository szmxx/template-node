/*
 * @Author: cola
 * @Date: 2022-10-13 18:11:07
 * @LastEditors: cola
 * @Description:
 */
import Router from "@koa/router";
const router = new Router({});
import { validate } from "../utils/validate";
import { DemoSchema } from "../schema/demo";
router.get("/", validate(DemoSchema), (ctx, next) => {
  ctx.success({
    msg: 12,
  });
});

export default router;
