import {PropsWithChildren} from "react";
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';

import clsx from 'clsx';

import {LIGHT_TOKENS, DARK_TOKENS, THEME_COOKIE_NAME} from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import RespectMotionPreferences from "@/components/RespectMotionPreferences/RespectMotionPreferences";
import { cookies } from "next/headers";
import {Theme} from "@/Types/types";

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

async function RootLayout({ children }: PropsWithChildren) {
    const savedTheme = (await cookies()).get(THEME_COOKIE_NAME);
    const theme = (savedTheme?.value || 'light') as Theme;
    const themeStyles =
        theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    return (
      <RespectMotionPreferences>
        <html
            lang="en"
            className={clsx(mainFont.variable, monoFont.variable)}
            data-color-theme={theme}
            style={themeStyles}
        >
        <body>
        <Header theme={theme}/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
      </RespectMotionPreferences>
  );
}

export default RootLayout;
