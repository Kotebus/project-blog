import React, {ComponentProps} from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import styles from './BlogHero.module.css';

interface BlogHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn: Date | string;
  className?: string;
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
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          Published on{' '}
          <time dateTime={typeof publishedOn === 'string' ? publishedOn : publishedOn.toDateString()}>
            {humanizedDate}
          </time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;
