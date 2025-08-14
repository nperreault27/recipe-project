'use client';
import { Button, TextInput, Group, Stack, Paper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FieldInputIngredient, Ingredient, Step } from './FieldInputIngredient';
import { createClient } from '@/lib/supabase/client';
import { parseTimeToSeconds } from '@/app/utils/formatTime';

type RecipeFormValues = {
  name: string;
  time: string;
  ingredients: Ingredient[];
  steps: Step[];
};
const loginPageUrl = '/login';

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
  const form = useForm<RecipeFormValues>({
    initialValues: {
      name: '',
      time: '',
      ingredients: [
        {
          ingredient: 'Flour',
          quantity: '2',
          measurement: 'cups',
          key: 'initial-ingredient',
        },
      ],
      steps: [
        {
          instruction: 'Preheat the oven to 350°F (175°C)',
          key: 'initial-step',
        },
      ],
    },
    validate: {
      name: (value) => (value.trim() === '' ? 'Recipe name is required' : null),
      ingredients: (value) =>
        value.length === 0 ? 'Please add at least one ingredient' : null,
      steps: (value) =>
        value.length === 0 ? 'Please add at least one step' : null,
    },
  });

  const handleSubmit = async (values: RecipeFormValues) => {
    const { name, ingredients, steps, time } = values;

    const supabase = createClient();

    const plainIngredients = ingredients.map((i) => formatIngredient(i));

    const plainSteps = steps.map((s) => s.instruction.trim());

    const { error } = await supabase.from('all_recipies').insert([
      {
        recipe_name: name,
        time: parseTimeToSeconds(time),
        ingredients: plainIngredients,
        steps: plainSteps,
      },
    ]);

    if (error) {
      console.error('Error inserting recipe:', error.message);
      alert('Failed to save recipe. Please try again.');
      return;
    }

    form.reset();
    window.location.href = window.location.origin;
  };

  return (
    <Paper radius='md' shadow='md' withBorder bg={'#EEEEEE'} p='xl'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Title>Create Recipe</Title>
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

          <Group align='right' mt='md'>
            <Button type='submit'>Submit Recipe</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
