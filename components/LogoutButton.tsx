'use client';
import { createClient } from '@/lib/supabase/client';
import { Button, ButtonProps } from '@mantine/core';
import { JSX, DetailedHTMLProps, ButtonHTMLAttributes, Ref } from 'react';

export const LogoutButton = (
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
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      location.reload();
    }
  };
  return (
    <Button variant='subtle' color='black' {...props} onClick={handleLogout}>
      {props.children}
    </Button>
  );
};
