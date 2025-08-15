'use client';
import {
  AspectRatio,
  BackgroundImage,
  Paper,
  Text,
  Stack,
  Rating,
} from '@mantine/core';

import Link from 'next/link';

import { Recipe } from '@/app/types/index';
import { formatTime } from '@/app/utils/formatTime';

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { image_link: imageSrc, time, rating, recipe_name: name } = data;
  const starRating = Math.round((rating || 0) * 2) / 2;
  return (
    <Paper shadow='md' withBorder miw={275}>
      <Link href={`/recipe/${data.id}/${data.recipe_name}`}>
        <AspectRatio ratio={1 / 1}>
          <BackgroundImage src={imageSrc}>
            <Stack align='center' w={'100%'} gap={'0'} bg={'#daf3e2'}>
              <Text size='xl' fw={'700'}>
                {name}
              </Text>
              <Rating size={'md'} value={starRating} fractions={2} readOnly />
              {(time && <Text>Cook Time: {formatTime(time)}</Text>) || <br />}
            </Stack>
          </BackgroundImage>
        </AspectRatio>
      </Link>
    </Paper>
  );
};
export default RecipeCard;
