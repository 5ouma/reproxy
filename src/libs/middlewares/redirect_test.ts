import { assertEquals } from "@std/assert";
import { UserAgent } from "@std/http/user-agent";

import { redirect } from "./redirect.ts";
import { exportRepo, testRef, testRepo } from "../test_utils.ts";

Deno.test("Redirect Detection", async (t: Deno.TestContext) => {
  await t.step("normal", () => {
    exportRepo(testRepo);
    const url: URL | null = redirect(new UserAgent("Chrome/1.2.3"));

    assertEquals(
      url?.toString(),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/master/${testRepo.path}`,
    );
  });

  await t.step("with ref", () => {
    exportRepo(testRepo);
    const url: URL | null = redirect(new UserAgent("Chrome/1.2.3"), testRef);

    assertEquals(
      url?.toString(),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/${testRef}/${testRepo.path}`,
    );
  });
});
