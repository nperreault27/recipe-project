import { createClient } from '@/lib/supabase/server';

import RecipeShow from '@/components/RecipeShow';
import NotFound from '@/components/NotFound';
import { Recipe } from '@/app/types';

const GetRecipeShow = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const { id, slug: name } = await params;

  const supabase = await createClient();
  const { data: detailedRecipeData, error } = (await supabase
    .from('all_recipies')
    .select('*')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq('id', id)) as { data: Recipe[]; error: any };

  if (error)
    return (
      <NotFound
        id={id}
        slug={name}
        error={`Cannot retrieve the data of '${name}' with id '${id}'.`}
      />
    );

  return <RecipeShow data={detailedRecipeData[0]} />;
};

export default GetRecipeShow;
