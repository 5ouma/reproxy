import { join } from "@std/path";

import type { Repository } from "./types.ts";

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
