import RSS from "rss";
import {BLOG_DESCRIPTION, BLOG_TITLE} from "@/constants";
import {getBlogPostList} from "@/helpers/file-helpers";

export async function GET() {
    const feed = new RSS({
        title: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
    });

    const blogPosts = await getBlogPostList();

    blogPosts.forEach(blogPost => {
        feed.item({
            title: blogPost.title,
            description: blogPost.abstract,
            date: blogPost.publishedOn,
            url: 'www.google.com',
            // TODO
        });
    });

    return new Response(feed.xml({indent: true}), {
        headers: {
            'Content-Type': 'application/xml',
        }
    })
}