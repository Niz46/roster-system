import { mergeConfigs } from "@chakra-ui/react";
import { defaultThemeConfig } from "@chakra-ui/react/theme";

const theme = mergeConfigs(defaultThemeConfig, {
  globalCss: {
    body: { bg: "gray.50" },
  },
});

export default theme;
