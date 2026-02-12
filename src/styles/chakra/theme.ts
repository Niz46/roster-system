import { extendTheme } from "@chakra-ui/react";
import { Manrope } from "next/font/google";

export const manrope = Manrope({ subsets: ["latin"] });

const colors = {
  brand: {
    blue: "#5653FC",
    red: "#FF383C",
    redLight: "#FFF5F5",
    redBorder: "#FF6669",
    grayText: "#7E919F",
  },
  neutral: {
    outline: "#D9E5F2",
    surface: "#F3F5F7",
    main: "#E2E4E9",
    border: "#F3F4F6",
    text: "#4E5D69",
  },
  event: {
    orange: { bg: "#FDF5F0", border: "#E35F00", text: "#E35F00" },
    green: { bg: "#F1FBF4", border: "#0CA740", text: "#0CA740" },
    purple: { bg: "#EBEBFF", border: "#5653FC", text: "#5653FC" },
  },
};

const theme = extendTheme({
  fonts: {
    heading: manrope.style.fontFamily,
    body: manrope.style.fontFamily,
  },
  colors,
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Manrope",
        fontWeight: "bold",
        borderRadius: "8px",
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "#FFFFFF",
        color: "#242424",
      },
    },
  },
});

export default theme;
