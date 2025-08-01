'use client'

import { createClient } from '@/lib/supabase/client';
import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const LoginPage = () => {
  const supabase = createClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      const customErrorMessage = 'Invalid Email or Password';

      if (error.message === 'Invalid login credentials') {
        form.setFieldError('email', customErrorMessage);
        form.setFieldError('password', customErrorMessage);
        return;
      } else {
        alert(`Error: ${error.message}`);
      }
    }

    const homePageUrl = window.location.origin;
    window.location.href = homePageUrl;
  };

  return (
    <>
      <Paper radius='md' shadow='md' withBorder bg={'#EEEEEE'} p='xl'>
        <Stack gap='xl'>
          <Title order={1}>Log In</Title>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.onSubmit(handleSubmit)();
            }}
          >
            <Stack gap='md' w={300}>
              <TextInput
                name='email'
                label='Email'
                withAsterisk
                required
                styles={{
                  input: {
                    borderColor: '#000000',
                  },
                }}
                autoComplete='off'
                placeholder='foodlover@gmail.com'
                key={form.key('email')}
                {...form.getInputProps('email')}
              />

              <PasswordInput
                name='password'
                label='Password'
                withAsterisk
                required
                styles={{
                  input: {
                    borderColor: '#000000',
                  },
                }}
                autoComplete='off'
                placeholder='Password...'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <Group justify='center' mt='lg'>
                <Button type='submit' color='#309553'>
                  Log In
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Anchor href='/signup'>Sign Up</Anchor>
      </p>
    </>
  );
};
export default LoginPage;
