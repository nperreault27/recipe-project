"use client";
import { createClient } from "@/lib/supabase/client";
import {
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";

const SignUpPage = () => {
  const supabase = createClient();

  const form = useForm({
    mode: "uncontrolled",
    onSubmitPreventDefault: "validation-failed",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: isEmail("Invalid Email"),
      password: (value) => {
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[0-9]/.test(value)) return "Must include a number";
        if (!/[a-z]/.test(value)) return "Must include a lowercase letter";
        if (!/[A-Z]/.test(value)) return "Must include an uppercase letter";
        if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value))
          return "Must include a special symbol";
        if (value.length > 30)
          return "Password must be fewer than 30 characters";
        return null;
      },
      confirmPassword: (value, values) => {
        if (value !== values.password) return "Passwords do not Match";
      }
    },
  });

  const handleSubmit = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          display_name: values.name,
        },
      },
    });

    if (error) {
      console.error('Signup error: ', error);
    }

    if (typeof window !== undefined) {
      const homePageUrl = "/";
      window.location.href = homePageUrl;
    }
  };

  return (
    <>
      <Paper radius="md" shadow="md" withBorder bg={"#EEEEEE"} p="xl">
        <Stack gap="xl">
          <Title order={1}>Sign Up</Title>

          <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md" w={300}>
              <TextInput
                name="name"
                label="Full Name"
                withAsterisk
                variant="filled"
                autoComplete="off"
                required
                placeholder="Enter your full name..."
                key={form.key("name")}
                {...form.getInputProps("name")}
              />

              <TextInput
                name="email"
                label="Email"
                withAsterisk
                required
                variant="filled"
                autoComplete="off"
                styles={{
                  input: {
                    borderColor: "#000000",
                  },
                }}
                placeholder="foodlover@gmail.com"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                name="password"
                label="Password"
                withAsterisk
                required
                variant="filled"
                autoComplete="off"
                placeholder="Password..."
                key={form.key("password")}
                {...form.getInputProps("password")}
              />

              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                withAsterisk
                required
                variant="filled"
                autoComplete="off"
                placeholder="Confirm Password..."
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
              />

              <Group justify="center" mt="lg">
                <Button type="submit" variant="filled" color="#309553">
                  Submit
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
};
export default SignUpPage;
