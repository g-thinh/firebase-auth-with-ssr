import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { UserForm } from "components/FormLogin";
import { useAuth } from "contexts/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "services/firebase";
import Router from "next/router";

export default function FormCreateAccount() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  const { setUser } = useAuth();

  async function createUser({ email, password }: UserForm) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        const newUser = userCredential.user;
        setUser(newUser);
        Router.push("/authenticated");
      })
      .catch((error) => {
        setError("email", {
          type: "manual",
          message: error.message,
        });
      });
  }

  return (
    <Box as="form" onSubmit={handleSubmit(createUser)}>
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Create Account
      </Button>
    </Box>
  );
}
