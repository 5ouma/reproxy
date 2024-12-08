import { assertEquals } from "@std/assert";
import { describe, test } from "@std/testing/bdd";
import { UserAgent } from "@std/http/user-agent";

import { checkRedirect } from "./redirect.ts";
import { testRef, testRepo, testUserAgent } from "./test_utils.ts";
import { getGitHubUrl } from "./utils.ts";

describe("Redirect Detection", () => {
  describe("Direct", () => {
    test("normal", () => {
      const url: URL | null = checkRedirect(new UserAgent(""), testRepo.normal);

      assertEquals(url, null);
    });

    test("with ref", () => {
      const url: URL | null = checkRedirect(
        new UserAgent(""),
        testRepo.normal,
        testRef.normal,
      );

      assertEquals(url, null);
    });
  });

  describe("Redirect", () => {
    test("normal", () => {
      const url: URL | null = checkRedirect(testUserAgent, testRepo.normal);

      assertEquals(url, getGitHubUrl(testRepo.normal));
    });

    test("with ref", () => {
      const url: URL | null = checkRedirect(
        testUserAgent,
        testRepo.normal,
        testRef.normal,
      );

      assertEquals(url, getGitHubUrl(testRepo.normal, testRef.normal));
    });
  });
});
