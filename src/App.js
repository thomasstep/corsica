import React, { Component } from "react";
import MovieBrowser from "./modules/movie-browser/movie-browser.container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors"

// Global MUI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      dark: blueGrey[700],
      main: "#202e39",
      light: "#455a64"
    },
    secondary: {
      light: "#00e5ff",
      main: "#18FFFF",
      dark: "#498585"
    },
    contrastThreshhold: 10,
    background: {
      paper: "#202e39"
    }
  }
});

class App extends Component {
  render() {
    return (
      // Provides the Material UI theme to child components
      <MuiThemeProvider theme={theme}>
        <MovieBrowser />
      </MuiThemeProvider>
    );
  }
}

export default App;
