'use client';
import { useState } from 'react';
import { Autocomplete, Button, Group, Paper } from '@mantine/core';
import { Search } from 'lucide-react';
import SavedCheckbox from './SavedCheckbox';

const SearchAndFilterBar = () => {
  const [savedChecked, setSavedChecked] = useState(true); // checked by default
  const [createdChecked, setCreatedChecked] = useState(true); // checked by default

  const filteredRecipes: string[] = [];
  const ingredients: string[] = [];

  const handleSavedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavedChecked(e.target.checked);
  };
  const handleCreatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (savedChecked) params.append('savedRecipes', 'true');
    if (createdChecked) params.append('createdRecipes', 'true');
    const recipeName = (e.currentTarget.recipeName?.value || '').trim();
    if (recipeName) params.append('recipeName', recipeName);
    const ingredients = (e.currentTarget.ingredients?.value || '').trim();
    if (ingredients) params.append('ingredients', ingredients);
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <Paper w={'100%'} withBorder shadow='md' p={'md'}>
      <form onSubmit={handleSubmit}>
        <Group justify='space-between' w={'100%'}>
          <Autocomplete
            name='recipeName'
            data={filteredRecipes}
            radius={'md'}
            w={'250'}
            aria-label='recipe search'
            withScrollArea
            clearable
            placeholder='Search by Recipe Name'
          />
          <Autocomplete
            name='ingredients'
            radius={'md'}
            data={ingredients}
            w={'250'}
            aria-label='ingredient search'
            withScrollArea
            clearable
            placeholder='Search by Ingredient'
          />
          <Group gap={'2rem'}>
            <SavedCheckbox label='My Saved Recipes' name='savedRecipes' checked={savedChecked} onChange={handleSavedChange} />
            <SavedCheckbox label='My Recipes' name='createdRecipes' checked={createdChecked} onChange={handleCreatedChange} />
            <Button
              type='submit'
              color={'#ffca64'}
              bd={'1px solid black'}
              radius={'md'}
            >
              <Search />
            </Button>
          </Group>
        </Group>
      </form>
    </Paper>
  );
};
export default SearchAndFilterBar;
