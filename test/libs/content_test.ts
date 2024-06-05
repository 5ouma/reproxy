import { testing, type RouterContext } from "@oak/oak";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { getContent } from "../../src/libs/content.ts";
import { Repository } from "../../src/types/mod.ts";

Deno.test("Get Content", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  const repository: Repository = {
    owner: "denoland",
    name: "deno",
    path: "README.md",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);

  await getContent(ctx);
  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Get Content (With ref)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  const repository: Repository = {
    owner: "denoland",
    name: "deno",
    path: "README.md",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);

  await getContent(ctx, "v1.0.0");
  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Get Content (Not found)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  const repository: Repository = {
    owner: "unknown-owner",
    name: "unknown-repo",
    path: "unknown-path/to/file",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);

  await getContent(ctx);
  assertEquals(ctx.response.status, STATUS_CODE.NotFound);
  assertStringIncludes(
    ctx.response.body!.toString(),
    `⚠️ ${STATUS_CODE.NotFound}:`
  );
});
