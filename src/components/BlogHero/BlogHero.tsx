import React, {ComponentProps} from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import styles from './BlogHero.module.css';

interface BlogHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn: string;
}
function BlogHero({
  title,
  publishedOn,
  className,
  ...delegated
}: BlogHeroProps) {
  const humanizedDate = format(
    new Date(publishedOn),
    'MMMM do, yyyy'
  );

  return (
    <header
        {...delegated}
        className={clsx(styles.wrapper, className)}
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          Published on{' '}
          <time dateTime={publishedOn}>
            {humanizedDate}
          </time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;
