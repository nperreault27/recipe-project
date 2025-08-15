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

  const recipeSet = new Set();
  recipeNames.map((rName) => recipeSet.add(rName));

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
                data={[...recipeSet]}//type pain
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
            {/*I have OCD*/}
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
