import { UserAgent } from "@std/http/user-agent";

import type { Repository } from "./types.ts";

/**
 * Sample repository for test.
 *
 * @example
 * ```ts
 * const repository = testRepo;
 * ```
 */
export const testRepo: Repository = {
  owner: "denoland",
  name: "deno",
  path: "README.md",
};

/**
 * Sample unknown repository for test.
 *
 * @example
 * ```ts
 * const repository = unknownRepo;
 * ```
 */
export const unknownRepo: Repository = {
  owner: "unknown-owner",
  name: "unknown-repo",
  path: "unknown-path",
};

/**
 * Sample version reference for test.
 *
 * @example
 * ```ts
 * const ref = testRef;
 * ```
 */
export const testRef = "v1.0.0";

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
 * const repository = new Repository("5ouma", "reproxy", "src/server.ts");
 * exportRepo(repository);
 * ```
 */
export function exportRepo(repository: Repository) {
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);
}

/**
 * Clear the repository details from the environment variables.
 *
 * @example
 * ```ts
 * clearRepo();
 * ```
 */
export function clearRepo() {
  Deno.env.delete("REPOSITORY_OWNER");
  Deno.env.delete("REPOSITORY_NAME");
  Deno.env.delete("REPOSITORY_PATH");
}
