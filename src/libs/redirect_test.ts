import { assertEquals } from "@std/assert";

import { redirect } from "./redirect.ts";
import { exportRepo, testRef, testRepo, testUserAgent } from "./test_utils.ts";
import { getGitHubUrl } from "./env.ts";

Deno.test("Redirect Detection", async (t: Deno.TestContext) => {
  await t.step("normal", () => {
    exportRepo(testRepo);
    const url: URL | null = redirect(testUserAgent);

    assertEquals(url, getGitHubUrl(testRepo));
  });

  await t.step("with ref", () => {
    exportRepo(testRepo);
    const url: URL | null = redirect(testUserAgent, testRef);

    assertEquals(url, getGitHubUrl(testRepo, testRef));
  });
});
