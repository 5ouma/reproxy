import { type Context, Hono } from "@hono/hono";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";

import { getContent, redirect } from "./libs/mod.ts";

export const app = new Hono();

app.get("/", async (ctx: Context) => {
  const url: URL | null = redirect(
    new UserAgent(ctx.req.header("User-Agent") ?? ""),
  );
  if (url) return ctx.redirect(url.toString(), STATUS_CODE.PermanentRedirect);

  const [data, status] = await getContent();
  return ctx.text(data, status);
});

app.get("/:ref", async (ctx: Context) => {
  const ref: string = ctx.req.param("ref");

  const url: URL | null = redirect(
    new UserAgent(ctx.req.header("User-Agent") ?? ""),
    ref,
  );
  if (url) return ctx.redirect(url.toString(), STATUS_CODE.PermanentRedirect);

  const [data, status] = await getContent(ref);
  return ctx.text(data, status);
});

app.get("*", (ctx: Context) => {
  return ctx.redirect("/", STATUS_CODE.SeeOther);
});

Deno.serve(app.fetch);
