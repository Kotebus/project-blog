import styles from "@/app/notfound.module.css";
import React from "react";

export default function NotFoundPage() {
    return (
        <article className={styles.wrapper}>
            <header className={styles.headerWrapper}>
                <div className={styles.content}>
                    <h1>404 not found</h1>
                </div>
            </header>
            <div>
                <p>
                    This page does not exist. Please check the URL and try again.
                </p>
            </div>
        </article>
    );
}