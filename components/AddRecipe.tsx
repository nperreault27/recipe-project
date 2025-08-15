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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FieldInputIngredient, Ingredient, Step } from './FieldInputIngredient';
import { createClient } from '@/lib/supabase/client';
import { parseTimeToSeconds } from '@/app/utils/formatTime';
import { UtensilsCrossed } from 'lucide-react';
import { formatCapitalize } from '@/app/utils/formatCapitalize';

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

export const AddRecipe = () => {
  const theme = useMantineTheme();
  const form = useForm<RecipeFormValues>({
    initialValues: {
      name: '',
      time: '',
      ingredients: [
        {
          ingredient: '',
          quantity: '',
          measurement: '',
          key: 'initial-ingredient',
        },
      ],
      steps: [
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

    //@ts-expect-error linting issue with using any type since the fields from table are not partial
    const { error } = await supabase.from('all_recipies').insert([
      {
        recipe_name: name,
        time: parseTimeToSeconds(time),
        ingredients: plainIngredients,
        steps: plainSteps,
      },
    ]);

    ingredientNames
      .filter((iName) => iName.length !== 0)
      .map(async (iName) => {
        const { error: insertIngredientError } = await supabase
          .from('ingredients')
          //@ts-expect-error this jawn works, just a type error
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
      console.error('Error inserting recipe:', error.message);
      alert('Failed to save recipe. Please try again.');
      return;
    }

    window.location.href = window.location.origin;
    form.reset();
  };

  return (
    <Paper radius='md' shadow='md' withBorder bg={'#EEEEEE'} p='xl'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={10}>
          <Title mb={10}>Create Recipe</Title>
          <TextInput
            label='Recipe Name'
            placeholder='e.g. Spaghetti Bolognese'
            withAsterisk
            {...form.getInputProps('name')}
          />

          <TextInput
            label='Time to Make'
            placeholder='e.g. 45 minutes'
            {...form.getInputProps('time')}
          />

          <FieldInputIngredient form={form} />

          <Divider mt={'lg'} />

          <Group justify='center' mt='lg'>
            <Button
              bg={theme.colors.myGreen[8]}
              type='submit'
              leftSection={<UtensilsCrossed size={'20'} />}
            >
              Create Recipe
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
