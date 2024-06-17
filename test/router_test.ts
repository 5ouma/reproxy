import { type RouterContext, testing } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { router } from "../src/router.ts";
import { exportRepo, testRef, testRepo } from "./utils.ts";

Deno.test("Serve", async <R extends string>(t: Deno.TestContext) => {
  await t.step("/", async () => {
    const ctx: RouterContext<R> = testing.createMockContext({
      method: "GET",
      path: "/",
    });
    exportRepo(testRepo);
    await router.routes()(ctx, () => Promise.resolve());

    assertEquals(ctx.response.status, STATUS_CODE.OK);
  });

  await t.step("/:ref", async () => {
    const ctx: RouterContext<R> = testing.createMockContext({
      method: "GET",
      path: `/${testRef}`,
    });
    exportRepo(testRepo);
    await router.routes()(ctx, () => Promise.resolve());

    assertEquals(ctx.response.status, STATUS_CODE.OK);
  });
});
