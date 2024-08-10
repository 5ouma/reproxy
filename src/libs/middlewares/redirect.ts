import type { RouterContext } from "@oak/oak";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";
import { join } from "@std/path";

import { getRepository } from "../utils/env.ts";

export function redirect<R extends string>(
  ctx: RouterContext<R>,
  userAgent: UserAgent,
  ref: string = "master",
): boolean {
  const repository = getRepository();
  const url = new URL(
    join(
      repository.owner,
      repository.name,
      "blob",
      ref,
      repository.path,
    ),
    "https://github.com",
  );

  if (!userAgent?.browser.name) return false;

  ctx.response.status = STATUS_CODE.PermanentRedirect;
  ctx.response.redirect(url);
  return true;
}
