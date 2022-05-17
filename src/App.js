import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import Home from "./pages/home";

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
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home/>
    </ThemeProvider>
  )
}

export default App;
