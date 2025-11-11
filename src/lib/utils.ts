import type { PostMetadata, PostLink } from "$lib/types";

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];
export function formatDate(date: string, dateStyle: DateStyle = "long", locales = "en") {
    // damn you safari
    const properDate = new Date(date.replaceAll("-", "/"));
    const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle });

    return dateFmt.format(properDate);
}

export async function getAllPosts(): Promise<PostLink[]> {
    const pathPrefix = "../posts/";
    const allPostFiles = import.meta.glob("../posts/*.md");
    const iterablePostFiles = Object.entries(allPostFiles);
    const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
        const { metadata } = (await resolver()) as { metadata: PostMetadata };
        const postPath = path.replace(pathPrefix, "").replace(".md", "");
        return { metadata, postPath };
    });
    const posts = await Promise.all(postJobs);
    posts.sort((a, b) => {
        const dateA = new Date(a.metadata.date);
        const dateB = new Date(b.metadata.date);
        return dateB.getTime() - dateA.getTime();
    });
    return posts;
}
