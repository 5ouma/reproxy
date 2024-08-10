import { type RouterContext, testing } from "@oak/oak";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { getContent } from "./content.ts";
import { exportRepo, testRef, testRepo, unknownRepo } from "../test_utils.ts";

Deno.test("Get Content", async <R extends string>(t: Deno.TestContext) => {
  const ctx: RouterContext<R> = testing.createMockContext();

  await t.step("normal", async () => {
    exportRepo(testRepo);
    await getContent(ctx);

    assertEquals(ctx.response.status, STATUS_CODE.OK);
  });

  await t.step("with ref", async () => {
    exportRepo(testRepo);
    await getContent(ctx, testRef);

    assertEquals(ctx.response.status, STATUS_CODE.OK);
  });

  await t.step("not found", async () => {
    exportRepo(unknownRepo);
    await getContent(ctx);

    assertEquals(ctx.response.status, STATUS_CODE.NotFound);
    assertStringIncludes(
      ctx.response.body!.toString(),
      `⚠️ ${STATUS_CODE.NotFound}:`,
    );
  });
});
