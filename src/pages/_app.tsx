import { ChakraProvider } from "@chakra-ui/react";
import theme from "styles/theme";
import { AuthProvider } from "contexts/AuthContext";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
