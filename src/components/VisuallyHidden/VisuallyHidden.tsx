import {ComponentPropsWithoutRef, ElementType, PropsWithChildren} from 'react';
import clsx from 'clsx';

import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps<T extends ElementType = 'span'> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T> & PropsWithChildren;

function VisuallyHidden({
  as: Element = 'span',
  className = '',
  children,
  ...delegated
}: VisuallyHiddenProps) {
  return (
    <Element
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      {children}
    </Element>
  );
}

export default VisuallyHidden;
