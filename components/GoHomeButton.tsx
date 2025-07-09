'use client';

import { Button, useMantineTheme } from '@mantine/core';
import { House } from 'lucide-react';

export const GoHomeButton = () => {
  const theme = useMantineTheme();

  const handleClick = () => {
    if (typeof window !== undefined) {
      const homeUrl = window.location.origin;
      window.location.href = homeUrl;
    }
  };

  return (
    <Button
      h={'100%'}
      variant='subtle'
      leftSection={<House />}
      onClick={handleClick}
      size='lg'
      c={theme.colors.myGreen[9]}
    >
      Go Home
    </Button>
  );
};
export default GoHomeButton;
