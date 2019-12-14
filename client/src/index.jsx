// Node Modules
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import extend from 'jss-extend';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

import * as colors from './assets/jss/components/colors';

const breakpoints = createBreakpoints({});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00f08b',
      main: '#00BF6F'
    },
    text: {
      primary: '#343e4d',
      secondary: '#7a92a5',
      lightGrey: 'rgba(0, 0, 0, 0.3)'
    },
    lightBlue: '#e8f5ff',
    pink: '#ee5087',
    purple: '#cf6cc9',
    blue: '#2980ba',
    green: '#00BF6F',
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
    }
  },
  typography: {
    useNextVariants: true,
    caption: {
      fontFamily: ['"Logofont"'].join(','),
      fontWeight: 500,
      fontSize: '0.8125rem',
      letterSpacing: 2,
      [breakpoints.up('sm')]: {
        fontSize: '0.9375rem'
      }
    },
    body2: {
      fontSize: '0.9rem',
      [breakpoints.up('sm')]: {
        fontSize: '1.1rem'
      }
    },
    overline: {
      letterSpacing: '1.5px',
      textTransform: 'none',
      fontWeight: '500',
      lineHeight: '1.4',
      fontSize: '1rem',
      [breakpoints.up('sm')]: {
        fontSize: '	1.125rem'
      }
    },
    h5: {
      fontWeight: '300',
      fontSize: '1.2rem',
      [breakpoints.up('sm')]: {
        fontSize: '1.5rem'
      }
    },
    h6: {
      fontSize: '1rem',
      fontWeight: '300',
      [breakpoints.up('sm')]: {
        fontSize: '1.2rem'
      }
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
  document.getElementById('root')
);
