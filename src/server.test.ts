import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { beforeEach, describe, test } from "@std/testing/bdd";

import app from "./server.ts";
import {
  exportRepo,
  testRef,
  testRepo,
  testUserAgent,
} from "./libs/test_utils.ts";
import { getGitHubUrl } from "./libs/utils.ts";

describe("Serve", () => {
  beforeEach(() => {
    exportRepo(testRepo.normal);
  });

  describe("/", () => {
    test("Direct", async () => {
      const res: Response = await app.request("/");

      assertEquals(res.status, STATUS_CODE.OK);
    });

    test("Redirect", async () => {
      const res: Response = await app.request("/", {
        headers: { "User-Agent": testUserAgent.toString() },
      });

      assertEquals(
        res.headers.get("Location"),
        getGitHubUrl(testRepo.normal).toString(),
      );
      assertEquals(res.status, STATUS_CODE.PermanentRedirect);
    });
  });

  describe("/:ref", () => {
    test("Direct", async () => {
      const res: Response = await app.request(`/${testRef.normal}`);

      assertEquals(res.status, STATUS_CODE.OK);
    });

    test("Redirect", async () => {
      const res: Response = await app.request(`/${testRef.normal}`, {
        headers: { "User-Agent": testUserAgent.toString() },
      });

      assertEquals(
        res.headers.get("Location"),
        getGitHubUrl(testRepo.normal, testRef.normal).toString(),
      );
      assertEquals(res.status, STATUS_CODE.PermanentRedirect);
    });
  });

  describe("/:ref (with Slash)", () => {
    test("Direct", async () => {
      const res: Response = await app.request(`/${testRef.slash}`);

      assertEquals(res.status, STATUS_CODE.OK);
    });

    test("Redirect", async () => {
      const res: Response = await app.request(`/${testRef.slash}`, {
        headers: { "User-Agent": testUserAgent.toString() },
      });

      assertEquals(
        res.headers.get("Location"),
        getGitHubUrl(testRepo.normal, testRef.slash).toString(),
      );
      assertEquals(res.status, STATUS_CODE.PermanentRedirect);
    });
  });
});
