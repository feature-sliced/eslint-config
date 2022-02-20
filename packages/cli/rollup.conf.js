import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: {
        file: "dist/cli.js",
        format: "cjs",
    },
    plugins: [nodeResolve({ include: ["node_modules/**"] }), commonjs(), json(), terser()],
    external: ["meow"],
};
