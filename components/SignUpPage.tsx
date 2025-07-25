"use client"; // change this later
import {
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import AdvancedPasswordInput from "./AdvancedPasswordInput";

const SignUpPage = () => {
  const theme = useMantineTheme();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: isEmail("Enter a Valid Email"),
      password: (value) => {
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[0-9]/.test(value)) return "Must include a number";
        if (!/[a-z]/.test(value)) return "Must include a lowercase letter";
        if (!/[A-Z]/.test(value)) return "Must include an uppercase letter";
        if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) return "Must include a special symbol";
        if (value.length > 30) return "Password must be fewer than 30 characters"
        return null;
      },
    },
  });

  return (
    <>
      <Paper radius="md" shadow="md" withBorder bg={"#EEEEEE"} p="xl">
        <Stack gap="xl">
          <Title order={1}>Sign Up</Title>

          <form onSubmit={form.onSubmit(console.log)}>
            <Stack gap="md" w={300}>
              <TextInput
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
                label="Password"
                withAsterisk
                required
                variant="filled"
                autoComplete="off"
                placeholder="Password..."
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Group justify="center" mt="lg">
                <Button
                  type="submit"
                  variant="filled"
                  color={theme.colors.myGreen[8]}
                >
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
