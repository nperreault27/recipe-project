import { createClient } from '@/lib/supabase/server';
import { Autocomplete, Button, Stack, Text, Paper, Group } from '@mantine/core';
import { Search } from 'lucide-react';
//TODO: needs routing to direct to /search
export const SearchBar = async () => {
  const supabase = await createClient();
  const recipeNames = await supabase
    .from('all_recipies')
    .select('recipe_name')
    .then((result) => {
      return result.status === 200
        ? result.data!.map((recipe) => recipe.recipe_name)
        : [];
    });
  return (
    <Stack h={'100%'} align={'center'} justify={'center'} gap={'sm'}>
      <Paper shadow='md' withBorder p={'md'}>
        <Text fs={'xl'} fw={'700'}>
          Search for Your Favorite Recipes:
        </Text>
        <form method='GET' action='/search'>
          <Group gap='xs'>
            <Autocomplete
              w={'250'}
              name='recipeName'
              data={recipeNames}
              radius={'md'}
              withScrollArea
              clearable
              placeholder='What do you want to make today?'
            />
            <Button
              type='submit'
              color={'#ffca64'}
              bd={'1px solid black'}
              radius={'md'}
            >
              <Search />
            </Button>
          </Group>
        </form>
      </Paper>
    </Stack>
  );
};
export default SearchBar;
