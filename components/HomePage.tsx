import { AspectRatio, Group, Paper, Stack } from '@mantine/core';
import RandomRecipe from './RandomRecipe';
import FeaturedRecipe from './FeaturedRecipe';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <Stack w={'100%'}>
      <AspectRatio ratio={16 / 9} flex={'0,0,100%'}>
        <Paper withBorder bg={'#EEEEEE'}>
          <SearchBar />
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
