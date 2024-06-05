import { Router, type RouterContext } from "@oak/oak";
import { getContent, redirect } from "./libs/mod.ts";

export const router = new Router();
router
  .get("/", async <R extends string>(ctx: RouterContext<R>) => {
    ctx.response.type = "text/plain";
    await getContent(ctx);
    redirect(ctx, ctx.request.userAgent);
  })
  .get("/:ref", async <R extends string>(ctx: RouterContext<R>) => {
    const ref: string | undefined = ctx.params.ref;
    ctx.response.type = "text/plain";
    await getContent(ctx, ref);
    redirect(ctx, ctx.request.userAgent, ref);
  });
