import {
  Code,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";

export default function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          Home Page
        </Heading>
        <Container
          bg={colorMode === "dark" ? "gray.700" : "gray.200"}
          p={4}
          borderRadius={12}
          boxShadow="md"
        >
          <Text mb={3} fontSize="md">
            Introducing a Firebase user authentication template with SSR and ID
            token validation.
          </Text>
          <Heading as="h2" mb={3} fontWeight="bold" fontSize="large">
            Features
          </Heading>
          <UnorderedList fontSize="md" spacing="8px">
            <ListItem>
              Uses the latest Firebase modular SDK version 9 and Admin SDK 10.
            </ListItem>
            <ListItem>
              ID token validation through a server-side API route and create a
              session via cookie with the Firebase Admin SDK.
            </ListItem>
            <ListItem>
              Protected routes with <Code>getServerSideProps</Code> cookie
              session validation.
            </ListItem>
            <ListItem>
              Persisted user authenticated state through an{" "}
              <Code>AuthProvider</Code> context.
            </ListItem>
          </UnorderedList>
        </Container>
      </Container>
    </Container>
  );
}
