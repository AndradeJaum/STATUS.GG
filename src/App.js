import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Home from "./pages/home";
import theme from "./theme/theme.js";


export function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
