import fs from 'fs';
import RSS from 'rss';
// @ts-ignore
import {getBlogPostList} from "../src/helpers/file-helpers.ts";
// @ts-ignore
import {BLOG_TITLE, SITE_URL} from "../src/constants.ts";

const DIRECTORY_ROOT = 'build/';
const DIRECTORY_RSS = DIRECTORY_ROOT + 'rss/';

const createDirectoryIfNotExists = (folderName: string) => {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
};
const generateRss = async () => {
    const posts = await getBlogPostList();

    const feed = new RSS({
        title: BLOG_TITLE,
        description: 'description',
        feed_url: SITE_URL + 'rss.xml',
        site_url: SITE_URL,
    });

    posts.forEach(post => {
        feed.item({
            title: post.title,
            description: post.abstract,
            url: SITE_URL + post.slug,
            date: post.publishedOn,
        });
    });

    createDirectoryIfNotExists(DIRECTORY_ROOT);
    createDirectoryIfNotExists(DIRECTORY_RSS);

    const xml = feed.xml();
    fs.writeFileSync(DIRECTORY_RSS + 'feed.xml', xml);
}

void generateRss();