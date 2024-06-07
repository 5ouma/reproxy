import { assertEquals } from "@std/assert";
import { getRepository } from "../../src/libs/env.ts";
import { testRepo, exportRepo, clearRepo } from "../utils.ts";

Deno.test("Get Repository Env", () => {
  exportRepo(testRepo);
  const repository = getRepository();

  assertEquals(repository.owner, testRepo.owner);
  assertEquals(repository.name, testRepo.name);
  assertEquals(repository.path, testRepo.path);
});

Deno.test("Get Repository Env (Not set)", () => {
  clearRepo();
  const repository = getRepository();

  assertEquals(repository.owner, "");
  assertEquals(repository.name, "");
  assertEquals(repository.path, "");
});
