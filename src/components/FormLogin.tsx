import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { firebaseAuth } from "services/firebase";

export type UserForm = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  const { setUser } = useAuth();

  async function signUserIn({ email, password }: UserForm) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const token = await user.getIdToken();
        await fetch("/api/session", {
          method: "POST",
          headers: {
            token: token,
          },
        });

        Router.push("/authenticated");
      })
      .catch((error) => {
        console.log("FORM LOGIN ERROR", error);
        setError("email", {
          type: "manual",
          message: error.message,
        });
      });
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
