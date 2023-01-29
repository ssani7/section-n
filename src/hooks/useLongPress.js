import { useRef, useState } from 'react';

const useLongPress = ({ onClick }) => {
    const [action, setAction] = useState('');
    const [id, setId] = useState('');

    const timerRef = useRef();
    const isLongPress = useRef(false);


    function handleOnClick(_id) {
        if (isLongPress.current) return setAction("LongPress")

        if (typeof onClick === 'function') onClick()
    }
    function handleOnMouseUp(_id) {
        clearTimeout(timerRef.current);
    }

    function handleOnMouseDown(_id) {
        setTimer(_id, true);
    }
    function handleOnTouchStart(_id) {
        setTimer(_id, true);
    }
    function handleOnTouchEnd() {
        clearTimeout(timerRef.current);
    }

    function setTimer(_id, task, time = 300) {
        isLongPress.current = !task;
        timerRef.current = setTimeout(() => {
            isLongPress.current = task;
            setAction(task ? "LongPress" : "")
            setId(_id)
        }, time);
    }

    return {
        action,
        id,
        setAction,
        handleOnClick,
        handleOnMouseUp,
        handleOnMouseDown,
        handleOnTouchStart,
        handleOnTouchEnd
    }
};

export default useLongPress;