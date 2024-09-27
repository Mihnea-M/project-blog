import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";
import {BLOG_TITLE} from "@/constants";
import {MDX_COMPONENTS} from "@/helpers/mdx-components";
import {notFound} from "next/navigation";

export async function generateMetadata({params}) {
    const postSlug = params.postSlug;

    const blogPost = await loadBlogPost(postSlug);
    if (blogPost != null) {
        const {title, abstract} = blogPost.frontmatter;
        return {
            title: `${title} • ${BLOG_TITLE}`,
            description: abstract,
        }
    } else {
        return {
            title: `Not Found • ${BLOG_TITLE}`,
            description: 'Not found',
        }
    }
}

async function BlogPost({params}) {
    const postSlug = params.postSlug;
    const post = await loadBlogPost(postSlug);
    if (post == null){
        notFound();
    }
    return (
        <article className={styles.wrapper}>
            <BlogHero
                title={post.frontmatter.title}
                publishedOn={post.frontmatter.publishedOn}
            />
            <div className={styles.page}>
                <MDXRemote source={post.content} components={MDX_COMPONENTS}/>
            </div>
        </article>
    );
}

export default BlogPost;
