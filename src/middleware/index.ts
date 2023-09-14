import type Koa from "koa";
import glob from "fast-glob";
import { fileURLToPath } from "url";
import { dirname } from "pathe";
const __dirname = dirname(fileURLToPath(import.meta.url));

const middlewares = glob.sync(`${__dirname}/*.ts`);

export default async (app: Koa) => {
  middlewares.sort((a, b) => {
    if (a.includes("format.ts") && !b.includes("format.ts")) {
      return -1;
    }
    if (!a.includes("format.ts") && b.includes("format.ts")) {
      return 1;
    }
    return 0;
  });

  for (const middleware of middlewares) {
    if (!middleware.endsWith("index.ts")) {
      const module = await import(middleware);
      app.use(module);
    }
  }
};
