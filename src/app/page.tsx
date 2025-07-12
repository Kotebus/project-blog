import React, {Suspense} from 'react';

import styles from './homepage.module.css';
import Spinner from "@/components/Spinner";
import BlogPostList from "@/app/BlogPostsList";
import {Metadata} from "next";
import {BLOG_TITLE} from "@/constants";

export function generateMetadata(): Metadata {
    return {
        title: BLOG_TITLE,
        description: 'A wonderful blog about JavaScript',
    };
}

async function Home() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainHeading}>
                Latest Content:
            </h1>

            <Suspense fallback={<Spinner/>}>
                <BlogPostList/>
            </Suspense>
        </div>
    );
}

export default Home;
