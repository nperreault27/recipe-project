import { AspectRatio, Group, Paper, Skeleton, Stack } from '@mantine/core';
import { Suspense } from 'react';
import SearchBar from './SearchBar';
import RecentlyAdded from './RecentlyAdded';

const HomePage = () => {
  return (
    <Stack w={'100%'}>
      <AspectRatio ratio={16 / 9} flex={'0,0,100%'}>
        <Paper
          withBorder
          style={{
            backgroundSize: 'cover',
            backgroundImage:
              "url('https://lpjqhqphiagelvoacvet.supabase.co/storage/v1/object/public/recipe-images/page_assets/AdobeStock_292203735.jpeg')",
          }}
        >
          <SearchBar />
        </Paper>
      </AspectRatio>
      <Group grow p='0' h={'100%'}>
        <Suspense fallback={<Skeleton w={'100%'} h={300} />}>
          <RecentlyAdded />
        </Suspense>
      </Group>
    </Stack>
  );
};
export default HomePage;
