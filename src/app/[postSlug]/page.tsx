import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";

async function BlogPost({ params }: {params: Promise<{ postSlug: string }>}) {
    const { postSlug } = await params;
    const  {title, publishedOn, content} = await loadBlogPost(postSlug);

    return (
        <article className={styles.wrapper}>
            <BlogHero
                title={title}
                publishedOn={publishedOn}
            />
            <div className={styles.page}>
                <MDXRemote source={content} />
            </div>
        </article>
    );
}

export default BlogPost;
