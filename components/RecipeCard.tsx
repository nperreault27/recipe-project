'use client';
import {
  AspectRatio,
  BackgroundImage,
  Paper,
  Text,
  Stack,
  Rating,
  Group,
} from '@mantine/core';

import Link from 'next/link';

import { Recipe } from '@/app/types/index';
import { getStarRating } from '@/app/utils/getStarRating';

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { image_link: imageSrc, time, ratings, recipe_name: name } = data;
  const starRating = getStarRating(ratings);
  return (
    <Paper shadow='md' withBorder miw={275}>
      <Link href={`/recipe/${data.id}/${data.recipe_name}`}>
        <AspectRatio ratio={1 / 1}>
          <BackgroundImage src={imageSrc}>
            <Stack align='center' w={'100%'} gap={'0'} bg={'#daf3e2'}>
              <Text size='xl' fw={'700'}>
                {name}
              </Text>

              <Group gap='5'>
                <Rating size={'md'} value={starRating} fractions={2} readOnly />
                <Text> ({Object.values(ratings).length || 0})</Text>
              </Group>

              {(time && <Text>Cook Time: {time} minutes</Text>) || <br />}
            </Stack>
          </BackgroundImage>
        </AspectRatio>
      </Link>
    </Paper>
  );
};
export default RecipeCard;
