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

// Local Components
import Dashboard from './layouts/Dashboard/@Dashboard';
import Intro from './layouts/Intro';
import Login from './views/Login';
import PasswordResetEmail from './views/PasswordResetEmail';
import Profile from './layouts/Profile';
import QuestionFeedPage from './layouts/QuestionFeedPage';
import UnderConstruction from './layouts/UnderConstruction';
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
            <React.Fragment>
              <CssBaseline />
              <SiteWrapper>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute exact path="/intro" component={Intro} />
                  <PrivateRoute exact path="/underConstruction" component={UnderConstruction} />
                  <Route exact path="/resetpassword/:token" component={ResetPassword} />
                  <Route exact path="/question-feed" component={QuestionFeedPage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/passwordResetEmail" component={PasswordResetEmail} />
                </Switch>
              </SiteWrapper>
            </React.Fragment>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
