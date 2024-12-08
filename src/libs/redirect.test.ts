import { assertEquals } from "@std/assert";

import { checkRedirect } from "./redirect.ts";
import { testRef, testRepo, testUserAgent } from "./test_utils.ts";
import { getGitHubUrl } from "./utils.ts";

Deno.test("Redirect Detection", async (t: Deno.TestContext) => {
  await t.step("normal", () => {
    const url: URL | null = checkRedirect(testUserAgent, testRepo.normal);

    assertEquals(url, getGitHubUrl(testRepo.normal));
  });

  await t.step("with ref", () => {
    const url: URL | null = checkRedirect(
      testUserAgent,
      testRepo.normal,
      testRef.normal,
    );

    assertEquals(url, getGitHubUrl(testRepo.normal, testRef.normal));
  });
});
