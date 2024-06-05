import { testing, type RouterContext } from "@oak/oak";
import { assertEquals } from "@std/assert";
import { STATUS_CODE } from "@std/http/status";
import { UserAgent } from "@std/http/user-agent";
import { redirect } from "../../src/libs/redirect.ts";
import { Repository } from "../../src/types/repository.ts";

Deno.test("Redirect Detection", <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  const repository: Repository = {
    owner: "repository-owner",
    name: "repository-name",
    path: "repository-path",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);

  redirect(ctx, new UserAgent("Chrome/1.2.3"));
  assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
  assertEquals(
    ctx.response.headers.get("location"),
    "https://github.com/repository-owner/repository-name/blob/HEAD/repository-path"
  );
});

Deno.test("Redirect Detection (With ref)", <R extends string>() => {
  const ctx: RouterContext<R> = testing.createMockContext();
  const repository: Repository = {
    owner: "repository-owner",
    name: "repository-name",
    path: "repository-path",
  };
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);

  redirect(ctx, new UserAgent("Chrome/1.2.3"), "v1.0.0");
  assertEquals(ctx.response.status, STATUS_CODE.PermanentRedirect);
  assertEquals(
    ctx.response.headers.get("location"),
    "https://github.com/repository-owner/repository-name/blob/v1.0.0/repository-path"
  );
});
