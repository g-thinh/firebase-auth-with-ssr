import {
  Container,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { adminAuth } from "services/firebaseAdmin";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const sessionCookie: string = req.cookies.session ?? "";
    const user = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      props: { user },
    };
  } catch (error) {
    console.log("CATCH ERROR", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default function Authenticated(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  return (
    <Container>
      <Heading as="h1" mb={6} textAlign="center">
        Hello Authenticated User!
      </Heading>
      <VStack
        my={4}
        spacing="16px"
        align="stretch"
        bg={colorMode === "dark" ? "gray.700" : "gray.200"}
        p={4}
        borderRadius={12}
        boxShadow="md"
      >
        {user && (
          <>
            <Text fontSize="xl">Email: {user.email}</Text>
            <Text fontSize="xl">Display Name: {user.displayName}</Text>
            <Text fontSize="xl">UID: {user.uid}</Text>
          </>
        )}
      </VStack>
    </Container>
  );
}
