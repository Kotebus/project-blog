import {Id} from "@/Types/IdType";
import {motion} from "motion/react";
import styles from "@/components/DivisionGroupsDemo/DivisionGroupsDemo.module.css";
import React from "react";

function MotionItem({layoutId} :  {layoutId: Id}) {
    return (
        <motion.div
            transition={{
                type: 'spring',
                stiffness: 350,
                damping: 30,
            }}
            layoutId={layoutId}
            className={styles.item}
        />
    );
}

export default MotionItem;