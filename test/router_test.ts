import { testing, type RouterContext } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { router } from "../src/router.ts";
import { Repository } from "../src/types/mod.ts";

Deno.test("Serve (/)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext({
    method: "GET",
    path: "/",
  });
  const repository: Repository = {
    owner: "denoland",
    name: "deno",
    path: "README.md",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);
  await router.routes()(ctx, () => Promise.resolve());

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});

Deno.test("Serve (/:ref)", async <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext({
    method: "GET",
    path: "/v1.0.0",
  });
  const repository: Repository = {
    owner: "denoland",
    name: "deno",
    path: "README.md",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);
  await router.routes()(ctx, () => Promise.resolve());

  assertEquals(ctx.response.status, STATUS_CODE.OK);
});
