import type { RouterContext } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";
import { join } from "@std/path";
import { getRepository } from "./env.ts";

export function redirect<R extends string>(
  ctx: RouterContext<R>,
  userAgent: UserAgent,
  ref: string = "HEAD",
): void {
  const repository = getRepository();
  const url: string = "https://" +
    join(
      "github.com",
      repository.owner,
      repository.name,
      "blob",
      ref,
      repository.path,
    );

  if (userAgent?.browser.name) {
    ctx.response.status = STATUS_CODE.PermanentRedirect;
    ctx.response.redirect(url);
  }
}
