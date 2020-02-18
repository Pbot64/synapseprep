// Node Modules
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import PrivateRoute from './components/common/PrivateRoute';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Local Components
import Dashboard from './layouts/Dashboard/@Dashboard';
import Intro from './layouts/Intro';
import Login from './views/Login';
import PasswordResetEmail from './views/PasswordResetEmail';
import Profile from './layouts/Profile';
import QuestionFeedPage from './layouts/QuestionFeedPage';
import Register from './views/Register';
import SiteWrapper from './layouts/Sitewrapper';
import ResetPassword from './views/ResetPassword';
import ScrollToTop from './components/common/ScrollToTop';
import UnderConstruction from './layouts/UnderConstruction';
import Review from './layouts/Review';
import Testing from './layouts/Testing';

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

// Local Assets

//  Style Overrides
const styles = theme => ({
  '@global': {
    '.rootTest': {
      marginBottom: '-60px'
    },
    '.katex': {
      'text-indent': '1px'
    },
    '.mathdefault': {
      marginRight: '0px'
    },
    '.katex-display': {
      margin: '0px'
    },
    '.text': {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: '0.9rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.1rem'
      }
    },
    '.newline': {
      marginBottom: '0.5rem'
    },
    '.katex .fbox': {
      border: '2px solid'
    },
    html: {
      minHeight: '100vh'
    },
    body: {
      minHeight: '100vh'
    },
    '#root': {
      minHeight: '100vh'
    }
  }
});

//Check for Token
const jwtToken = localStorage.jwtToken;
if (jwtToken !== 'Bearer undefined' && jwtToken !== null && jwtToken) {
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
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
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
                    <PrivateRoute exact path="/question-feed" component={QuestionFeedPage} />
                    <PrivateRoute exact path="/review" component={Review} />
                    <Route exact path="/resetpassword/:token" component={ResetPassword} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/testing" component={Testing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/passwordResetEmail" component={PasswordResetEmail} />
                  </Switch>
                </SiteWrapper>
              </React.Fragment>
            </ScrollToTop>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
