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
  Paper,
  UnstyledButton,
  Modal,
  Divider,
  Stack,
  Button,
  useMantineTheme,
} from '@mantine/core';

import { formatTime } from '@/app/utils/formatTime';

import { Recipe } from '@/app/types/index';
import { getStarRating } from '@/app/utils/getStarRating';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const RecipeShow = ({ data }: { data: Recipe }) => {
  const {
    created_by,
    ingredients,
    steps,
    ratings,
    time,
    image_link,
    recipe_name,
    id: recipeId,
  } = data;

  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);
  const [userId, setUserId] = useState('');
  const [updatedRatings, updateRatings] = useState(ratings);
  const supabase = createClient();
  const starRating = getStarRating(updatedRatings);
  const timeToCook = formatTime(Number(time));
  const [value, setValue] = useState(starRating);

  const allIngredients =
    ingredients?.map &&
    ingredients.map((ingredient, index) => {
      return (
        <List.Item key={index} style={{ textTransform: 'capitalize' }}>
          {ingredient}
        </List.Item>
      );
    });

  const allSteps =
    steps?.map &&
    steps.map((step, index) => {
      return (
        <List.Item key={index} style={{ textTransform: 'capitalize' }}>
          {step}
        </List.Item>
      );
    });

  const handleModalOpen = async () => {
    const {
      data: { user: currUser },
    } = await supabase.auth.getUser();
    if (!currUser) {
      window.location.href = window.location.origin + '/login';
    } else {
      setUserId(currUser?.id || '');
      open();
    }
  };

  const handleConfirm = async () => {
    const { data, error } = await supabase
      .from('all_recipies')
      .select('*')
      .eq('id', recipeId);
    if (error) alert(error);
    else {
      const newRatings = data[0].ratings;
      newRatings[userId] = value;
      console.log(newRatings);
      const { data: updatedData, error: failedToUpdate } = await supabase
        .from('all_recipies')
        .update({ ratings: newRatings })
        .eq('id', recipeId)
        .select('ratings');

      close();
      if (failedToUpdate) alert(failedToUpdate);
      else {
        updateRatings(updatedData[0].ratings);
      }
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Rate this Recipe:'
        size='auto'
        centered
      >
        <Stack gap='md'>
          <Divider />
          <Rating
            size='60'
            defaultValue={starRating}
            fractions={2}
            value={value}
            onChange={setValue}
          ></Rating>
          <Divider />
          <Group justify='right'>
            <Button
              onClick={close}
              variant='outline'
              color={theme.colors.myGreen[4]}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} color={theme.colors.myGreen[2]}>
              Confirm
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Group justify='space-between' mt='md' mb='xs'>
        <Title order={1}>{recipe_name || 'Recipe'}</Title>

        <Group justify='space-between' mt='md' mb='xs'>
          <Button variant='transparent' onClick={handleModalOpen}>
            {starRating === 0 ? (
              <Badge
                color={theme.colors.myYellow[3]}
                style={{ cursor: 'pointer' }}
              >
                Rate this Recipe
              </Badge>
            ) : (
              <Group gap='5' style={{ cursor: 'pointer' }}>
                <Rating size='md' value={starRating} fractions={2} readOnly />
                <Text c='black'>({Object.values(updatedRatings).length})</Text>
              </Group>
            )}
          </Button>
          {Number(time) > 0 ? <Badge color='pink'>{timeToCook}</Badge> : <></>}
        </Group>
      </Group>

      <Group gap='xs'>
        <Avatar variant='filled' radius='xl' color='#DAF3E2' />
        <Text size='sm' c='dimmed'>
          {created_by || 'User'}
        </Text>
      </Group>

      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        {image_link ===
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' ? (
          <></>
        ) : (
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Image
              radius='md'
              h={300}
              width='100%'
              fit='contain'
              src={image_link}
              alt={`Image of a ${recipe_name || 'missing'} recipe`}
            />
          </Grid.Col>
        )}

        <Grid.Col mt='lg' span={{ base: 12, md: 6, lg: 6 }}>
          <Paper
            shadow='md'
            radius='md'
            p='xl'
            style={{ backgroundColor: '#DAF3E2' }}
          >
            <Title order={1}>Ingredients</Title>
            <List size='lg' listStyleType='disc'>
              {allIngredients}
            </List>
          </Paper>
        </Grid.Col>

        <Grid.Col mt='xl' span={12}>
          <Title order={2} style={{ textTransform: 'capitalize' }}>
            How to Make {recipe_name} in {timeToCook}
          </Title>
          <List size='lg' listStyleType='decimal'>
            {allSteps}
          </List>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default RecipeShow;
