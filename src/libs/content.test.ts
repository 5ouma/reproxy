import { assertEquals, assertExists, assertStringIncludes } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { describe, test } from "@std/testing/bdd";

import { getContent } from "./content.ts";
import { testRef, testRepo } from "./test_utils.ts";

describe("Get Content", () => {
  test("normal", async () => {
    const [data, status] = await getContent(testRepo.normal);

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  test("with ref", async () => {
    const [data, status] = await getContent(testRepo.normal, testRef.normal);

    assertExists(data);
    assertEquals(status, STATUS_CODE.OK);
  });

  test("not found", async () => {
    const [data, status] = await getContent(testRepo.unknown);

    assertStringIncludes(data, `⚠️ ${STATUS_CODE.NotFound}:`);
    assertEquals(status, STATUS_CODE.NotFound);
  });
});
