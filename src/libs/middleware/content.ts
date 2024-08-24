import { Octokit } from "@octokit/rest";
import type { StatusCode } from "@std/http";

import { getRepository, githubToken } from "../utils/env.ts";

export async function getContent(
  ref: string | undefined = undefined,
): Promise<[string, StatusCode]> {
  const octokit = new Octokit({ auth: githubToken });
  const repository = getRepository();

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
