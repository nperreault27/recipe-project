'use client';

import { Button, useMantineTheme } from '@mantine/core';
import { User } from 'lucide-react';

export const SignUpButton = () => {
  const theme = useMantineTheme();

  const handleClick = () => {
    if (typeof window !== undefined) {
      const homeUrl = window.location.origin;
      window.location.href = homeUrl;
    }
  };

  return (
    <Button
      h={'70%'}
      variant='filled'
      radius={'xl'}
      rightSection={<User />}
      onClick={handleClick}
      size='lg'
      color={theme.colors.myYellow[3]}
    >
      Sign Up
    </Button>
  );
};
export default SignUpButton;
