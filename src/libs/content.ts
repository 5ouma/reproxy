import type { RouterContext } from "@oak/oak";
import { Octokit } from "@octokit/rest";

export async function getContent<R extends string>(
  ctx: RouterContext<R>,
  owner: string,
  name: string,
  path: string
): Promise<void> {
  const octokit = new Octokit();

  try {
    const { status, data } = await octokit.rest.repos.getContent({
      mediaType: { format: "raw" },
      owner: owner,
      repo: name,
      path: path,
    });

    ctx.response.status = status;
    ctx.response.body = data;
  } catch (error) {
    ctx.response.status = error.status;
    ctx.response.body = `⚠️ ${ctx.response.status}: ${error.message}`;
  }
}
