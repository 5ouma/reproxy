import { assertEquals, assertExists, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import { getContent } from "./content.ts";
import { exportRepo, testRef, testRepo, unknownRepo } from "../test_utils.ts";

Deno.test("Get Content", async (t: Deno.TestContext) => {
  await t.step("normal", async () => {
    exportRepo(testRepo);
    const [data, status] = await getContent();

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  await t.step("with ref", async () => {
    exportRepo(testRepo);
    const [data, status] = await getContent(testRef);

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  await t.step("not found", async () => {
    exportRepo(unknownRepo);
    const [data, status] = await getContent();

    assertStringIncludes(data, `⚠️ ${STATUS_CODE.NotFound}:`);
    assertEquals(status, STATUS_CODE.NotFound);
  });
});
