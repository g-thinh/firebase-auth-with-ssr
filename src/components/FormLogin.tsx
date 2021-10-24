import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { firebaseAuth } from "services/firebase";
import * as Api from "types/api";

export default function FormLogin() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Api.UserForm>();

  async function signUserIn({ email, password }: Api.UserForm) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => Router.push("/authenticated"))
      .catch((error) =>
        setError("email", {
          type: "manual",
          message: error.message,
        })
      );
  }

  return (
    <Box as="form" onSubmit={handleSubmit(signUserIn)}>
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input
          autoFocus
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
        Login
      </Button>
    </Box>
  );
}
