import React, { useState } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    // const currentTheme = ;
    // if (currentTheme) {
    //     setTheme(currentTheme);
    // }
    return [theme, setTheme];
};

export default useTheme;