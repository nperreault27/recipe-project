import { createClient } from '@/lib/supabase/server';
import RecipeCard from './RecipeCard';
import { Flex } from '@mantine/core';

export const SearchResults = async ({ searchParams }) => {
  const search = (await searchParams).value.toString();
  const supabase = await createClient();
  const { data: recipes = [], error } = await supabase
    .from('all_recipies')
    .select('*')
    .ilike('recipe_name', '%' + search + '%');
  const count = recipes ? recipes.length : 0;
  const dataDisplay = () => {
    if (!count || error) {
      return <div> no results</div>;
    }
    return recipes!.map((recipe) => (
      <RecipeCard key={recipe.id} data={recipe} />
    ));
  };

  return (
    <Flex gap={'sm'} justify={'flex-start'} wrap={'wrap'}>
      {dataDisplay()}
    </Flex>
  );
};
export default SearchResults;
