import { testing, type RouterContext } from "@oak/oak";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { getContent } from "../../src/libs/content.ts";
import { testRepo, unknownRepo, testRef, exportRepo } from "../utils.ts";

Deno.test("Get Content", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(testRepo);
  await getContent(ctx);

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Get Content (With ref)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(testRepo);
  await getContent(ctx, testRef);

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Get Content (Not found)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(unknownRepo);
  await getContent(ctx);

  assertEquals(ctx.response.status, STATUS_CODE.NotFound);
  assertStringIncludes(
    ctx.response.body!.toString(),
    `⚠️ ${STATUS_CODE.NotFound}:`
  );
});
