import type { UserAgent } from "@std/http/user-agent";
export type { UserAgent };

import type { Repository } from "./types.ts";
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
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const url: URL | null = checkRedirect(userAgent, repository);
 * ```
 * @example Use a specific branch
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const branch = "main";
 * const url: URL | null = checkRedirect(userAgent, repository, branch);
 * ```
 * @example Use a specific tag
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const tag = "v1.0.0";
 * const url: URL | null = checkRedirect(userAgent, repository, tag);
 * ```
 * @example Use a specific commit
 * ```ts
 * const userAgent = new UserAgent("Chrome/1.2.3");
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const commit = "a1b2c3d4e5f6";
 * const url: URL | null = checkRedirect(userAgent, repository, commit);
 * ```
 */
export function checkRedirect(
  userAgent: UserAgent,
  repository: Repository,
  ref: string = "master",
): URL | null {
  const url = getGitHubUrl(repository, ref);

  return userAgent?.browser.name ? url : null;
}
