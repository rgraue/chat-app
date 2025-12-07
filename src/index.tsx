import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Banner } from './components/banner';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode';

import { config } from './utils/config';
import { Home } from './components/home';

const root = document.getElementById('root')!;

// up to you to gaurd this for nonprod use only


(async () => {

    // for local dev with esbuild and watch server
    try {
        new EventSource('/esbuild').addEventListener('change', () => location.reload());
    } catch {}
    

    const activeConfig = await config();


    createRoot(root).render(
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </ColorModeProvider>
        </ChakraProvider>
    )
})()