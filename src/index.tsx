import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode';

import { config } from './utils/config';
import { Home } from './components/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root')!;

// up to you to gaurd this for nonprod use only


(async () => {

    // for local dev with esbuild and watch server
    const activeConfig = await config();
    if (activeConfig.ENV == 'DEV'){
        new EventSource('/esbuild').addEventListener('change', () => location.reload());
    }
    


    createRoot(root).render(
        <QueryClientProvider client={new QueryClient()}>
            <ChakraProvider value={defaultSystem}>
                <ColorModeProvider>
                    <BrowserRouter>
                        <Home />
                    </BrowserRouter>
                </ColorModeProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
})()