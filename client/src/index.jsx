import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import extend from "jss-extend";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import * as colors from "./assets/jss/components/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#00f08b",
      main: "#00BF6F"
    },
    text: {
      primary: "#343e4d",
      secondary: "#7a92a5",
      lightGrey: "rgba(0, 0, 0, 0.3)"
    },
    pinkToYellow: {
      ...colors.pinkToYellow
    },
    blueToPurple: {
      ...colors.blueToPurple
    },
    blueToGreen: {
      ...colors.blueToGreen
    },
    whiteToLightBlue: {
      ...colors.whiteToLightBlue
    },
    pinkToPurple: {
      ...colors.pinkToPurple
    },
    blueToTurquoise: {
      ...colors.blueToTurquoise
    },
    lightBlue: "#e8f5ff"
  },
  typography: {
    useNextVariants: true,
    caption: {
      fontFamily: ['"Logofont"'].join(","),
      fontWeight: 500,
      fontSize: 15,
      letterSpacing: 2
    },
    overline: {
      letterSpacing: "1.5px",
      textTransform: "none",
      fontWeight: "500",
      lineHeight: "1.4",
      fontSize: "18px"
    },
    body2: {},
    h5: {
      fontWeight: "300"
    },
    h6: {
      fontWeight: "300"
    }
  }
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, extend()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
