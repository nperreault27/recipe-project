import { AspectRatio, Group, Paper, Skeleton, Stack } from '@mantine/core';
import FeaturedRecipe from './FeaturedRecipe';
import { Suspense } from 'react';
import { RecipeModal } from './RecipeModal';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <Stack w={'100%'}>
      <AspectRatio ratio={16 / 9} flex={'0,0,100%'}>
        <Paper withBorder bg={'#EEEEEE'}>
          <SearchBar />
          <RecipeModal />
        </Paper>
      </AspectRatio>
      <Group grow p='0' h={'100%'}>
        <Suspense fallback={<Skeleton w={'100%'} h={300} />}>
          <FeaturedRecipe />
        </Suspense>
      </Group>
    </Stack>
  );
};
export default HomePage;
