'use client';
import { Button, ButtonProps } from '@mantine/core';
import { JSX, DetailedHTMLProps, ButtonHTMLAttributes, Ref } from 'react';

export const SavedRedirector = (
  props: JSX.IntrinsicAttributes &
    ButtonProps & { component?: 'button' | undefined } & Omit<
      Omit<
        DetailedHTMLProps<
          ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >,
        'ref'
      >,
      'component' | keyof ButtonProps
    > & {
      ref?: Ref<HTMLButtonElement> | undefined;
    }
) => {
  const handleSavedRedirect = () => {
    window.location.href = `${window.location.origin}/search?savedRecipes=on`;
  };

  return (
    <Button
      variant='default'
      bd={'0px black'}
      {...props}
      onClick={handleSavedRedirect}
    >
      {props.children}
    </Button>
  );
};
