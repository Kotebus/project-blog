import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {loadBlogPost} from "@/helpers/file-helpers";
import {MDXRemote} from "next-mdx-remote/rsc";
import {Metadata} from "next";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";

const loadingFunction = () => <Spinner/>;

const CodeSnippet = dynamic(
    () => import("@/components/CodeSnippet"),
    {loading: loadingFunction}
);
const DivisionGroupsDemo = dynamic(
    () => import("@/components/DivisionGroupsDemo"),
    {loading: loadingFunction}
);

const CircularColorsDemo = dynamic(
    () => import("@/components/CircularColorsDemo"),
    {loading: loadingFunction}
);

interface BlogPageProps {
    params: Promise<{ postSlug: string }>
}

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
    const {postSlug} = await params;

    const {title, abstract, publishedOn} = await loadBlogPost(postSlug);

    return {
        title: title,
        description: abstract,
        publishedOn: publishedOn,
        slug: postSlug,
    } as Metadata;
}

async function BlogPost({params}: BlogPageProps) {
    const {postSlug} = await params;
    const {title, publishedOn, content} = await loadBlogPost(postSlug);

    return (
        <article className={styles.wrapper}>
            <BlogHero
                title={title}
                publishedOn={publishedOn}
            />
            <div className={styles.page}>
                <MDXRemote
                    source={content}
                    components={{
                        CodeSnippet,
                        CircularColorsDemo,
                        DivisionGroupsDemo,
                    }}
                />
            </div>
        </article>
    );
}

export default BlogPost;
