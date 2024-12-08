import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";

import app from "./server.ts";
import {
  exportRepo,
  testRef,
  testRefSlash,
  testRepo,
  testUserAgent,
} from "./libs/test_utils.ts";
import { getGitHubUrl } from "./libs/utils.ts";

Deno.test("Serve", async (t: Deno.TestContext) => {
  await t.step("/", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request("/");

    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("/ (Redirect)", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request("/", {
      headers: { "User-Agent": testUserAgent.toString() },
    });

    assertEquals(
      res.headers.get("Location"),
      getGitHubUrl(testRepo).toString(),
    );
    assertEquals(res.status, STATUS_CODE.PermanentRedirect);
  });

  await t.step("/:ref", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request(`/${testRef}`);

    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("/:ref (Redirect)", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request(`/${testRef}`, {
      headers: { "User-Agent": testUserAgent.toString() },
    });

    assertEquals(
      res.headers.get("Location"),
      getGitHubUrl(testRepo, testRef).toString(),
    );
    assertEquals(res.status, STATUS_CODE.PermanentRedirect);
  });

  await t.step("/:ref (with Slash)", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request(`/${testRefSlash}`);

    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("/:ref (withSlash, Redirect)", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request(`/${testRefSlash}`, {
      headers: { "User-Agent": testUserAgent.toString() },
    });

    assertEquals(
      res.headers.get("Location"),
      getGitHubUrl(testRepo, testRefSlash).toString(),
    );
    assertEquals(res.status, STATUS_CODE.PermanentRedirect);
  });
});
