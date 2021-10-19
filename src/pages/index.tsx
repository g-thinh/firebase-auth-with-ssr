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
        <Heading textAlign="center">Welcome</Heading>
      </Container>
    </Container>
  );
}
