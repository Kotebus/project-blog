import styles from './postSlug.module.css';
import Spinner from "@/components/Spinner";

function BlogPostLoading() {
    return (
        <article className={`${styles.wrapper} ${styles.spinner}`}>
            <Spinner size={40}/>
        </article>
    );
}

export default BlogPostLoading;
