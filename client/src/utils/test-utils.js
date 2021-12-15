// Node Modules
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

// Local Components
import * as colors from '../assets/jss/components/colors';

const breakpoints = createBreakpoints({});

// import { TranslationProvider } from 'my-i18n-lib';
// import defaultStrings from 'i18n/en-x-default';

// import { createMount } from '@material-ui/core/test-utils';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import { create } from 'jss';
// import extend from 'jss-extend';
// import JssProvider from 'react-jss/lib/JssProvider';
// import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

// // Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, extend()] });

// // Custom Material-UI class name generator.
// const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00f08b',
      main: '#00BF6F'
    },
    secondary: {
      main: '#4fa3eb'
    },
    error: {
      main: '#ff0000'
    },
    text: {
      primary: '#343e4d',
      secondary: '#7a92a5',
      lightGrey: 'rgba(0, 0, 0, 0.3)'
    },
    lightBlue: '#e8f5ff',
    pink: '#ee5087',
    purple: '#7336df',
    red: 'red',
    blue: '#4fa3eb',
    lighterBlue: '#4fa3eb14',
    green: '#00BF6F',
    lightGreen: '#00BF6F14',
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
    body2: {
      fontSize: '0.9375rem',
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
    },
    subtitle1: {
      fontWeight: '300',
      lineHeight: '1.33',
      letterSpacing: '0.2px',
      fontSize: '1rem',
      [breakpoints.up('sm')]: {
        fontSize: '1.1rem'
      }
    },
    subtitle2: {
      fontSize: '0.75rem',
      [breakpoints.up('sm')]: {
        fontSize: '0.875rem'
      }
    },
    h1: {
      fontFamily: ['"Logofont"'].join(','),
      fontWeight: 500,
      fontSize: '0.8125rem',
      letterSpacing: 2,
      [breakpoints.up('sm')]: {
        fontSize: '0.9375rem'
      }
    }
  }
});

const AllTheProviders = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
      {/* <TranslationProvider messages={defaultStrings}>{children}</TranslationProvider> */}
    </MuiThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// function AllTheProviders({ children }) {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <JssProvider jss={jss} generateClassName={generateClassName}>
//         {children}
//       </JssProvider>
//     </MuiThemeProvider>
//   );
// }

// const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// // re-export everything
// export * from '@testing-library/react';

// // override render method
// export { customRender as render };
