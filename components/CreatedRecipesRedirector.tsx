'use client';
import { Button, ButtonProps } from '@mantine/core';
import { JSX, DetailedHTMLProps, ButtonHTMLAttributes, Ref } from 'react';

export const CreatedRecipesRedirector = (
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
  const handleCreatedRedirect = () => {
    window.location.href = `${window.location.origin}/search?createdRecipes=on`;
  };

  return (
    <Button
      variant='default'
      bd={'0px black'}
      {...props}
      onClick={handleCreatedRedirect}
    >
      {props.children}
    </Button>
  );
};
export default CreatedRecipesRedirector;
