import { type RouterContext, testing } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";

import { redirect } from "./redirect.ts";
import { exportRepo, testRef, testRepo } from "../test_utils.ts";

Deno.test("Redirect Detection", async <R extends string>(t: Deno.TestContext) => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(testRepo);

  await t.step("normal", () => {
    redirect(ctx, new UserAgent("Chrome/1.2.3"));

    assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
    assertEquals(
      ctx.response.headers.get("location"),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/master/${testRepo.path}`,
    );
  });

  await t.step("with ref", () => {
    redirect(ctx, new UserAgent("Chrome/1.2.3"), testRef);

    assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
    assertEquals(
      ctx.response.headers.get("location"),
      `https://github.com/${testRepo.owner}/${testRepo.name}/blob/${testRef}/${testRepo.path}`,
    );
  });
});
