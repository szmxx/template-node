/*
 * @Author: cola
 * @Date: 2023-09-14 13:45:52
 * @LastEditors: cola
 * @Description:
 */
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index.ts"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: false,
    },
  },
});
