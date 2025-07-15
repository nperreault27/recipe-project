import { createClient } from '@/lib/supabase/server';
import { Autocomplete, Button, Group, Paper } from '@mantine/core';
import { Search } from 'lucide-react';

export const SearchAndFilterBar = async () => {
  const supabase = await createClient();
  const ingredients = await supabase
    .from('ingredients')
    .select('*')
    .then((result) => {
      return result.status === 200
        ? result.data!.map((ingredient) => ingredient.name)
        : [];
    });
  const recipeNames = await supabase
    .from('all_recipies')
    .select('recipe_name')
    .then((result) => {
      return result.status === 200
        ? result.data!.map((recipe) => recipe.recipe_name)
        : [];
    });
  const submit = async (data) => {
    'use server';
    console.log(data);
  };
  return (
    <Paper w={'100%'} withBorder shadow='md' p={'md'}>
      <form action={submit}>
        <Group justify='space-between' w={'100%'}>
          <Autocomplete
            name='recipeName'
            data={recipeNames}
            radius={'md'}
            w={'250'}
            aria-label='recipe search'
            withScrollArea
            clearable
            placeholder='Search by Recipe Name'
          />
          <Autocomplete
            name='ingredients'
            radius={'md'}
            data={ingredients}
            w={'250'}
            aria-label='ingrediant search'
            withScrollArea
            clearable
            placeholder='Search by Ingredient'
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
  );
};
export default SearchAndFilterBar;
