import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const Dummy = () => {
    const [action, setAction] = useState('');

    const timerRef = useRef();
    const isLongPress = useRef(false);
    console.log(action);

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
    }
    function handleOnMouseDown() {
        setTimer();
    }
    function handleOnTouchStart() {
        setTimer();
    }
    function handleOnTouchEnd() {
        clearTimeout(timerRef.current);
    }

    function setTimer() {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction("longpress");
        }, 500);
    }
    return (
        <div className='cbody bg-base-100'>
            <button
                onClick={handleOnClick}
                onMouseUp={handleOnMouseUp}
                onMouseDown={handleOnMouseDown}
                onTouchStart={handleOnTouchStart}
                onTouchEnd={handleOnTouchEnd}

                className='btn btn-primary'>
                Button
            </button>
        </div>
    );
};

export default Dummy;
