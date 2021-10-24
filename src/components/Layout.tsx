import { Flex } from "@chakra-ui/react";
import Nav from "components/Nav";
import Footer from "components/Footer";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
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
      <Footer />
    </Flex>
  );
}
