import { assertEquals } from "@std/assert";
import { UserAgent } from "@std/http";
import { STATUS_CODE } from "@std/http/status";

import { app } from "./server.ts";
import { exportRepo, testRef, testRepo } from "./libs/test_utils.ts";

Deno.test("Serve", async (t: Deno.TestContext) => {
  await t.step("/", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request("/");

    assertEquals(res.status, STATUS_CODE.OK);
  });

  await t.step("/ (Redirect)", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request("/", {
      headers: { "User-Agent": new UserAgent("Chrome/1.2.3").toString() },
    });

    assertEquals(
      res.headers.get("Location"),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/master/${testRepo.path}`,
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
      headers: { "User-Agent": new UserAgent("Chrome/1.2.3").toString() },
    });

    assertEquals(
      res.headers.get("Location"),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/${testRef}/${testRepo.path}`,
    );
    assertEquals(res.status, STATUS_CODE.PermanentRedirect);
  });

  await t.step("*", async () => {
    exportRepo(testRepo);
    const res: Response = await app.request("/anything/else");

    assertEquals(res.headers.get("Location"), "/");
    assertEquals(res.status, STATUS_CODE.SeeOther);
  });
});
