'use client';
import { Image, Paper, Text, Stack, Rating, Group, Box } from '@mantine/core';

import Link from 'next/link';

import { Recipe } from '@/app/types/index';
import { getStarRating } from '@/app/utils/getStarRating';
import SaveRecipeButton from './SaveRecipeButton';
import { formatTime } from '@/app/utils/formatTime';

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { image_link: imageSrc, time, ratings, recipe_name: name } = data;
  const starRating = getStarRating(ratings);
  console.log(imageSrc);
  return (
    <Paper shadow='md' withBorder w={275} h={275} pos={'relative'}>
      <Link href={`/recipe/${data.id}/${data.recipe_name}`}>
        <Image
          radius='md'
          top={0}
          pos='absolute'
          z-index={'var(--mantine-z-index-paper)'}
          h='100%'
          src={imageSrc}
          alt={`Image of a ${name || 'missing'} recipe`}
        />

        <Stack
          align='center'
          w={'100%'}
          gap={'0'}
          bg={'#daf3e2'}
          pos='absolute'
          top={0}
        >
          <Text size='xl' fw={'700'}>
            {name}
          </Text>

          <Group gap='5'>
            <Rating size={'md'} value={starRating} fractions={2} readOnly />
            <Text> ({Object.values(ratings).length || 0})</Text>
          </Group>

          {(time && <Text>Cook Time: {formatTime(time)}</Text>) || <br />}
        </Stack>
      </Link>{' '}
      <Box pos='absolute' top={25} right={5}>
        <SaveRecipeButton recipeId={data.id} />
      </Box>
    </Paper>
  );
};
export default RecipeCard;
