import React, { useState } from 'react';
import { ColorModeButton, useColorMode } from './ui/color-mode';


export const Banner = () => {

    const useColor = useColorMode();
    const [count, setCount] = useState(0);


    btoa

    return (
        <>
            <h1>Hello</h1>
            <p>{count}</p>
            <ColorModeButton />
        </>
    )
}