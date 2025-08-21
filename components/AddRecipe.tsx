'use client';

import {
  Button,
  TextInput,
  Group,
  Stack,
  Paper,
  Title,
  useMantineTheme,
  Divider,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FieldInputIngredient, Ingredient, Step } from './FieldInputIngredient';
import { createClient } from '@/lib/supabase/client';
import { parseTimeToSeconds } from '@/app/utils/formatTime';
import { UtensilsCrossed } from 'lucide-react';
import { formatCapitalize } from '@/app/utils/formatCapitalize';
import { Recipe } from '@/app/types/index';
import {formatTime} from "@/app/utils/formatTime";
import { useEffect, useState } from 'react';

type RecipeFormValues = {
  name: string;
  time: string;
  ingredients: Ingredient[];
  steps: Step[];
};

function formatIngredient(ingredient: {
  quantity?: number | string;
  measurement?: string;
  ingredient: string;
}): string {
  const parts: string[] = [];

  if (ingredient.quantity) {
    parts.push(String(ingredient.quantity));
  }

  if (ingredient.measurement) {
    parts.push(ingredient.measurement);
  }

  if (parts.length > 0) {
    parts.push('of');
  }

  parts.push(ingredient.ingredient.trim());

  return parts.join(' ');
}

export const AddRecipe = ({
  initialRecipe,
  isEditMode = false,
}: {
  initialRecipe?: Recipe;
  isEditMode?: boolean;
}) => {
  const theme = useMantineTheme();
  const form = useForm<RecipeFormValues>({
    initialValues: {
      name: initialRecipe ? initialRecipe.recipe_name : '',
      time: initialRecipe && initialRecipe.time ? formatTime(initialRecipe.time) : '',
      ingredients: initialRecipe
        ? initialRecipe.ingredients.map((ingredientStr, index) => {
            const regex = /^(\d+(?:\.\d+)?)?\s*(\w+)?\s*of\s*(.+)$/i;
            const match = regex.exec(ingredientStr.trim());
            let quantity = '', measurement = '', ingredient = '';
            if (match) {
              quantity = match[1] || '';
              measurement = match[2] || '';
              ingredient = match[3] || '';
            } else {
              ingredient = ingredientStr;
            }
            return {
              ingredient,
              quantity,
              measurement,
              key: `ingredient-${index}`,
            };
          })
        : [
            {
              ingredient: '',
              quantity: '',
              measurement: '',
              key: 'initial-ingredient',
            },
          ],
      steps: initialRecipe
        ? initialRecipe.steps.map((instruction, index) => ({
            instruction,
            key: `step-${index}`,
          }))
        : [
            {
              instruction: '',
              key: 'initial-step',
            },
          ],
    },
    validate: {
      name: (value) => (value.trim() === '' ? 'Recipe name is required' : null),
      ingredients: (list) =>
        list.some((i) => i.ingredient.trim().length > 0)
          ? null
          : 'Please add at least one ingredient',
      steps: (value) =>
        value.some((val) => val.instruction.trim().length > 0)
          ? null
          : 'Please add at least one step',
    },
  });

  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [userCheckComplete, setUserCheckComplete] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setActiveUserId(data.user?.id || null);
      setUserCheckComplete(true);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (values: RecipeFormValues) => {
    const { name, ingredients, steps, time } = values;
    const supabase = createClient();
    const plainIngredients = ingredients
      .filter((i) => i.ingredient !== '')
      .map((i) => formatIngredient(i));
    const ingredientNames = ingredients.map((i) => i.ingredient);
    const plainSteps = steps
      .filter((s) => s.instruction !== '')
      .map((s) => s.instruction.trim());

    let error;
    if (isEditMode && initialRecipe) {
      const { error: updateError } = await supabase
        .from('all_recipies')
        .update({
          recipe_name: name,
          time: parseTimeToSeconds(time),
          ingredients: plainIngredients,
          steps: plainSteps,
        })
        .eq('id', initialRecipe.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('all_recipies').insert([
        {
          recipe_name: name,
          time: parseTimeToSeconds(time),
          ingredients: plainIngredients,
          steps: plainSteps,
        },
      ]);
      error = insertError;
    }

    ingredientNames
      .filter((iName) => iName.length !== 0)
      .map(async (iName) => {
        const { error: insertIngredientError } = await supabase
          .from('ingredients')
          .insert(formatCapitalize(iName));
        if (insertIngredientError) {
          if (
            insertIngredientError.message.includes(
              'duplicate key value violates unique constraint'
            )
          ) {
            return;
          } else {
            alert(insertIngredientError.message);
          }
        }
      });

    if (error) {
      alert('Failed to save recipe. Please try again.');
      return;
    }

    window.location.href = window.location.origin;
    form.reset();
  };

  const handleDelete = async () => {
    if (!initialRecipe) return;
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('all_recipies')
      .delete()
      .eq('id', initialRecipe.id);

    if (error) {
      alert('Error deleting recipe: ' + error.message);
    } else {
      window.location.href = window.location.origin;
    }
  };
  const isCreator = initialRecipe?.user_id === activeUserId;
  if (!isCreator && isEditMode && userCheckComplete) {
    window.location.href = window.location.origin + '/recipe/' + initialRecipe?.id + '/' + initialRecipe?.recipe_name
    return <>No permission</>
  }
  else if(!userCheckComplete){
    return <>Loading...</>
  }

  return (
    <Paper radius='md' shadow='md' withBorder bg={'#EEEEEE'} p='xl'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={10}>
          <Title mb={10}>{isEditMode ? 'Edit Recipe' : 'Create Recipe'}</Title>
          <TextInput
            label={isEditMode ? 'Edit Recipe Name' : 'Recipe Name'}
            placeholder={isEditMode ? 'Edit the name...' : 'e.g. Spaghetti Bolognese'}
            withAsterisk
            {...form.getInputProps('name')}
          />

          <TextInput
            label={isEditMode ? 'Edit Time to Make' : 'Time to Make'}
            placeholder={isEditMode ? 'Edit the time...' : 'e.g. 45 minutes'}
            {...form.getInputProps('time')}
          />

          <FieldInputIngredient form={form} />

          <Divider mt={'lg'} />

          <Group justify='center' mt='lg'>
            {isEditMode && (!initialRecipe || !userCheckComplete || activeUserId !== initialRecipe.user_id) ? (
              <Text color='red' fw={600} mt={10}>
                You do not have permission to edit this recipe.
              </Text>
            ) : (
              <>
                <Button
                  bg={theme.colors.myGreen[8]}
                  type='submit'
                  leftSection={<UtensilsCrossed size={'20'} />}
                >
                  Update Recipe
                </Button>
                <Button color='red' onClick={handleDelete} ml={10}>
                  Delete Recipe
                </Button>
              </>
            )}
            {!isEditMode && (
              <Button
                bg={theme.colors.myGreen[8]}
                type='submit'
                leftSection={<UtensilsCrossed size={'20'} />}
              >
                Create Recipe
              </Button>
            )}
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
