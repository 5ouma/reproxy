import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import app from "./server.ts";
import {
  exportRepo,
  testRef,
  testRepo,
  testUserAgent,
} from "./libs/test_utils.ts";
import { getGitHubUrl } from "./libs/utils.ts";

Deno.test("Serve", () => {
  Deno.test("/", async (t: Deno.TestContext) => {
    exportRepo(testRepo.normal);
    await t.step("Direct", async () => {
      const res: Response = await app.request("/");

      assertEquals(res.status, STATUS_CODE.OK);
    });

    await t.step("Redirect", async () => {
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

  Deno.test("/:ref", async (t: Deno.TestContext) => {
    exportRepo(testRepo.normal);
    await t.step("Direct", async () => {
      const res: Response = await app.request(`/${testRef.normal}`);

      assertEquals(res.status, STATUS_CODE.OK);
    });

    await t.step("Redirect", async () => {
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

  Deno.test("/:ref (with Slash)", async (t: Deno.TestContext) => {
    await t.step("Direct", async () => {
      exportRepo(testRepo.normal);
      const res: Response = await app.request(`/${testRef.slash}`);

      assertEquals(res.status, STATUS_CODE.OK);
    });

    await t.step("Redirect", async () => {
      exportRepo(testRepo.normal);
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
