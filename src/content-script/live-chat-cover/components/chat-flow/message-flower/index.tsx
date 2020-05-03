import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
} from 'react';

import classes from './index.scss';
import { useRect } from '../../../hooks/use-rect';
import { ChatItem } from '../../../../services/chat-event/models';

interface Props {
    children: React.ReactNode;
    timeout: number;
    chatItem: ChatItem;
    onTimeout: (chatItem: ChatItem) => void;
    containerWidth: number;
    lineHeight: number;
}

export default function MessageFlower({
    children,
    timeout,
    chatItem,
    onTimeout,
    containerWidth,
    lineHeight,
}: Props): JSX.Element {
    const [isFlowing, setIsFlowing] = useState(false);

    const ref = useRef(null);

    const rect = useRect(ref);

    const style = useMemo<React.CSSProperties>(
        () => ({
            transitionDuration: `${timeout}ms`,
            left: containerWidth || 99999,
            fontSize: lineHeight,
            transform: isFlowing
                ? `translateX(-${containerWidth + rect.width}px)`
                : 'translateX(0)',
        }),
        [containerWidth, isFlowing, rect.width, timeout, lineHeight],
    );

    const onTimeoutCallback = useCallback(() => {
        onTimeout(chatItem);
    }, [onTimeout, chatItem]);

    useEffect(() => {
        const id = setTimeout(onTimeoutCallback, timeout);
        return (): void => clearTimeout(id);
    }, [onTimeoutCallback, timeout]);

    useLayoutEffect(() => setIsFlowing(true), []);

    return (
        <div className={classes.container} style={style} ref={ref}>
            {children}
        </div>
    );
}
