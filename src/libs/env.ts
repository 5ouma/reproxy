import type { Repository } from "@5ouma/reproxy/types";

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
