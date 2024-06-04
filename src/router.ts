import { Router, type RouterContext } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";

export const router = new Router();
router.get("/", <R extends string>(ctx: RouterContext<R>) => {
  ctx.response.type = "text/plain";
  ctx.response.status = STATUS_CODE.OK;
  ctx.response.body = "Hello, Deno!";
});
