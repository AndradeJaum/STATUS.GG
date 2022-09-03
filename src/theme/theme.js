import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: {
      light: "#34495e",
      main: "#3498db",
      dark: "#233544",
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 920,
      desktop: 1280,
    },
  },
});

export default theme;
