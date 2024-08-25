import type { UserAgent } from "@std/http/user-agent";

import { getRepository } from "./env.ts";
import { getGitHubUrl } from "./utils.ts";

export function redirect(
  userAgent: UserAgent,
  ref: string = "master",
): URL | null {
  const url = getGitHubUrl(getRepository(), ref);

  return userAgent?.browser.name ? url : null;
}
