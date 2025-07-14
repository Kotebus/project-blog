'use client'
import React, {useEffect, useId} from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion } from 'framer-motion';
import {LayoutGroup} from "motion/react";
import {takeItemFromArrayCircular} from "@/utils";

interface IColor {
  label: string;
  value: string;
}

const COLORS: IColor[] = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const layoutId = useId();

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout;
    if (isRunning)
      intervalId = setInterval(() => setTimeElapsed(x => x + 1), 1000);
    else
      setTimeElapsed(0);

    return () => {
      setTimeElapsed(0);
      clearInterval(intervalId);
    }
  }, [isRunning]);


  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = takeItemFromArrayCircular(COLORS, timeElapsed);

  return (
      <LayoutGroup>
        <Card as="section" className={styles.wrapper}>
          <ul className={styles.colorsWrapper}>
            {COLORS.map((color, index) => {
              const isSelected = color.value === selectedColor.value;

              return (
                  <li
                      className={styles.color}
                      key={index}
                  >
                    {isSelected && (
                        <motion.div
                            layoutId={layoutId}
                            className={
                              styles.selectedColorOutline
                            }
                        />
                    )}
                    <div
                        className={clsx(
                            styles.colorBox,
                            isSelected &&
                            styles.selectedColorBox
                        )}
                        style={{
                          backgroundColor: color.value,
                        }}
                    >
                      <VisuallyHidden>
                        {color.label}
                      </VisuallyHidden>
                    </div>
                  </li>
              );
            })}
          </ul>

          <div className={styles.timeWrapper}>
            <dl className={styles.timeDisplay}>
              <dt>Time Elapsed</dt>
              <dd>{timeElapsed}</dd>
            </dl>
            <div className={styles.actions}>
              <button onClick={() => setIsRunning(x=> !x)}>
                {isRunning ? <Pause/> : <Play/>}
                <VisuallyHidden>Play</VisuallyHidden>
              </button>
              <button onClick={() => {
                setIsRunning(false);
                setTimeElapsed(0);
              }}>
                <RotateCcw/>
                <VisuallyHidden>Reset</VisuallyHidden>
              </button>
            </div>
          </div>
        </Card>
      </LayoutGroup>
  );
}

export default CircularColorsDemo;
