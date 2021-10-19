import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import FormCreateAccount from "components/FormCreateAccount";
import FormLogin from "components/FormLogin";
import { useAuth } from "contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <Container>
      <Container m="auto">
        {user ? (
          <Heading textAlign="center">
            Welcome {(user && user.displayName) ?? user.email}
          </Heading>
        ) : (
          <Tabs
            isFitted
            colorScheme="teal"
            p={6}
            sx={{
              width: "100%",
              borderRadius: 30,
              border: "1px solid",
              borderColor: "gray.700",
            }}
          >
            <TabList>
              <Tab>Login</Tab>
              <Tab>Create an Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormLogin />
              </TabPanel>
              <TabPanel>
                <FormCreateAccount />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Container>
    </Container>
  );
}
