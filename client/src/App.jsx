// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'
import { Provider } from 'react-redux';
import store from './store';

// Local Components
import Dashboard from './layouts/Dashboard'
import Intro from './layouts/Intro'
import Reading from './layouts/Reading'
import Login from './views/Login';
import Register from './views/Register'
import SiteWrapper from './layouts/Sitewrapper'


// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({

});

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
              <Route exact path = '/intro' component = { Intro } />
              <Route exact path = '/reading' component = { Reading } />
              
              <Route exact path = '/register' component = { Register } />
            </SiteWrapper>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
