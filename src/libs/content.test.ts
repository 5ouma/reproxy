import { assertEquals, assertExists, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { getContent } from "./content.ts";
import { testRef, testRepo } from "./test_utils.ts";

Deno.test("Get Content", async (t: Deno.TestContext) => {
  await t.step("normal", async () => {
    const [data, status] = await getContent(testRepo.normal);

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  await t.step("with ref", async () => {
    const [data, status] = await getContent(testRepo.normal, testRef.normal);

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  await t.step("not found", async () => {
    const [data, status] = await getContent(testRepo.unknown);

    assertStringIncludes(data, `⚠️ ${STATUS_CODE.NotFound}:`);
    assertEquals(status, STATUS_CODE.NotFound);
  });
});
