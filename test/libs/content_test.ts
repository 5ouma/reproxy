import { testing, type RouterContext } from "@oak/oak";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { getContent } from "../../src/libs/content.ts";

Deno.test("Get Content", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  await getContent(ctx, "denoland", "deno", "README.md");
  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Get Content (Not found)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  await getContent(
    ctx,
    "unknown-owner",
    "unknown-repo",
    "unknown-path/to/file"
  );
  assertEquals(ctx.response.status, STATUS_CODE.NotFound);
  assertStringIncludes(
    ctx.response.body!.toString(),
    `⚠️ ${STATUS_CODE.NotFound}:`
  );
});
