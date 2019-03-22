import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { create } from 'jss';
import extend from 'jss-extend';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';



const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    caption: {
      fontFamily: ['"Logofont"'].join(','),
      fontWeight: 500,
      fontSize: 15,
      letterSpacing: 2,
      },
      body2: {
        letterSpacing: '2px',
        textTransform: 'none',
        fontWeight: '500',
      },
      h5: {
        fontWeight: '300',
      },
      h6: {
        fontWeight: '300',
      },

  },
  palette: {
    primary: '#2980ba'[500],
    text: {
      primary: '#000000',
      secondary: 'white',
      lightGrey: 'rgba(0, 0, 0, 0.3)',
    },
  },
});


console.log(theme)
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, extend()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();



ReactDOM.render(
  <MuiThemeProvider theme={theme}>
   <JssProvider jss={jss} generateClassName={generateClassName}>
  <App />
  </JssProvider>
  </MuiThemeProvider>, document.getElementById('root'));

