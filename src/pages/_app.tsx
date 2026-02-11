import { AppProps } from "next/app";
import { ChakraProvider, createSystem } from "@chakra-ui/react";
import themeConfig from "../styles/chakra/theme";

const system = createSystem(themeConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
