import { createClient } from '@/lib/supabase/server';
import RecipeCard from './RecipeCard';

export const SearchResults = async ({ searchParams }) => {
  const search = (await searchParams).value.toString();
  const supabase = await createClient();

  const { count } = await supabase
    .from('all_recipies')
    .select('*', { count: 'exact' })
    .ilike('recipe_name', '%' + search + '%');
  const dataDisplay = async () => {
    if (!count) {
      return <div> no results</div>;
    }
    const { data: recipes = [] } = await supabase
      .from('all_recipies')
      .select('*')
      .ilike('recipe_name', '%' + search + '%');

    return recipes?.map((recipe) => (
      <RecipeCard key={recipe.id} data={recipe} />
    ));
  };
  return await dataDisplay();
};
export default SearchResults;
