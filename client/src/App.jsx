import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'

import { Provider } from 'react-redux';
import store from './store';

import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './views/Login';
import Register from './views/Register'
import Dashboard from './layouts/Dashboard'
import SiteWrapper from './layouts/Sitewrapper'
import Intro from './layouts/Intro'




import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import purple from '@material-ui/core/colors/purple';


//Check for Token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

// background: url(../assets/images/wave-pattern.png), -webkit-linear-gradient(45deg, #2980ba 300px, #238E9B 700px, #17ab5d 1100px),
// background: url(../assets/images/wave-pattern.png), linear-gradient(45deg, #2980ba 300px, #238E9B 700px, #17ab5d 1100px),
// background-blend-mode: color-burn

const styles = theme => ({
  button: {
    backgroundColor: 'purple',

  }
});

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    data: [],
  }
};


  render() {
      const { classes } = this.props;
    return (
      <Provider store = { store }>
        <Router>
        <div>
          <CssBaseline />
          <SiteWrapper>
            <Route exact path = '/dashboard' component = { Dashboard } />
              <Route exact path = '/login' component = { Login } />
              <Route exact path = '/register' component = { Register } />
            <Route exact path = '/intro' component = {Intro} />
          </SiteWrapper>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
