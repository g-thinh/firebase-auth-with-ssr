import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "components/Link";
import { FiGithub } from "react-icons/fi";

export default function Footer() {
  const { colorMode } = useColorMode();
  return (
    <Box
      width="100%"
      mt={5}
      p={3}
      bg={colorMode === "dark" ? "gray.900" : "gray.200"}
    >
      <Container textAlign="center">
        <Flex
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "xs",
            color: "gray.600",
          }}
        >
          <Text mr={1}>A template by</Text>
          <Link
            sx={{ display: "inline-flex", alignItems: "center" }}
            href="https://github.com/g-thinh/firebase-ssr"
          >
            Gia Thinh Nguyen <Icon ml={1} as={FiGithub} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
