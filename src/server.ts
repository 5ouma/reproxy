import { type Context, Hono } from "@hono/hono";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";

import { checkRedirect, getContent } from "./libs/mod.ts";

export const app = new Hono();
app
  .get("/:ref?", async (ctx: Context) => {
    const ref: string = ctx.req.param("ref");
    const url: URL | null = checkRedirect(
      new UserAgent(ctx.req.header("User-Agent") ?? ""),
      ref,
    );

    return url
      ? ctx.redirect(url.toString(), STATUS_CODE.PermanentRedirect)
      : ctx.text(...await getContent(ref));
  })
  .get("*", (ctx: Context) => {
    return ctx.redirect("/", STATUS_CODE.SeeOther);
  });

Deno.serve(app.fetch);
