import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface IPost {
  slug: string;
  abstract: string;
  title: string;
  publishedOn: Date;
}

export interface IPostWithContent extends IPost {
    content: string;
}

export async function getBlogPostList() {
    const fileNames = await readDirectory('/content');

    const blogPosts: IPost[] = [];

    for (let fileName of fileNames) {
        const rawContent = await readFile(
            `/content/${fileName}`
        );

        const {data: frontmatter} = matter(rawContent);

        blogPosts.push({
            slug: fileName.replace('.mdx', ''),
            ...frontmatter,
        } as IPost);
    }

    return blogPosts.sort((p1, p2) =>
        p1.publishedOn < p2.publishedOn ? 1 : -1
    );
}

export async function loadBlogPost(slug: string) {
    const rawContent = await readFile(
        `/content/${slug}.mdx`
    );

    const {data: frontmatter, content} =
        matter(rawContent);

    return {
        ...(frontmatter as IPost),
        content,
    } as IPostWithContent;
}

function readFile(localPath: string) {
    return fs.readFile(
        path.join(process.cwd(), localPath),
        'utf8'
    );
}

function readDirectory(localPath: string) {
    return fs.readdir(
        path.join(process.cwd(), localPath)
    );
}
