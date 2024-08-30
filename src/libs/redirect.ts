import type { UserAgent } from "@std/http/user-agent";
export type { UserAgent };

import { getRepository } from "./env.ts";
import { getGitHubUrl } from "./utils.ts";

/**
 * Check if accessed from a browser and return the GitHub URL.
 *
 * @param userAgent The user agent accessed from
 * @param ref="master" The branch, tag, or commit hash
 * @returns The GitHub repository URL or null
 *
 * @example Use the default branch
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const url: URL | null = checkRedirect(userAgent);
 * ```
 * @example Use a specific branch
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const branch = "main";
 * const url: URL | null = checkRedirect(userAgent, branch);
 * ```
 * @example Use a specific tag
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const tag = "v1.0.0";
 * const url: URL | null = checkRedirect(userAgent, tag);
 * ```
 * @example Use a specific commit
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const commit = "a1b2c3d4e5f6";
 * const url: URL | null = checkRedirect(userAgent, commit);
 * ```
 */
export function checkRedirect(
  userAgent: UserAgent,
  ref: string = "master",
): URL | null {
  const url = getGitHubUrl(getRepository(), ref);

  return userAgent?.browser.name ? url : null;
}
