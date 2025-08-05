'use client';
import { Button, TextInput, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FieldInputIngredient, Ingredient, Step } from './FieldInputIngredient'; 

type RecipeFormValues = {
  name: string;
  time: string;
  ingredients: Ingredient[];
  steps: Step[];
};

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

  const handleSubmit = (values: RecipeFormValues) => {
    console.log("Submitted Recipe:", values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
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
  );
};
