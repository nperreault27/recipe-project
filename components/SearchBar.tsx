import { createClient } from '@/lib/supabase/server';
import {
  Autocomplete,
  Button,
  Stack,
  Paper,
  Group,
  Anchor,
  Title,
} from '@mantine/core';
import { Search, CirclePlus } from 'lucide-react';

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

  const filteredRecipes = [...new Set(recipeNames)];

  return (
    <Stack h={'100%'} align={'center'} justify={'center'} gap={'md'}>
      <Paper shadow='md' withBorder p={'md'}>
        <Stack align={'center'} gap={'lg'}>
          <Title order={2} fs={'xl'} fw={'700'}>
            Search for Your Favorite Recipes
          </Title>
          <form method='GET' action='/search'>
            <Group gap='xs'>
              <Autocomplete
                w={'300'}
                name='recipeName'
                data={filteredRecipes}
                radius={'md'}
                withScrollArea
                clearable
                placeholder='What do you want to make today?'
                maxDropdownHeight={165}
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
          <Anchor size='sm' c='#3dad62' underline='hover' href='/create-recipe'>
            <Group
              gap='5'
              align='center'
              style={{ transform: 'translateX(-5%)' }}
            >
              <CirclePlus size={12} />
              <span>Create Your Own Recipe</span>
            </Group>
          </Anchor>
        </Stack>
      </Paper>
    </Stack>
  );
};
export default SearchBar;
