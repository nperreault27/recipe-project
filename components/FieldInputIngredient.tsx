import { useEffect, useRef, useState } from 'react';
import {
  Group,
  TextInput,
  Textarea,
  Button,
  Center,
  Autocomplete,
  Loader,
  Divider,
  Title,
  Stack,
  Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { createClient } from '@/lib/supabase/client';

const SUGGESTED_MEASUREMENTS = [
  'tsp',
  'tbsp',
  'cups',
  'grams',
  'ml',
  'liters',
  'oz',
];
export type Ingredient = {
  ingredient: string;
  quantity: string;
  measurement: string;
  key: string;
};

export type Step = {
  instruction: string;
  key: string;
};

export type RecipeFormValues = {
  name: string;
  time: string;
  ingredients: Ingredient[];
  steps: Step[];
};
type FieldInputIngredientProps = {
  form: ReturnType<typeof useForm<RecipeFormValues>>;
};

export const FieldInputIngredient = ({ form }: FieldInputIngredientProps) => {
  const [ingredients, setIngredients] = useState([] as string[]);
  const ingredientKeyCounter = useRef(1);
  const stepKeyCounter = useRef(1);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('ingredients')
      .select('*')
      .then((result) => {
        setIngredients(
          result.status === 200
            ? result.data!.map((ingredient) => ingredient.name)
            : []
        );
      });
  }, []);

  const timeoutRef = useRef<number>(-1);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleIngredientChange = (val: string, index: number) => {
    window.clearTimeout(timeoutRef.current);
    form.setFieldValue(`ingredients.${index}.ingredient`, val);
    if (val.trim().length === 0) {
      setLoadingIndex(null);
    } else {
      setLoadingIndex(index);
      timeoutRef.current = window.setTimeout(() => {
        setLoadingIndex(null);
      }, 500);
    }
  };

  const ingredientFields = form.values.ingredients.map((item, index) => (
    <Draggable
      key={item.key}
      index={index}
      draggableId={`ingredient-${item.key}`}
    >
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt='xs'
          align='flex-start'
          {...provided.draggableProps}
        >
          <Center {...provided.dragHandleProps} pt='xs'>
            <IconGripVertical size={18} />
          </Center>

          <Autocomplete
            placeholder='e.g. Sugar'
            data={ingredients}
            value={form.values.ingredients[index].ingredient}
            onChange={(val) => handleIngredientChange(val, index)}
            rightSection={
              loadingIndex === index ? <Loader size={16} /> : undefined
            }
            w={200}
          />

          <TextInput
            placeholder='e.g. 1'
            {...form.getInputProps(`ingredients.${index}.quantity`)}
            w={80}
          />

          <Autocomplete
            placeholder='e.g. tbsp'
            data={SUGGESTED_MEASUREMENTS}
            {...form.getInputProps(`ingredients.${index}.measurement`)}
            w={100}
          />
        </Group>
      )}
    </Draggable>
  ));

  const stepFields = form.values.steps.map((step, index) => (
    <Draggable key={step.key} index={index} draggableId={`step-${step.key}`}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt='xs'
          align='flex-start'
          {...provided.draggableProps}
        >
          <Center {...provided.dragHandleProps} pt='xs'>
            <IconGripVertical size={18} />
          </Center>

          <Textarea
            placeholder={`Step ${index + 1}`}
            autosize
            minRows={2}
            w='100%'
            {...form.getInputProps(`steps.${index}.instruction`)}
          />
        </Group>
      )}
    </Draggable>
  ));

  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) return;

    const isIngredients = source.droppableId === 'ingredients';
    const listKey = isIngredients ? 'ingredients' : 'steps';

    form.reorderListItem(listKey, {
      from: source.index,
      to: destination.index,
    });
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Ingredients */}
        <Title order={4} mt='sm' mb='xs'>
          Ingredients
        </Title>
        <Droppable droppableId='ingredients' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {ingredientFields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Group justify='left' mt='sm'>
          <Button
            onClick={() =>
              form.insertListItem('ingredients', {
                ingredient: '',
                quantity: '',
                measurement: '',
                key: `ingredient-${ingredientKeyCounter.current++}`,
              })
            }
          >
            Add Ingredient
          </Button>
        </Group>

        <Divider my='lg' />

        {/* Steps */}
        <Title order={4} mb='xs'>
          Steps
        </Title>
        <Droppable droppableId='steps' direction='vertical'>
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef}>
              {stepFields}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>

        <Group justify='left' mt='sm'>
          <Button
            onClick={() =>
              form.insertListItem('steps', {
                instruction: '',
                key: `step-${stepKeyCounter.current++}`,
              })
            }
          >
            Add Step
          </Button>
        </Group>
      </DragDropContext>
    </div>
  );
};
