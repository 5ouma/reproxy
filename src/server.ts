/**
 * This file is the entry point for the server.
 * @module
 */

import { app } from "./app.ts";

Deno.serve(app.fetch);
