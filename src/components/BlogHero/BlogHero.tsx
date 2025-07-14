import React, {ComponentProps} from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import styles from './BlogHero.module.css';


const getHumanizedDate = (date: string) =>
    format(
        new Date(date),
        'MMMM do, yyyy'
    );

interface BlogHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn?: string;
}
function BlogHero({
  title,
  publishedOn,
  className,
  ...delegated
}: BlogHeroProps) {
  return (
      <header
          {...delegated}
          className={clsx(styles.wrapper, className)}
      >
        <div className={styles.content}>
          <h1>{title}</h1>
          {publishedOn && (
              <p>
                Published on{' '}
                <time dateTime={publishedOn}>
                  {getHumanizedDate(publishedOn)}
                </time>
              </p>
          )}
        </div>
      </header>
  );
}

export default BlogHero;
