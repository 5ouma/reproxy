import { Router, type RouterContext } from "@oak/oak";
import { getContent } from "./libs/mod.ts";

export const router = new Router();
router.get("/", async <R extends string>(ctx: RouterContext<R>) => {
  ctx.response.type = "text/plain";
  await getContent(ctx, "denoland", "deno", "README.md");
});
