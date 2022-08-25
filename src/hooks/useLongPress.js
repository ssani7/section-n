import React, { useRef, useState } from 'react';

const useLongPress = () => {
    const [action, setAction] = useState('');

    const timerRef = useRef();
    const isLongPress = useRef(false);

    function handleOnClick() {
        if (isLongPress.current) {
            setAction("longpress");
        }
        else {
            setAction("click");
        }
    }
    function handleOnMouseUp() {
        clearTimeout(timerRef.current);
        setAction("");

    }
    function handleOnMouseDown() {
        setTimer();
    }
    function handleOnTouchStart() {
        setTimer();
    }
    function handleOnTouchEnd() {
        clearTimeout(timerRef.current);
        setAction("");
    }

    function setTimer() {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction("longpress");
        }, 500);
    }

    return {
        action,
        handlers: {
            onClick: handleOnClick,
            onMouseUp: handleOnMouseUp,
            onMouseDown: handleOnMouseDown,
            onTouchStart: handleOnTouchStart,
            onTouchEnd: handleOnTouchEnd
        }
    }
};

export default useLongPress;