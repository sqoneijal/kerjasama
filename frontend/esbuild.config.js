#!/usr/bin/env node

const { build } = require("esbuild");
const path = require("path");

build({
   entryPoints: ["src/index.jsx"],
   allowOverwrite: true,
   bundle: true,
   format: "esm", // Output format: ES modules
   minify: true,
   sourcemap: "external",
   alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
   },
   jsxSideEffects: true,
   splitting: true,
   outdir: "./bundle",
   loader: {
      ".js": "jsx",
      ".png": "dataurl",
      ".gif": "copy",
      ".jpg": "dataurl",
      ".ttf": "copy",
      ".woff": "copy",
      ".woff2": "copy",
      ".eot": "copy",
      ".svg": "dataurl",
      ".webp": "dataurl",
      ".css": "css",
   },
   jsx: "automatic",
   plugins: [
      {
         name: "resolve-babel",
         setup(build) {
            // Resolve .babelrc and .babelrc.js files
            build.onResolve({ filter: /\.babelrc(\.js)?$/ }, (args) => ({
               path: path.resolve(args.resolveDir, args.path),
               namespace: "file",
            }));
            // Handle .babelrc files
            build.onLoad({ filter: /\.babelrc$/, namespace: "file" }, async (args) => ({
               contents: `export default ${JSON.stringify(require(args.path))}`,
               loader: "json",
            }));
            // Handle .babelrc.js files
            build.onLoad({ filter: /\.babelrc\.js$/, namespace: "file" }, async (args) => ({
               contents: await require("fs").promises.readFile(args.path, "utf8"),
               loader: "js",
            }));
         },
      },
   ],
}).catch(() => process.exit(1));
