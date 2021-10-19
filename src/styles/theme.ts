import { Theme, theme as BaseTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1440px",
});

const styles = {
  ...BaseTheme.styles,
  global: (props) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.50", "gray.800")(props),
      lineHeight: "base",
    },
    html: {
      boxSizing: "border-box",
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word",
      boxSizing: "inherit",
    },
    ul: {
      listStyle: "none",
    },
    "html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6":
      {
        margin: 0,
        padding: 0,
      },
  }),
};
const theme: Theme = {
  ...BaseTheme,
  styles,
  breakpoints,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
};

export default theme;
