import { Flex } from "@chakra-ui/react";
import Nav from "./Nav";
import { useAuth } from "contexts/AuthContext";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { user } = useAuth();
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Nav />
      <Flex
        mt={6}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
