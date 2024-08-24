import { UserAgent } from "@std/http/user-agent";
import type { Repository } from "./types.ts";

export const testRepo: Repository = {
  owner: "denoland",
  name: "deno",
  path: "README.md",
};

export const unknownRepo: Repository = {
  owner: "unknown-owner",
  name: "unknown-repo",
  path: "unknown-path",
};

export const testRef = "v1.0.0";

export const testUserAgent = new UserAgent("Chrome/1.2.3");

export function exportRepo(repository: Repository) {
  Deno.env.set("REPOSITORY_OWNER", repository.owner);
  Deno.env.set("REPOSITORY_NAME", repository.name);
  Deno.env.set("REPOSITORY_PATH", repository.path);
}

export function clearRepo() {
  Deno.env.delete("REPOSITORY_OWNER");
  Deno.env.delete("REPOSITORY_NAME");
  Deno.env.delete("REPOSITORY_PATH");
}
