import React, {useCallback} from "react";
import {range} from "@/utils";
import MotionItem from '@/components/DivisionGroupsDemo/MotionItem';

function useNextMotionItem({numOfItems}: {numOfItems: number}) {
    const indexRef = React.useRef(0);

    const [items] = React.useState(
        () => range(numOfItems).map(
            () => {
                const key = 'id-' + crypto.randomUUID();
                return (<MotionItem key={key} layoutId={key}/>);
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