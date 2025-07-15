'use client';
import {
  AspectRatio,
  BackgroundImage,
  Paper,
  Text,
  Stack,
  Rating,
} from '@mantine/core';

type Recipe = {
  id: string;
  created_at: string; // ISO date string
  created_by: string;
  ingredients: string[];
  steps: string[];
  rating: number;
  time: string | null;
  user_id: string | null;
  image_link: string;
  recipe_name: string;
};

const RecipeCard = ({ data }: { data: Recipe }) => {
  const { image_link: imageSrc, time, rating, recipe_name: name } = data;
  const starRating = Math.round(rating * 2) / 2;
  return (
    <Paper shadow='md' withBorder miw={275}>
      <AspectRatio ratio={1 / 1}>
        <BackgroundImage src={imageSrc}>
          <Stack align='center' w={'100%'} gap={'0'} bg={'#daf3e2'}>
            <Text size='xl' fw={'700'}>
              {name}
            </Text>
            <Rating size={'md'} value={starRating} fractions={2} readOnly />
            {(time && <Text>Cook Time: {time} minutes</Text>) || <br />}
          </Stack>
        </BackgroundImage>
      </AspectRatio>
    </Paper>
  );
};
export default RecipeCard;
