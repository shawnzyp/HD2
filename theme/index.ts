import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const fonts = {
  heading: "'Rajdhani', var(--chakra-fonts-heading)",
  body: "'Rajdhani', var(--chakra-fonts-body)"
};

const colors = {
  brand: {
    50: "#f3f7ff",
    100: "#d6e4ff",
    200: "#b0c9ff",
    300: "#86a8ff",
    400: "#5b7dff",
    500: "#3b58f5",
    600: "#273dd1",
    700: "#1b2da6",
    800: "#121f7a",
    900: "#0a1458"
  }
};

const styles = {
  global: () => ({
    body: {
      background: "linear-gradient(180deg, #04050d 0%, #070b1f 45%, #0a0f2e 100%)",
      color: "gray.100",
      minHeight: "100vh"
    }
  })
};

const theme = extendTheme({ config, fonts, colors, styles });

export default theme;
