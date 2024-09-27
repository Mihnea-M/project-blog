import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from "react";

export async function getBlogPostList() {
    const fileNames = await readDirectory('/content');

    const blogPosts = [];

    for (let fileName of fileNames) {
        const rawContent = await readFile(
            `/content/${fileName}`
        );

        const {data: frontMatter} = matter(rawContent);

        blogPosts.push({
            slug: fileName.replace('.mdx', ''),
            ...frontMatter,
        });
    }

    return blogPosts.sort((p1, p2) =>
        p1.publishedOn < p2.publishedOn ? 1 : -1
    );
}

export const loadBlogPost = React.cache(async (slug) => {
    try {
        const rawContent = await readFile(
            `/content/${slug}.mdx`
        );

        const {data: frontmatter, content} =
            matter(rawContent);

        return {frontmatter, content};
    } catch (exception) {
        return null;
    }
})

function readFile(localPath) {
    return fs.readFile(
        path.join(process.cwd(), localPath),
        'utf8'
    );
}

function readDirectory(localPath) {
    return fs.readdir(
        path.join(process.cwd(), localPath)
    );
}
