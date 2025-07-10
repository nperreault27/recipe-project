import {
  AspectRatio,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
} from '@mantine/core';
import FeaturedRecipe from './FeaturedRecipe';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <Stack w={'100%'}>
      <AspectRatio ratio={16 / 9} flex={'0,0,100%'}>
        <Paper shadow='md' withBorder bg={'#EEEEEE'}>
          <Flex h={'100%'} align={'center'} justify={'center'}>
            Search for Your Favorite Recipes:
            <br />
            (Insert Search element here)
          </Flex>
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
