'use client';

import { Checkbox } from '@mantine/core';

const SavedCheckbox = ({ label, name, checked, onChange }: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Checkbox
      name={name}
      label={label}
      labelPosition='left'
      size='md'
      c={'#000000'}
      color={'#ffca64'}
      onChange={onChange}
      checked={checked}
    />
  );
};
export default SavedCheckbox;
