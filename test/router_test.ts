import { testing, type RouterContext } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { router } from "../src/router.ts";

Deno.test("Root Path", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext({
    method: "GET",
    path: "/",
  });
  await router.routes()(ctx, () => Promise.resolve());

  assertEquals(ctx.response.body, "Hello, Deno!");
  assertEquals(ctx.response.status, STATUS_CODE.OK);
});
