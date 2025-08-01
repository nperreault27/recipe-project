'use client'
import {
  Modal,
  Button,
  TextInput,
  MultiSelect,
  Group,
  Stack,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { FieldInputIngredient } from './FieldInputIngredient';

type RecipeFormValues = {
  name: string;
  time: string;
  ingredients: string[];
};

export const RecipeModal = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [steps, setSteps] = useState<string[]>(['']);

  const form = useForm<RecipeFormValues>({
    initialValues: {
      name: '',
      time: '',
      ingredients: [],
    },

    validate: {
      name: (value) => (value.trim() === '' ? 'Recipe name is required' : null),
      ingredients: (value) =>
        value.length === 0 ? 'Please add at least one ingredient' : null,
    },
  });

  const handleSubmit = (values: RecipeFormValues) => {
    const validSteps = steps.filter((step) => step.trim() !== '');
    if (validSteps.length === 0) {
      alert('Please add at least one step.');
      return;
    }

    const recipe = {
      ...values,
      steps: validSteps,
    };

    // Reset
    setOpened(false);
    form.reset();
    setSteps(['']);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Recipe"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Recipe Name"
              placeholder="e.g. Spaghetti Bolognese"
              withAsterisk
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Time to Make"
              placeholder="e.g. 45 minutes"
              {...form.getInputProps('time')}
            />
            <FieldInputIngredient/>
            <Group align="right" mt="md">
              <Button type="submit">Submit Recipe</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button onClick={() => setOpened(true)}>Add Recipe</Button>
    </>
  );
};
