import { createClient } from '@/lib/supabase/server';
import RecipeCard from './RecipeCard';
import { Flex, Title } from '@mantine/core';
import { SearchParams } from '@/app/search/page';

export const SearchResults = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const {
    recipeName: search = '',
    ingredients = '',
    savedRecipes = '',
  } = await searchParams;

  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
  const userId = user?.id;
  let query = supabase.from('all_recipies').select('*');
  if (search !== '') query = query.ilike('recipe_name', '%' + search + '%');
  if (ingredients !== '')
    query = query.contains(
      'ingredients',
      ingredients.split(' ').map((i: string) => {
        return i.toLocaleLowerCase();
      })
    );
  if (savedRecipes !== '') {
    let savedRecipeIds: string[] = [];
    if (userId) {
      const { data: userRecipes } = await supabase
        .from('user_recipes')
        .select('saved')
        .eq('id', userId)
        .single();

      if (userRecipes) {
        savedRecipeIds = userRecipes.saved;
      }
      query = query.in('id', savedRecipeIds);
    }
  }
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
      return <Title ml={'md'}> No Results</Title>;
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
