import { Octokit } from "@octokit/rest";
import { join } from "@std/path";

import type { Repository } from "./types.ts";

/**
 * Get the default branch name of the repository.
 *
 * @param repository The repository information
 * @param token Optional GitHub personal access token for authentication
 * @returns Promise that resolves to the default branch name
 *
 * @example
 * ```ts
 * import type { Repository } from "./types.ts";
 *
 * const repository: Omit<Repository, "path"> = {
 *   owner: "denoland",
 *   name: "deno",
 * };
 * const defaultBranch = await getDefaultBranch(repository);
 * ```
 */
export async function getDefaultBranch(
  repository: Omit<Repository, "path">,
  token?: string,
): Promise<string> {
  const octokit = new Octokit({ auth: token });

  try {
    const { data } = await octokit.rest.repos.get({
      owner: repository.owner,
      repo: repository.name,
    });

    return data.default_branch;
  } catch (_) {
    return "master";
  }
}

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
