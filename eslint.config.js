import { defineConfig } from "eslint/config";
// import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

export default defineConfig(
    // eslint.configs["recommended"],
    tseslint.configs["recommended"],
    svelte.configs["recommended"],
    prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
    {
        ignores: ["build/", ".svelte-kit/", "dist/"],
    },
);
