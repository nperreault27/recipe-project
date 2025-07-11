'use client';
import { createClient } from '@/lib/supabase/client';
import {
  Autocomplete,
  Button,
  useMantineTheme,
  Group,
  Stack,
  Text,
  Paper,
} from '@mantine/core';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SearchBar = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const theme = useMantineTheme();
  const handleSearch = () => {
    console.log('searching:', value);
  };

  useEffect(() => {
    createClient()
      .from('all_recipies')
      .select('recipe_name')
      .then((result) => {
        if (result.status === 200) {
          const { data = [] } = result || { data: [] };
          setData(data.map((recipe) => recipe.recipe_name));
        }
      });
  }, []);
  return (
    <Stack h={'100%'} align={'center'} justify={'center'} gap={'sm'}>
      <Paper shadow='md' withBorder p={'md'}>
        <Text fs={'xl'} fw={'700'}>
          Search for Your Favorite Recipes:
        </Text>
        <Group gap={'xs'}>
          <Autocomplete
            w={'250'}
            aria-label='Search Input'
            data={data}
            radius={'md'}
            value={value}
            onChange={setValue}
            withScrollArea
            clearable
            placeholder='What do you want to make today?'
          />
          <Button
            onClick={handleSearch}
            radius={'md'}
            color={theme.colors.myYellow[3]}
            bd={'1px solid black'}
          >
            <Search />
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
};
export default SearchBar;
