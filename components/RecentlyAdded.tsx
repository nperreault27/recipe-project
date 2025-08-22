import { Center, Group, Paper, Stack } from '@mantine/core';
import RecipeCard from './RecipeCard';
import { createClient } from '@/lib/supabase/server';

export const RecentlyAdded = async () => {
  const supabase = await createClient();
  const { data: featuredRecipeData = [] } = await supabase
    .from('all_recipies')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <Stack miw={275}>
      <Paper shadow='md' withBorder>
        <Center c={'white'} fs={'lg'} fw={'700'} bg={'#309553'}>
          Recently Added
        </Center>
      </Paper>
      <Group p='0' justify='center'>
        {featuredRecipeData?.map((recipeData) => {
          return <RecipeCard key={recipeData.id} data={recipeData} />;
        })}
      </Group>
    </Stack>
  );
};
export default RecentlyAdded;
