import { Router, type RouterContext } from "@oak/oak";
import { getContent, redirect } from "@5ouma/reproxy/libs";

export const router = new Router();
router
  .get("/", async <R extends string>(ctx: RouterContext<R>) => {
    ctx.response.type = "text/plain";
    if (!redirect(ctx, ctx.request.userAgent)) await getContent(ctx);
  })
  .get("/:ref", async <R extends string>(ctx: RouterContext<R>) => {
    const ref: string | undefined = ctx.params.ref;
    ctx.response.type = "text/plain";
    if (!redirect(ctx, ctx.request.userAgent, ref)) await getContent(ctx, ref);
  });
