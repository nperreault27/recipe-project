import { createClient } from '@/lib/supabase/server';
import RecipeCard from './RecipeCard';
import { Flex } from '@mantine/core';

export const SearchResults = async ({
  searchParams,
}: {
  searchParams: { recipeName: string; ingredients: string };
}) => {
  const { recipeName: search = '', ingredients = '' } = await searchParams;

  const supabase = await createClient();
  let query = supabase.from('all_recipies').select('*');
  if (search !== '') query = query.ilike('recipe_name', '%' + search + '%');
  if (ingredients !== '')
    query = query.contains(
      'ingredients',
      ingredients.split(' ').map((i: string) => {
        return i.toLocaleLowerCase();
      })
    );
  const recipes = await query.then((results) => {
    if (results.status === 200) {
      console.log(results.data);
      return results.data;
    }
    console.log(results);
    return [];
  });
  const count = recipes ? recipes.length : 0;
  const dataDisplay = () => {
    if (!count) {
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
