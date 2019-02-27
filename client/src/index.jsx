import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h3: {
      fontFamily: ['"Logofont"'].join(','),
      fontWeight: 500,
      fontSize: 15,
      letterSpacing: 2,
      },
  },
  palette: {
    primary: green
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <App />
  </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
