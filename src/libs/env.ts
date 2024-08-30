import type { Repository } from "./types.ts";

/**
 * Get the repository details from the environment variables.
 *
 * @returns {Repository} The repository type
 *
 * @example
 * ```ts
 * const repository = getRepository();
 * ```
 */
export function getRepository(): Repository {
  const repository: Repository = {
    owner: Deno.env.get("REPOSITORY_OWNER") ?? "",
    name: Deno.env.get("REPOSITORY_NAME") ?? "",
    path: Deno.env.get("REPOSITORY_PATH") ?? "",
  };

  for (const key in repository) {
    if (!repository[key as keyof Repository]) {
      console.error(`🚨 missing: $REPOSITORY_${key.toUpperCase()}`);
    }
  }

  return repository;
}

/**
 * The GitHub token from the environment variables.
 *
 * @example
 * ```ts
 * const token = githubToken;
 * ```
 */
export const githubToken: string | undefined = Deno.env.get("GITHUB_TOKEN");
