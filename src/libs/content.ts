import { Octokit } from "@octokit/rest";
import type { StatusCode } from "@std/http";
export type { StatusCode };

import type { Repository } from "./types.ts";

/**
 * Get the content of the repository.
 *
 * @param ref The name of the branch, tag or commit hash
 * @returns The content of the repository and the status code
 *
 * @example Use the default branch
 * ```ts
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const [content, status] = await getContent(repository);
 * ```
 * @example Use a specific branch
 * ```ts
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const branch = "main";
 * const [content, status] = await getContent(repository, branch);
 * ```
 * @example Use a specific tag
 * ```ts
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const tag = "v1.0.0";
 * const [content, status] = await getContent(repository, tag);
 * ```
 * @example Use a specific commit
 * ```ts
 * const repository: Repository = {
 *   owner: "denoland",
 *   name: "deno",
 *   path: "README.md",
 * };
 * const commit = "a1b2c3d4e5f6";
 * const [content, status] = await getContent(repository, commit);
 * ```
 */

export async function getContent(
  repository: Repository,
  ref: string | undefined = undefined,
  token: string | undefined = undefined,
): Promise<[string, StatusCode]> {
  const octokit = new Octokit({ auth: token });

  try {
    const { status, data } = await octokit.rest.repos.getContent({
      mediaType: { format: "raw" },
      owner: repository.owner,
      repo: repository.name,
      path: repository.path,
      ref: ref,
    });

    return [data.toString(), status];
  } catch (error) {
    return [`⚠️ ${error.status}: ${error.message}`, error.status];
  }
}
