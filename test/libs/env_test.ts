import { assertEquals } from "@std/assert";
import { getRepository } from "../../src/libs/env.ts";
import { unknownRepo, exportRepo } from "../utils.ts";

Deno.test("Get Repository Env", () => {
  exportRepo(unknownRepo);

  const repository = getRepository();
  assertEquals(repository.owner, unknownRepo.owner);
  assertEquals(repository.name, unknownRepo.name);
  assertEquals(repository.path, unknownRepo.path);
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
