import { testing, type RouterContext } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { router } from "../src/router.ts";
import { testRepo, testRef, exportRepo } from "./utils.ts";

Deno.test("Serve (/)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext({
    method: "GET",
    path: "/",
  });
  exportRepo(testRepo);
  await router.routes()(ctx, () => Promise.resolve());

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Serve (/:ref)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext({
    method: "GET",
    path: `/${testRef}`,
  });
  exportRepo(testRepo);
  await router.routes()(ctx, () => Promise.resolve());

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});
