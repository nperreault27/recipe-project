'use client';

import { Center, Loader } from '@mantine/core';

const LoadingPage = () => { 
    return (
        <Center maw={400} h={100} mx="auto" mt={200}>
            <Loader color="#DAF3E2" size="xl" />
        </Center>
    )
};

export default LoadingPage;

