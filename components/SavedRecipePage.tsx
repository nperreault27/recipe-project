'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Stack, Title, Text, Paper, Skeleton, Button, Group } from '@mantine/core';
import { Recipe } from '@/app/types/index'; 
import RecipeShow from './RecipeShow'; 
import Link from 'next/link';

const SavedRecipePage = () => {
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const userRes = await supabase.auth.getUser();
      const user = userRes.data.user;

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: savedData, error: savedError } = await supabase
        .from('user_recipes')
        .select('saved')
        .eq('id', user.id)
        .single();

      if (savedError || !savedData?.saved?.length) {
        setLoading(false);
        return;
      }

      const { data: recipes, error: recipesError } = await supabase
        .from('all_recipies')
        .select('*')
        .in('id', savedData.saved);

      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
        setLoading(false);
        return;
      }

      setSavedRecipes(recipes as Recipe[]);
      setLoading(false);
    };

    fetchSavedRecipes();
  }, [supabase]);

  if (loading) {
    return (
      <Stack>
        <Skeleton height={40} width="60%" />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </Stack>
    );
  }

  if (!userId) {
    return <Text>Please log in to view your saved recipes.</Text>;
  }

  if (savedRecipes.length === 0) {
    return <Text>You haven't saved any recipes yet.</Text>;
  }

  return (
    <Stack>
      <Title order={2}>Your Saved Recipes</Title>
      {savedRecipes.map((recipe) => (
        <Paper key={recipe.id} p="md" shadow="sm" withBorder>
          <Group justify="space-between">
            <Text fw={600} size="lg">
              {recipe.recipe_name}
            </Text>
            <Link href={`/recipe/${recipe.id}/${recipe.recipe_name}`}>
              <Button variant="light" color="green">
                View Recipe
              </Button>
            </Link>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
};

export default SavedRecipePage;
