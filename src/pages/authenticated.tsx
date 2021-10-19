import { Container, Heading, Text, VStack } from "@chakra-ui/react";
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
  const { user } = useAuth();

  return (
    <Container>
      <Heading mb={4} textAlign="center">
        Welcome Authenticated User!
      </Heading>
      <VStack my={4} spacing="16px" align="stretch">
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
