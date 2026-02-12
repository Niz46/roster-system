import { defineConfig } from "@chakra-ui/react";
import { Manrope } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

type VendorPrefixedStyles = {
  WebkitFontSmoothing?: "auto" | "antialiased" | "subpixel-antialiased";
  MozOsxFontSmoothing?: "auto" | "grayscale" | "inherit" | "unset";
};

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: manrope.style.fontFamily },
        body: { value: manrope.style.fontFamily },
      },
      radii: {
        sm: { value: "6px" },
        md: { value: "12px" },
        lg: { value: "16px" },
        full: { value: "9999px" },
      },
      sizes: {
        header: { value: "70px" },
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
          outline: { value: "#E6EDF6" },
          surface: { value: "#F7F8FA" },
          main: { value: "#E9EDF2" },
          border: { value: "#F3F4F6" },
          text: { value: "#4E5D69" },
          background: { value: "#FFFFFF" },
        },
        event: {
          orangeBg: { value: "#FFF8F2" },
          orangeBorder: { value: "#E35F00" },
          orangeText: { value: "#E35F00" },
          greenBg: { value: "#F1FBF4" },
          greenBorder: { value: "#0CA740" },
          greenText: { value: "#0CA740" },
          purpleBg: { value: "#F3F4FF" },
          purpleBorder: { value: "#5653FC" },
          purpleText: { value: "#5653FC" },
          beigeBg: { value: "#FBFAF6" },
          beigeBorder: { value: "#D9CFAF" },
        },
      },
      shadows: {
        soft: { value: "0 6px 18px rgba(20,33,62,0.06)" },
        inset: { value: "inset 0 1px 0 rgba(255,255,255,0.6)" },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "#FBFDFF",
      color: "#242424",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    } as VendorPrefixedStyles,
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
  },
});

export default config;
