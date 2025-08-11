'use client';

import { createClient } from '@/lib/supabase/client';
import { Button, useMantineTheme } from '@mantine/core';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';

export const SaveRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const theme = useMantineTheme();
  const [saved, isSaved] = useState(false);
  const [userId, setUserId] = useState('');
  const supabase = createClient();

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      data: { user: currUser },
    } = await supabase.auth.getUser();
    if (!currUser) {
      window.location.href = window.location.origin + '/login';
    } else {
      setUserId(currUser?.id || '');
      console.log("Current uid", currUser.id);
        !saved ? isSaved(true) : isSaved(false);
    }

    const { data: savedRecipes, error: failedToSave } = await supabase
      .from('user_recipes')
      .update('saved')
      .eq('id', userId)
      .select('saved');

    // const newSaved = savedRecipes;
    // newSaved?[userId] : recipeId;

    if (failedToSave) alert(failedToSave.message);
    else {
    }
    //COOKED
    console.log("Recipe ID: ", recipeId);
    console.log("List of saved recipe IDs", savedRecipes);
    // savedRecipes?[userId] : recipeId;
    // console.log(savedRecipes);
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
      {!saved ? <Bookmark /> : <BookmarkCheck />}
    </Button>
  );
};
export default SaveRecipeButton;
