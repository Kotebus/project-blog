import {Id} from "@/Types/IdType";
import {motion} from "motion/react";
import styles from "@/components/DivisionGroupsDemo/DivisionGroupsDemo.module.css";
import React from "react";

function MotionItem({layoutId, internalIndex = 1} :  {layoutId: Id, internalIndex?: number}) {
    return (
        <motion.div
            transition={{
                type: 'spring',
                stiffness: 350 - (internalIndex - 1) * 15,
                damping: 30,
            }}
            layoutId={layoutId}
            className={styles.item}
        />
    );
}

export default MotionItem;