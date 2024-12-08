import { type Context, Hono } from "@hono/hono";
export type { Hono };
import { env } from "@hono/hono/adapter";
import { logger } from "@hono/hono/logger";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";

import { checkRedirect, getContent, type Repository } from "./libs/mod.ts";

/**
 * The Hono application for this project.
 *
 * @example Access without a user agent
 * ```ts
 * const res: Response = await app.request("/");
 * ```
 * @example Access with a user agent
 * ```ts
 * import { UserAgent } from "@std/http/user-agent";
 *
 * const res: Response = await app.request("/", {
 *   headers: { "User-Agent": new UserAgent("Chrome/1.2.3").toString() },
 * });
 * ```
 */
const app: Hono = new Hono();
export default app;
app.use(logger());
app
  .get("/:ref{.+}?", async (ctx: Context) => {
    const { REPOSITORY_OWNER, REPOSITORY_NAME, REPOSITORY_PATH, GITHUB_TOKEN } =
      env<
        {
          REPOSITORY_OWNER: string;
          REPOSITORY_NAME: string;
          REPOSITORY_PATH: string;
          GITHUB_TOKEN: string;
        }
      >(ctx);
    const repository: Repository = {
      owner: REPOSITORY_OWNER,
      name: REPOSITORY_NAME,
      path: REPOSITORY_PATH,
    };
    const ref: string = ctx.req.param("ref");

    const url: URL | null = checkRedirect(
      new UserAgent(ctx.req.header("User-Agent") ?? ""),
      repository,
      ref,
    );

    return url
      ? ctx.redirect(url.toString(), STATUS_CODE.PermanentRedirect)
      : ctx.text(...await getContent(repository, ref, GITHUB_TOKEN));
  });
