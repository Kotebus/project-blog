import BlogSummaryCard from '@/components/BlogSummaryCard';

import {getBlogPostList} from "@/helpers/file-helpers";

async function BlogPostList() {
    const posts = await getBlogPostList();

    return (
        <>
            {posts.map(({slug, title, abstract, publishedOn}) => (
                <BlogSummaryCard
                    key={slug}
                    slug={slug}
                    title={title}
                    abstract={abstract}
                    publishedOn={publishedOn}
                />
            ))}
        </>
    );
}

export default BlogPostList;
