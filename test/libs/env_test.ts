import { assertEquals } from "@std/assert";
import { getRepository } from "../../src/libs/env.ts";

Deno.test("Get Repository Env", () => {
  const repositoryOwner = "repository-owner";
  const repositoryName = "repository-name";
  const repositoryPath = "repository-path";
  Deno.env.set("REPOSITORY_OWNER", repositoryOwner);
  Deno.env.set("REPOSITORY_NAME", repositoryName);
  Deno.env.set("REPOSITORY_PATH", repositoryPath);

  const repository = getRepository();
  assertEquals(repository.owner, repositoryOwner);
  assertEquals(repository.name, repositoryName);
  assertEquals(repository.path, repositoryPath);
});

Deno.test("Get Repository Env (Not set)", () => {
  Deno.env.delete("REPOSITORY_OWNER");
  Deno.env.delete("REPOSITORY_NAME");
  Deno.env.delete("REPOSITORY_PATH");

  const repository = getRepository();
  assertEquals(repository.owner, "");
  assertEquals(repository.name, "");
  assertEquals(repository.path, "");
});
