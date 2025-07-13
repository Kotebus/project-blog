'use client';
import React from 'react';
import clsx from 'clsx';
import {LayoutGroup, motion } from 'motion/react';

import { range } from '@/utils';
import Card from '@/components/Card';
import SliderControl from '@/components/SliderControl';

import Equation from './Equation';
import styles from './DivisionGroupsDemo.module.css';

interface DivisionGroupsDemoProps {
    numOfItems?: number;
    initialNumOfGroups?: number;
    includeRemainderArea: boolean;
}

type Id = string;

interface GridProps {
    items: Id[];
    numOfGroups: number;
    numOfItemsPerGroup: number;
}

function Grid({items, numOfGroups, numOfItemsPerGroup}: GridProps) {
    let internalIndex = 0;

    const motionDivsArray = range(numOfGroups).map((groupIndex) => (
        <div key={groupIndex} className={styles.group}>
            {range(numOfItemsPerGroup).map(() => {
                const id = items[internalIndex];
                console.log(internalIndex);
                internalIndex++;
                return (
                    <motion.div
                        transition={{
                            type: 'spring',
                            stiffness: 350 - (internalIndex - 1) * 15,
                            damping: 30,
                        }}
                        layoutId={id}
                        key={id}
                        className={styles.item}
                    >
                        {id}
                    </motion.div>
                );
            })}
        </div>
    ));
    return <LayoutGroup>{motionDivsArray}</LayoutGroup>;
}

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}: DivisionGroupsDemoProps) {

    const [items] = React.useState(
        () => range(numOfItems).map(
            () => crypto.randomUUID() as Id
        )
    );

    const [numOfGroups, setNumOfGroups] = React.useState(
        initialNumOfGroups
    );

    const numOfItemsPerGroup = Math.floor(
        numOfItems / numOfGroups
    );

    const remainder = includeRemainderArea
        ? numOfItems % numOfGroups
        : null;

    // When we're splitting into 1-3 groups, display side-by-side
    // columns. When we get to 4, it should switch to a 2x2 grid.
    const gridStructure =
        numOfGroups < 4
            ? {
                gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
            }
            : {
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
            };

    return (
        <Card as="section" className={styles.wrapper}>
            <header className={styles.header}>
                <SliderControl
                    label="Number of Groups"
                    className={styles.slider}
                    step={1}
                    min={1}
                    max={4}
                    value={numOfGroups}
                    onChange={(ev) =>
                        setNumOfGroups(Number(ev.target.value))
                    }
                />
            </header>

            <div className={styles.demoWrapper}>
                <div
                    className={clsx(styles.demoArea)}
                    style={gridStructure}
                >
                    <Grid
                        items={items}
                        numOfGroups={numOfGroups}
                        numOfItemsPerGroup={numOfItemsPerGroup}
                    />
                </div>
            </div>

            {includeRemainderArea && (
                <div className={styles.remainderArea}>
                    <p className={styles.remainderHeading}>
                        Remainder Area
                    </p>

                    {range(remainder).map((index) => {
                        return (
                            <div key={index} className={styles.item}/>
                        );
                    })}
                </div>
            )}

            <Equation
                dividend={numOfItems}
                divisor={numOfGroups}
                remainder={remainder}
            />
        </Card>
    );
}

export default DivisionGroupsDemo;
