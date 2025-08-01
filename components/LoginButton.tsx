'use client';

import { Button, useMantineTheme } from '@mantine/core';
import { User } from 'lucide-react';

export const LoginButton = () => {
  const theme = useMantineTheme();

  const handleClick = () => {
    if (typeof window !== undefined) {
      const loginPageUrl = '/login';
      window.location.href = loginPageUrl;
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
      Log In
    </Button>
  );
};
export default LoginButton;
