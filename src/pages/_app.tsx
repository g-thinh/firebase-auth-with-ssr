import { ChakraProvider, Progress } from "@chakra-ui/react";
import Layout from "components/Layout";
import { AuthProvider } from "contexts/AuthContext";
import useLoading from "hooks/useLoading";
import theme from "styles/theme";

function MyApp({ Component, pageProps }) {
  const { loading } = useLoading();

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        {loading && (
          <Progress
            colorScheme="teal"
            size="xs"
            isIndeterminate
            width="100%"
            sx={{ position: "fixed", top: 0, left: 0 }}
          />
        )}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
