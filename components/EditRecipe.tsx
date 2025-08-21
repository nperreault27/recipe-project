import { createClient } from '@/lib/supabase/server';
import { AddRecipe } from './AddRecipe';

export const EditRecipe = async({ id }: { id: string }) => {

 const supabase = await createClient();
      const { data, error } = await supabase
        .from('all_recipies')
        .select('*')
        .eq('id', id)
        .single();
      if (error && data) {
        return <div>Error loading recipe: {error}</div>;
      }

  return <AddRecipe initialRecipe={data} isEditMode={true} />;
};

export default EditRecipe;
