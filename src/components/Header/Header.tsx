import React, {ComponentProps} from 'react';
import clsx from 'clsx';
import { Rss } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import {Theme} from "@/Types/types";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

interface HeaderProps extends ComponentProps<'header'>{
  theme: Theme;
}

function Header({ theme, className, ...delegated } : HeaderProps) {
  return (
      <header
          {...delegated}
          className={clsx(styles.wrapper, className)}
      >
        <Logo/>

        <div className={styles.actions}>
          <button className={styles.action}>
            <Rss
                size="1.5rem"
                style={{
                  // Optical alignment
                  transform: 'translate(2px, -2px)',
                }}
            />
            <VisuallyHidden>
              View RSS feed
            </VisuallyHidden>
          </button>
          <ThemeToggle initialTheme={theme} className={styles.action}/>
        </div>
      </header>
  );
}

export default Header;
