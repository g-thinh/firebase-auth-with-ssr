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
import { GetServerSidePropsContext } from "next";
import { adminAuth } from "services/firebaseAdmin";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const sessionCookie: string = req.cookies.session ?? "";
    const user = await adminAuth.verifySessionCookie(sessionCookie);

    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default function Home() {
  return (
    <Container>
      <Container m="auto">
        <Heading as="h1" mb={6} textAlign="center">
          Login Page
        </Heading>
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
      </Container>
    </Container>
  );
}
