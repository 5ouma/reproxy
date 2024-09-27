import { assertEquals } from "@std/assert";

import { checkRedirect } from "./redirect.ts";
import { testRef, testRepo, testUserAgent } from "./test_utils.ts";
import { getGitHubUrl } from "./utils.ts";

Deno.test("Redirect Detection", async (t: Deno.TestContext) => {
  await t.step("normal", () => {
    const url: URL | null = checkRedirect(testUserAgent, testRepo);

    assertEquals(url, getGitHubUrl(testRepo));
  });

  await t.step("with ref", () => {
    const url: URL | null = checkRedirect(testUserAgent, testRepo, testRef);

    assertEquals(url, getGitHubUrl(testRepo, testRef));
  });
});
