"use client"; // change this later
import {
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  List,
} from "@mantine/core";
import { isEmail, matches, useForm } from "@mantine/form";
import { Dot } from "lucide-react";
import { useState } from "react";

const SignUpPage = () => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); //not working right now, need to debug

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
      password: matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        "Enter a Valid Password"
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <>
      <Paper radius="md" shadow="md" withBorder bg={"#EEEEEE"} p="xl">
        <Stack gap="xl">
          <Title order={1}>Sign Up</Title>

          <form onSubmit={form.onSubmit(console.log)}>
            <Stack gap="md">
              <TextInput
                label="Full Name"
                withAsterisk
                variant="filled"
                required
                placeholder="Enter your full name..."
                w={300}
                key={form.key("name")}
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Email"
                withAsterisk
                required
                variant="filled"
                placeholder="foodlover@gmail.com"
                key={form.key("email")}
                w={300}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                withAsterisk
                required
                variant="filled"
                placeholder="Enter Password..."
                key={form.key("password")}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                w={300}
                {...form.getInputProps("password", {
                  onFocus: () => {
                    console.log("ASDKLSADJ");
                    setIsPasswordFocused(true);
                  },
                  onBlur: () => {
                    setIsPasswordFocused(false);
                  },
                })}
              />

              {isPasswordFocused && (
                <List size="xs" center ml="xl" icon={<Dot strokeWidth="2px" />}>
                  <List.Item>Minimum of 1 uppercase letter</List.Item>
                  <List.Item>Minimum of 1 lowercase letter</List.Item>
                  <List.Item>Minimum of 1 special character</List.Item>
                  <List.Item>Minimum of 1 number</List.Item>
                  <List.Item>Minimum of 8 Characters</List.Item>
                  <List.Item>Maximum of 30 Characters</List.Item>
                </List>
              )}

              <PasswordInput
                label="Confirm Password"
                withAsterisk
                required
                variant="filled"
                placeholder="Confirm Password..."
                key={form.key("confirmPassword")}
                w={300}
                {...form.getInputProps("confirmPassword")}
              />
              <Group justify="center" mt="lg">
                <Button type="submit" variant="filled" color="myYellow">
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
