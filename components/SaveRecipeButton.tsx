'use client';

import { createClient } from '@/lib/supabase/client';
import { Button, useMantineTheme } from '@mantine/core';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SaveRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const theme = useMantineTheme();
  const supabase = createClient();
  const [userId, setUserId] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user!.id);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      setSavedRecipes();
    }
  }, [userId]);

  const setSavedRecipes = async () => {
    const { data: userRecipes, error } = await supabase
      .from('user_recipes')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      alert(error.message);
    } else {
      setIsSaved(userRecipes.saved.includes(recipeId));
    }
  };

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      window.location.href = window.location.origin + '/login';
      return;
    } else {
      if (!isSaved) {
        setIsSaved(true);

        const { data: currUserRecipes, error } = await supabase
          .from('user_recipes')
          .select('*')
          .eq('id', userId)
          .single();
        if (error) alert(error.message);

        const incrementedSavedList = currUserRecipes.saved.concat(recipeId);

        const { error: failedUpdate } = await supabase
          .from('user_recipes')
          .update({ saved: incrementedSavedList })
          .eq('id', userId);

        if (failedUpdate) alert(failedUpdate.message);
      } else {
        setIsSaved(false);

        const { data: currUserRecipes, error } = await supabase
          .from('user_recipes')
          .select('*')
          .eq('id', userId)
          .single();
        if (error) alert(error.message);

        const decrementedSavedList = currUserRecipes.saved.filter(
          (idToRemove: string) => idToRemove !== recipeId
        );

        const { error: failedUpdate } = await supabase
          .from('user_recipes')
          .update({ saved: decrementedSavedList })
          .eq('id', userId);
        if (failedUpdate) alert(failedUpdate.message);
      }
    }
  };

  return (
    <Button
      c={theme.colors.myGreen[4]}
      pos={'absolute'}
      top={25}
      right={0}
      ml={'auto'}
      variant='transparent'
      onClick={handleClick}
    >
      {!isSaved ? <Bookmark /> : <BookmarkCheck />}
    </Button>
  );
};
export default SaveRecipeButton;
