import { Center, Group, Paper, Stack } from '@mantine/core';
import RecipeCard from './RecipeCard';
import { createClient } from '@/lib/supabase/server';

export const FeaturedRecipe = async () => {
  const supabase = await createClient();
  const { data: featuredRecipeData = [] } = await supabase
    .from('all_recipies')
    .select('*')
    .limit(2);
  return (
    <Stack miw={275}>
      <Paper shadow='md' withBorder>
        <Center c={'white'} fs={'lg'} fw={'700'} bg={'#309553'}>
          Featured Recipes
        </Center>
      </Paper>
      <Group grow p='0' justify='center'>
        {featuredRecipeData?.map((recipeData) => {
          return <RecipeCard key={recipeData.id} data={recipeData} />;
        })}
      </Group>
    </Stack>
  );
};
export default FeaturedRecipe;
