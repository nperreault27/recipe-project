'use client';

import {
    Card,
    Title,
    Text,
    Group,
    Button
} from '@mantine/core';

import Link from 'next/link';

const NotFound = ( { id, slug: name, error }: { id: string, slug: string, error: string } ) => {
    return (
         <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={1} style={{ color: "#FA5252" }}>404</Title>
            <Text size='xl' fw={500}>
                {error}</Text>
            <Group>
            <Link href="/" >
                <Button variant="filled" color="#DAF3E2" size="md" radius="xs">
                    Return Home</Button>
            </Link>
            <Link href={`/recipe/${id}/${name}`} >
                <Button variant="filled" color="#DAF3E2" size="md" radius="xs">
                    Load Recipe Again</Button>
            </Link>
            </Group>
        </Card>
    );
}

export default NotFound;