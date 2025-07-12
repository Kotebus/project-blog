import React, {Suspense} from 'react';

import styles from './homepage.module.css';
import Spinner from "@/components/Spinner";
import BlogPostList from "@/app/BlogPostsList";

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
