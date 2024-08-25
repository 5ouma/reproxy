import { join } from "@std/path";

import type { Repository } from "./types.ts";

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

export const githubToken: string | undefined = Deno.env.get("GITHUB_TOKEN");

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
