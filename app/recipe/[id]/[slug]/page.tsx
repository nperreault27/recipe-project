import { createClient } from '@/lib/supabase/server';

import RecipeShow from '@/components/RecipeShow';
import NotFound from '@/components/NotFound';

const GetRecipeShow = async ({ params }: { params: Promise<{ id: string, slug: string }> }) => {
    const { id, slug: name } = await params;
    
    const supabase = await createClient();
    const { data: detailedRecipeData = {}, error } = await supabase
        .from('all_recipies')
        .select('*')
        .filter('id', 'in', `(${id})`)
        .single();

    if (error) return <NotFound error ={`Cannot retrieve the data of '${name}' with id '${id}'.`} />;

    return (
        <RecipeShow data={detailedRecipeData} />
    );
};

export default GetRecipeShow;