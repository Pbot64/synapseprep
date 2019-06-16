// Node Modules
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import { createBrowserHistory } from 'history';

// Local Components
import Dashboard from './layouts/Dashboard/@Dashboard';
import Intro from './layouts/Intro';
import Login from './views/Login';
import PasswordResetEmail from './views/PasswordResetEmail';
import Profile from './layouts/Profile';
import QuestionFeedPage from './layouts/QuestionFeedPage';
import Reading from './layouts/Reading';
import Register from './views/Register';
import ResetPassword from './views/ResetPassword';
import ScrollToTop from './components/common/ScrollToTop';
import SiteWrapper from './layouts/Sitewrapper';

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { clearCurrentProfile } from './actions/profileActions';

// Local Assets

//  Style Overrides
const styles = theme => ({});

//Check for Token
const jwtToken = localStorage.getItem('jwtToken');
if (jwtToken !== 'undefined' && jwtToken !== null) {
  // Set auth token header auth
  setAuthToken(jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div>
              <CssBaseline />
              <SiteWrapper>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <Route exact path="/resetpassword/:token" component={ResetPassword} />
                </Switch>
                <Route exact path="/question-feed" component={QuestionFeedPage} />
                <Route exact path="/reading" component={Reading} />
                <Route exact path="/intro" component={Reading} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/passwordResetEmail" component={PasswordResetEmail} />
              </SiteWrapper>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
