import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-b-2 border-info-content rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;