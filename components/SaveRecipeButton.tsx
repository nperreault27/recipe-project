'use client';

import { createClient } from '@/lib/supabase/client';
import { Button, useMantineTheme } from '@mantine/core';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SaveRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const theme = useMantineTheme();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const getId = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user!.id);
      }
      setIsLoading(false);
    };
    getId();
  }, [supabase.auth]);

  useEffect(() => {
    if (userId) {
      setSavedRecipes();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSavedRecipes = async () => {
    const { data: userRecipes, error } = await supabase
      .from('user_recipes')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      alert(error.message);
      return;
    } else {
      setIsSaved(userRecipes.saved.includes(recipeId));
    }
  };

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoading) return;

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
        if (error) {
          alert(error.message);
          return;
        }

        const incrementedSavedList = currUserRecipes.saved.concat(recipeId);

        const { error: failedUpdate } = await supabase
          .from('user_recipes')
          .update({ saved: incrementedSavedList })
          .eq('id', userId);

        if (failedUpdate) {
          alert(failedUpdate.message);
          return;
        }
      } else {
        setIsSaved(false);

        const { data: currUserRecipes, error } = await supabase
          .from('user_recipes')
          .select('*')
          .eq('id', userId)
          .single();
        if (error) {
          alert(error.message);
          return;
        }

        const decrementedSavedList = currUserRecipes.saved.filter(
          (idToRemove: string) => idToRemove !== recipeId
        );

        const { error: failedUpdate } = await supabase
          .from('user_recipes')
          .update({ saved: decrementedSavedList })
          .eq('id', userId);
        if (failedUpdate) {
          alert(failedUpdate.message);
          return;
        }
      }
    }
  };

  return (
    <Button
      c={theme.colors.myGreen[4]}
      variant='transparent'
      onClick={handleClick}
      disabled={isLoading}
      style={{
        // a bit ugly here but prevents user redirecting to login when they are signed in and quickly click the save recipe button
        backgroundColor: 'transparent',
        opacity: isLoading ? 0.1 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {!isSaved ? <Bookmark /> : <BookmarkCheck />}
    </Button>
  );
};
export default SaveRecipeButton;
