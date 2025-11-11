import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const shikiConfig = {
    /** @type {import('shiki').BundledTheme[]} */
    themes: ["kanagawa-dragon"],
    /** @type {import('shiki').BundledLanguage[]} */
    langs: [
        "c",
        "c++",
        "html",
        "java",
        "javascript",
        "json",
        "lua",
        "luau",
        "nix",
        "rust",
        "sh",
        "svelte",
        "toml",
        "typescript",
    ],
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: [".md"],
    highlight: {
        highlighter: async (code, lang = "text") => {
            const highlighter = await createHighlighter({
                themes: shikiConfig.themes,
                langs: shikiConfig.langs,
            });

            highlighter.loadLanguage(...shikiConfig.langs);
            const html = escapeSvelte(
                highlighter.codeToHtml(code, { lang, theme: shikiConfig.themes[0] }),
            );
            return `{@html \`${html}\` }`;
        },
    },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
    kit: {
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: false,
            strict: true,
        }),
    },
    extensions: [".svelte", ".md"],
};

export default config;
