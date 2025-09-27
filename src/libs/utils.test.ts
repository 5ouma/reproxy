import { assertEquals } from "@std/assert";
import { describe, test } from "@std/testing/bdd";

import { getDefaultBranch } from "./utils.ts";
import { testRepo } from "./test_utils.ts";

describe("Get Default Branch", () => {
  test("normal ", async () => {
    const defaultBranch: string = await getDefaultBranch(testRepo.normal);

    assertEquals(defaultBranch, "main");
  });

  test("fallback to master", async () => {
    const defaultBranch: string = await getDefaultBranch(testRepo.unknown);

    assertEquals(defaultBranch, "master");
  });
});
