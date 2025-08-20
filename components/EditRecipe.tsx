'use client'
import { useEffect, useState } from 'react';
import { Recipe } from '@/app/types/index';
import { createClient } from '@/lib/supabase/client';
import { AddRecipe } from './AddRecipe';

export const EditRecipe = ({ id }: { id: string }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('all_recipies')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        setRecipe(data);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return <AddRecipe initialRecipe={recipe} isEditMode={true} />;
};

export default EditRecipe;
