import {
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Link from "components/Link";
import { useAuth } from "contexts/AuthContext";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signUserOut } = useAuth();

  return (
    <Container maxW="100%" px={4} py={2}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Link
          fontSize={[32, 36]}
          fontWeight="bold"
          href="/"
          sx={{
            ":hover": {
              textDecoration: "none",
              color: "teal.500",
            },
          }}
        >
          Simple Firebase Auth.
        </Link>
        <Grid
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <HStack spacing="16px">
            <IconButton
              aria-label="toggle dark/light mode"
              icon={
                colorMode === "light" ? (
                  <FiSun size={18} />
                ) : (
                  <FiMoon size={18} />
                )
              }
              onClick={toggleColorMode}
            />
            {user ? (
              <>
                <Link as={Button} href="/authenticated">
                  Profile
                </Link>
                <Button colorScheme="teal" onClick={signUserOut}>
                  Log out
                </Button>
              </>
            ) : (
              <Link as={Button} href="/login">
                Login
              </Link>
            )}
          </HStack>
        </Grid>
      </Flex>
    </Container>
  );
}
