import { assertEquals } from "@std/assert";
import { describe, test } from "@std/testing/bdd";
import { UserAgent } from "@std/http/user-agent";

import { checkRedirect } from "./redirect.ts";
import { testRef, testRepo, testUserAgent } from "./test_utils.ts";
import { getDefaultBranch, getGitHubUrl } from "./utils.ts";

describe("Redirect Detection", () => {
  describe("Direct", () => {
    test("normal", async () => {
      const url: URL | null = await checkRedirect(
        new UserAgent(""),
        testRepo.normal,
      );

      assertEquals(url, null);
    });

    test("with ref", async () => {
      const url: URL | null = await checkRedirect(
        new UserAgent(""),
        testRepo.normal,
        testRef.normal,
      );

      assertEquals(url, null);
    });
  });

  describe("Redirect", () => {
    test("normal", async () => {
      const url: URL | null = await checkRedirect(
        testUserAgent,
        testRepo.normal,
      );

      assertEquals(
        url,
        getGitHubUrl(
          testRepo.normal,
          await getDefaultBranch(testRepo.normal, undefined),
        ),
      );
    });

    test("with ref", async () => {
      const url: URL | null = await checkRedirect(
        testUserAgent,
        testRepo.normal,
        testRef.normal,
      );

      assertEquals(url, getGitHubUrl(testRepo.normal, testRef.normal));
    });
  });
});
