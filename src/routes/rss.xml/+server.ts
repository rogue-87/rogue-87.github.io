import * as config from "$lib/site-config";
import { getAllPosts } from "$lib/utils";
import { create } from "xmlbuilder2";
import type { ServerLoadEvent } from "@sveltejs/kit";

import { readFile } from "fs/promises";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";

import { base } from "$app/paths";
import { JSDOM } from "jsdom";

export async function GET({ fetch }: ServerLoadEvent) {
    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "application/xml",
    };

    return new Response(await generateXml(), { headers });
}

async function getHtmlForPost(
    postPath: string,
    leadImageFilename?: string,
    leadImageCaption?: string,
): Promise<string> {
    const postMarkdownWithFrontmatter = await readFile(`src/posts/${postPath}.md`, "utf-8");
    // prettier-ignore
    const postMarkdown = postMarkdownWithFrontmatter
		.split("---")
		.slice(2)
		.join("---")
		.trim();

    const processedMarkdown = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(remarkGfm)
        .process(postMarkdown);

    const postHtml = processedMarkdown.toString().replaceAll("&#x3C;", "&amp;lt;");

    const postDom = new JSDOM();
    postDom.window.document.body.innerHTML = postHtml;

    inlineFootnotes(postDom);

    if (leadImageFilename) {
        const leadImage = postDom.window.document.createElement("img");
        leadImage.src = `${base}/${leadImageFilename}`;
        if (leadImageCaption) {
            const caption = postDom.window.document.createElement("caption");
            caption.textContent = leadImageCaption;
            postDom.window.document.body.prepend(caption);
        }
    }

    return postDom.window.document.body.innerHTML;
}

// prettier-ignore
async function generateXml(): Promise<string> {
	const posts = await getAllPosts();
	const rssUrl = `${config.url}/rss.xml`;
	const root = create({ version: '1.0', encoding: 'utf-8' })
	.ele('feed', { xmlns: 'http://www.w3.org/2005/Atom' })
      .ele('title').txt(config.title).up()
      .ele('link', { href: config.url }).up()
      .ele('link', { rel: 'self', href: rssUrl }).up()
      .ele('updated').txt(new Date().toISOString()).up()
      .ele('id').txt(config.url).up()
      .ele('author')
	    .ele('name').txt(config.author).up()
        .ele('email').txt(config.email).up()
      .up()
      .ele('subtitle').txt(config.desc).up()

	for await (const post of posts) {
		const pubDate = post.metadata.date;
		const postUrl = `${config.url}/blog/${post.postPath}`;
		const postHtml = await getHtmlForPost(post.postPath, post.metadata.image, post.metadata.caption);
		const summary = post.metadata.desc;

		root
		  .ele('entry')
			.ele('title').txt(post.metadata.title).up()
			.ele('link', { href: postUrl }).up()
			.ele('updated').txt(pubDate).up()
			.ele('id').txt(postUrl).up()
			.ele('content', { type: 'html' }).txt(postHtml).up()
			.ele('summary').txt(summary).up()
		  .up();
	}

	return root.end()
}

function inlineFootnotes(dom: JSDOM): void {
    const footnoteLinkPrefix = "#user-content-fn-";
    const prefixToRemove = "#user-content-";
    const allLinks = Array.from(dom.window.document.getElementsByTagName("a"));
    allLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href?.startsWith(footnoteLinkPrefix)) {
            const newFootnoteHref = "#" + href.slice(prefixToRemove.length);
            const footnoteContentElem = dom.window.document.getElementById(
                href.slice(1),
            ) as HTMLLIElement | null;
            footnoteContentElem?.setAttribute("id", newFootnoteHref.slice(1));
            link.setAttribute("href", newFootnoteHref);
        }
    });
}

// NOTE: Page Settings 󰒓
export const prerender = true;
