'use client';

import {
  List,
  Group,
  Title,
  Rating,
  Badge,
  Avatar,
  Text,
  Grid,
  Image,
  Paper
} from '@mantine/core';

import { formatTime } from '@/app/utils/formatTime';

import { Recipe } from '@/app/types/index';

const RecipeShow = ({ data }: { data: Recipe }) => {
  const {
    created_by,
    ingredients,
    steps,
    rating,
    time,
    image_link,
    recipe_name
  } = data;

  const starRating = Math.round(rating || 0 * 2) / 2;
  const timeToCook = formatTime(Number(time));

  const allIngredients = ingredients?.map && ingredients.map((ingredient, index) => {
    return (
      <List.Item key={index} style={{textTransform: 'capitalize'}}>
        {ingredient}</List.Item>
    );
  });

  const allSteps = steps?.map && steps.map((step, index) => {
    return (
      <List.Item key={index} style={{textTransform: 'capitalize' }}>
        {step}</List.Item>
    );
  });

  return (
  <>
    <Group justify='space-between' mt='md' mb='xs'>

      <Title order={1}>{recipe_name || 'Recipe'}</Title>

      <Group justify='space-between' mt='md' mb='xs'>
        <Rating size='md' value={starRating} fractions={2} readOnly />
        {Number(time) > 0 ? <Badge color='pink'>{timeToCook}</Badge> : <></>}
      </Group>

    </Group>

    <Group gap='xs'>
      <Avatar variant='filled' radius='xl' color='#DAF3E2' />
      <Text size='sm' c='dimmed'>
        {created_by || 'User'}</Text>
    </Group>

    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      
      {image_link === 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' ?
      <></> : <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <Image
          radius='md'
          h={300}
          width='100%'
          fit='contain'
          src={image_link}
          alt={`Image of a ${recipe_name || 'missing'} recipe`} />
      </Grid.Col>}
  
      <Grid.Col mt='lg' span={{ base: 12, md: 6, lg: 6 }}>
        <Paper shadow='md' radius='md' p='xl' style={{ backgroundColor: '#DAF3E2'}}>
          <Title order={1}>Ingredients</Title>
          <List size='lg' listStyleType='disc'>
            {allIngredients}</List>      
        </Paper>
      </Grid.Col>
      

      <Grid.Col mt='xl' span={12}>
        <Title order={2} style={{textTransform: 'capitalize'}}>
          How to Make {recipe_name} in {timeToCook}</Title>
        <List size='lg' listStyleType='decimal'>
          {allSteps}</List>
      </Grid.Col>

    </Grid>
    </>
  );
};

export default RecipeShow;