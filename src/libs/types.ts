/**
 * Repository type.
 *
 * @property owner The repository owner
 * @property name The repository name
 * @property path The content path from the root of the repository
 *
 * @example
 * ```ts
 * const repository: Repository = {
 *   owner: "5ouma",
 *   name: "reproxy",
 *   path: "src/server.ts",
 * };
 * ```
 */
export type Repository = {
  owner: string;
  name: string;
  path: string;
};
