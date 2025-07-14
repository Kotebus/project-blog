import React, {ComponentType, useCallback} from "react";
import {range} from "@/utils";
import {MotionProps} from "motion/react";

interface MotionItemProps {
    numOfItems: number;
    as: ComponentType<MotionProps>;
}

function useNextMotionItem({numOfItems, as: MotionComponent}: MotionItemProps) {
    const indexRef = React.useRef(0);

    const [items] = React.useState(
        () => range(numOfItems).map(
            () => {
                const key = 'id-' + crypto.randomUUID();
                return (<MotionComponent key={key} layoutId={key}/>);
            }
        )
    );

    return useCallback(() => {
        const motionItem = items[indexRef.current];
        indexRef.current = indexRef.current + 1 === items.length ? 0 : indexRef.current + 1;
        return motionItem;
    }, [items]);
}

export default useNextMotionItem;