import { type RouterContext, testing } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";
import { redirect } from "../../src/libs/redirect.ts";
import { exportRepo, testRef, testRepo } from "../utils.ts";

Deno.test("Redirect Detection", <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(testRepo);
  redirect(ctx, new UserAgent("Chrome/1.2.3"));

  assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
  assertEquals(
    ctx.response.headers.get("location"),
    `https://github.com/${testRepo.owner}/${testRepo.name}/blob/master/${testRepo.path}`,
  );
});

Deno.test("Redirect Detection (With ref)", <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  exportRepo(testRepo);
  redirect(ctx, new UserAgent("Chrome/1.2.3"), testRef);

  assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
  assertEquals(
    ctx.response.headers.get("location"),
    `https://github.com/${testRepo.owner}/${testRepo.name}/blob/${testRef}/${testRepo.path}`,
  );
});
