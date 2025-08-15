import { createClient } from '@/lib/supabase/server';

import RecipeShow from '@/components/RecipeShow';
import NotFound from '@/components/NotFound';

const GetRecipeShow = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const { id, slug: name } = await params;

  const supabase = await createClient();
  //@ts-expect-error this jawn works, just a type error
  const { data: detailedRecipeData, error } = await supabase
    .from('all_recipies')
    .select('*')
    .eq('id', id);

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
