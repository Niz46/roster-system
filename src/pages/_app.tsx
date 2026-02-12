import { ChakraProvider, createSystem } from "@chakra-ui/react";
import themeConfig from "../styles/chakra/theme";
import { AppPropsWithLayout } from "../types";

const system = createSystem(themeConfig);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider value={system}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
