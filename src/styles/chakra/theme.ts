import { defineConfig } from "@chakra-ui/react";
import { Manrope } from "next/font/google";

export const manrope = Manrope({ subsets: ["latin"] });

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: manrope.style.fontFamily },
        body: { value: manrope.style.fontFamily },
      },
      colors: {
        brand: {
          blue: { value: "#5653FC" },
          red: { value: "#FF383C" },
          redLight: { value: "#FFF5F5" },
          redBorder: { value: "#FF6669" },
          grayText: { value: "#7E919F" },
        },
        neutral: {
          outline: { value: "#D9E5F2" },
          surface: { value: "#F3F5F7" },
          main: { value: "#E2E4E9" },
          border: { value: "#F3F4F6" },
          text: { value: "#4E5D69" },
        },
        event: {
          orangeBg: { value: "#FDF5F0" },
          orangeBorder: { value: "#E35F00" },
          orangeText: { value: "#E35F00" },

          greenBg: { value: "#F1FBF4" },
          greenBorder: { value: "#0CA740" },
          greenText: { value: "#0CA740" },

          purpleBg: { value: "#EBEBFF" },
          purpleBorder: { value: "#5653FC" },
          purpleText: { value: "#5653FC" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "#FFFFFF",
      color: "#242424",
    },
  },
});

export default config;
