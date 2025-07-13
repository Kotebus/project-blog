'use client';

import {PropsWithChildren} from 'react';
import { MotionConfig } from 'motion/react';

function RespectMotionPreferences({ children }: PropsWithChildren) {
    return (
        <MotionConfig reducedMotion="user">
            {children}
        </MotionConfig>
    );
}

export default RespectMotionPreferences;