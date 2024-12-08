import { UserAgent } from "@std/http/user-agent";

import type { Repository } from "./types.ts";

/**
 * Sample repository for test.
 *
 * @example
 * ```ts
 * const repository = testRepo.normal;
 * ```
 *
 * @example
 * ```ts
 * const repository = testRepo.unknown;
 * ```
 */
export const testRepo: { normal: Repository; unknown: Repository } = {
  normal: {
    owner: "denoland",
    name: "deno",
    path: "README.md",
  },
  unknown: {
    owner: "unknown-owner",
    name: "unknown-repo",
    path: "unknown-path",
  },
};

/**
 * Sample version reference for test.
 *
 * @example
 * ```ts
 * const ref = testRef.normal;
 * ```
 *
 * @example
 * ```ts
 * const ref = testRef.slash;
 * ```
 */
export const testRef: { normal: string; slash: string } = {
  normal: "v1.0.0",
  slash: "renovate/configure",
};

/**
 * Sample user agent for test.
 *
 * @example
 * ```ts
 * const userAgent = testUserAgent;
 * ```
 */
export const testUserAgent = new UserAgent("Chrome/1.2.3");

/**
 * Export the repository details to the environment variables.
 *
 * @param repository The repository type
 *
 * @example
 * ```ts
 * import type { Repository } from "./types.ts";
 *
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * exportRepo(repository);
 * ```
 */
export function exportRepo(repository: Repository) {
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);
}
