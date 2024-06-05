import type { RouterContext } from "@oak/oak";
import { Octokit } from "@octokit/rest";
import { getRepository, githubToken } from "./env.ts";

export async function getContent<R extends string>(
  ctx: RouterContext<R>,
  ref: string | undefined = undefined
): Promise<void> {
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

    ctx.response.status = status;
    ctx.response.body = data;
  } catch (error) {
    ctx.response.status = error.status;
    ctx.response.body = `⚠️ ${ctx.response.status}: ${error.message}`;
  }
}
