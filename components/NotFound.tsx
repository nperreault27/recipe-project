'use client';

import {
    Title,
    Text,
    Button
} from '@mantine/core';

import Link from 'next/link';

const NotFound = ( { error }: { error: string } ) => {
    return (
        <div>
            <Title order={1} style={{ color: "#FA5252" }}>404</Title>
            <Text size='xl' fw={500}>
                {error}</Text>
            <Link href="/" >
                <Button variant="filled" color="#DAF3E2" size="md" radius="xs">
                    Return Home</Button>
            </Link>
        </div>
    );
}

export default NotFound;