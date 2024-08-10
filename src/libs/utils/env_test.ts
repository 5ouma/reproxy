import { assertEquals } from "@std/assert";

import { getRepository } from "./env.ts";
import { clearRepo, exportRepo, testRepo } from "../test_utils.ts";

Deno.test("Get Repository Env", async (t: Deno.TestContext) => {
  await t.step("Normal", () => {
    exportRepo(testRepo);
    const repository = getRepository();

    assertEquals(repository.owner, testRepo.owner);
    assertEquals(repository.name, testRepo.name);
    assertEquals(repository.path, testRepo.path);
  });

  await t.step("Not set", () => {
    clearRepo();
    const repository = getRepository();

    assertEquals(repository.owner, "");
    assertEquals(repository.name, "");
    assertEquals(repository.path, "");
  });
});
