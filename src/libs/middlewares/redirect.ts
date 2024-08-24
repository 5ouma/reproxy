import type { UserAgent } from "@std/http/user-agent";
import { join } from "@std/path";

import { getRepository } from "../utils/env.ts";

export function redirect(
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

  return userAgent?.browser.name ? url : null;
}
