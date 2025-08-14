'use client';

import { Checkbox } from '@mantine/core';
import { useState } from 'react';

const SavedCheckbox = ({ userId }: { userId: string | undefined }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    if (userId) {
      setIsChecked(!isChecked);
    } else {
      alert('Must be signed in to save recipes');
    }
  };

  return (
    <Checkbox
      name='savedRecipes'
      label='My Saved Recipes'
      labelPosition='left'
      size='md'
      c={'#ffca64'}
      color='#00000'
      onChange={handleClick}
      checked={isChecked}
    />
  );
};
export default SavedCheckbox;
