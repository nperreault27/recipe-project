import { AspectRatio, Flex, Group, Paper, Stack } from '@mantine/core';
import RandomRecipe from './RandomRecipe';
import FeaturedRecipe from './FeaturedRecipe';

const HomePage = () => {
  return (
    <Stack w={'100%'}>
      <AspectRatio ratio={16 / 9} flex={'0,0,100%'}>
        <Paper withBorder bg={'#EEEEEE'}>
          <Flex h={'100%'} align={'center'} justify={'center'}>
            Search for Your Favorite Recipes:
            <br />
            (Insert Search element here)
          </Flex>
        </Paper>
      </AspectRatio>
      <Group grow p='0' h={'100%'}>
        <RandomRecipe />
        <FeaturedRecipe />
      </Group>
    </Stack>
  );
};
export default HomePage;
