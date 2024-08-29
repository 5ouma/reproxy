import { type Context, Hono } from "@hono/hono";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";

import { checkRedirect, getContent } from "./libs/mod.ts";

/**
 * The Hono application for this project.
 *
 * @example Access without a user agent
 * ```ts
 * const res: Response = await app.request("/");
 * ```
 * @example Access with a user agent
 * ```ts
 * const res: Response = await app.request("/", {
 *   headers: { "User-Agent": new UserAgent("Chrome/1.2.3").toString() },
 * });
 * ```
 */
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
