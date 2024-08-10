import { Application } from "@oak/oak";
import type { ApplicationListenEvent } from "@oak/oak/application";
import { yellow } from "@std/fmt/colors";

import { router } from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  "listen",
  ({ secure, hostname, port }: ApplicationListenEvent) => {
    console.log(
      `🔔 listening: ${
        yellow(
          `${secure ? "https" : "http"}://${hostname ?? "localhost"}:${port}`,
        )
      }`,
    );
  },
);

await app.listen({ port: 8080 });
