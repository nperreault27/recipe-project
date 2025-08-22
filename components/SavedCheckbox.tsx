'use client';

import { Checkbox } from '@mantine/core';
import { useState } from 'react';

const SavedCheckbox = ({ userId }: { userId: string | undefined }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedMR, setIsCheckedMR] = useState(false);


  const handleClick = () => {
    if (userId) {
      setIsChecked(!isChecked);
    } else {
      alert('Must be signed in to save recipes');
    }
  };

  const handleClickMR = () => {
    if (userId) {
      setIsCheckedMR(!isCheckedMR);
    } else {
      alert('Must be signed in to create recipes');
    }
  };

  return (
    <>
        <Checkbox
      name='savedRecipes'
      label='My Saved Recipes'
      labelPosition='left'
      size='md'
      c={'#000000'}
      color={'#ffca64'}
      onChange={handleClick}
      checked={isChecked}
    />
        <Checkbox
      name='createdRecipes'
      label='My Recipes'
      labelPosition='left'
      size='md'
      c={'#000000'}
      color={'#ffca64'}
      onChange={handleClickMR}
      checked={isCheckedMR}
    />
    </>

  );
};
export default SavedCheckbox;
