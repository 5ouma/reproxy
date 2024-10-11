import { join } from "@std/path";

import type { Repository } from "./types.ts";

/**
 * Get the GitHub URL of the repository.
 *
 * @param repository The repository type
 * @param ref="master" The reference to use
 * @returns The GitHub repository URL
 *
 * @example
 * ```ts
 * import type { Repository } from "./types.ts";
 *
 * const repository: Repository = {
 *   owner: "5ouma",
 *   name: "reproxy",
 *   path: "src/server.ts",
 * };
 * const url: URL = getGitHubUrl(repository);
 * ```
 */
export function getGitHubUrl(
  repository: Repository,
  ref: string = "master",
): URL {
  return new URL(
    join(
      repository.owner,
      repository.name,
      "blob",
      ref,
      repository.path,
    ),
    "https://github.com",
  );
}
