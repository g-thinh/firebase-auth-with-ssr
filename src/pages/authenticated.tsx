import {
  Container,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import nookies from "nookies";
import { adminAuth } from "services/firebaseAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context);
    const token = await adminAuth.verifyIdToken(cookies.token);

    return {
      props: { token },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: "/login" }).end();
    return { props: {} };
  }
}

export default function Authenticated(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { colorMode } = useColorMode();
  const { email, uid } = props.token;

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
        <Text fontSize="xl">Email: {email}</Text>
        <Text fontSize="xl">UID: {uid}</Text>
      </VStack>
    </Container>
  );
}
