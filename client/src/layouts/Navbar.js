// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
// import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Actions
import { updateQuestions } from '../actions/profileActions';

// Local Components
import UserMenu from '../components/UserMenu';
import LinkCustom from '../assets/jss/components/LinkCustom';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  container: {
    display: 'flex',
    color: 'white'
  },
  appBarBase: {
    position: 'fixed',
    ...theme.palette.blueToGreen,
    color: 'white'
  },
  appBarMath: {
    position: 'fixed',
    ...theme.palette.blueToGreen,
    color: 'white'
  },
  appBarReading: {
    position: 'fixed',
    ...theme.palette.pinkToYellow,
    color: 'white'
  },
  appBarWriting: {
    position: 'fixed',
    ...theme.palette.pinkToPurple,
    color: 'white'
  },
  notificationsIcon: {
    marginRight: '5px',
    fontSize: '0px'
  },
  logoLink: {
    display: 'none',
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.up('lg')]: {
      display: 'inline'
    }
  },
  logo: {
    display: 'inline',
    fontFamily: '"goodtimesrg", "Logofont", sans-serif',
    '&:hover': {
      opacity: '0.8'
    }
  },
  logoImg: {
    height: 28,
    marginRight: 8,
    verticalAlign: 'middle'
  },
  link: {
    textDecoration: 'none'
  },
  badge: {
    padding: '6px',
    '&:hover': {
      borderRadius: '30px',
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  register: {
    paddingRight: '10px',
    color: 'white',
    borderRight: '2px solid white'
  },
  login: {
    color: 'white',
    marginLeft: '10px'
  }
});

const StyledIconButton = withStyles({
  label: {
    display: 'block'
  }
})(IconButton);

class Navbar extends Component {
  logoData =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDguMjEgMTUxLjUiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZjBjNDE4fS5jbHMtMntmaWxsOiNmZmZ9PC9zdHlsZT48L2RlZnM+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48ZWxsaXBzZSBjbGFzcz0iY2xzLTEiIGN4PSI0NCIgY3k9IjYyLjcxIiByeD0iMTcuMjMiIHJ5PSIxNS43OSIvPjxlbGxpcHNlIGNsYXNzPSJjbHMtMSIgY3g9IjE2MCIgY3k9IjU1LjcxIiByeD0iMTcuMjMiIHJ5PSIxNS43OSIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iMjE3IiBjeT0iMjEuMjEiIHI9IjE3LjIzIi8+PGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSI5OCIgY3k9IjM2LjIxIiByPSIxNy4yMyIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTMwIDQ5LjVjMy41MyAzLjMxIDEwLjk0IDEwLjQzIDE3IDEwLjQzaDE5LjkxcTI0IDAgMzYuNCAxMS4yM3QxMi40MiAzNC4xM2E1My44MiA1My44MiAwIDAgMS0zIDE4LjM2IDM5LjYzIDM5LjYzIDAgMCAxLTkuMDcgMTQuNTggNDEuNDMgNDEuNDMgMCAwIDEtMTUuMjMgOS42MSA2MC43MyA2MC43MyAwIDAgMS0yMS40OSAzLjQ2SDMuMzN2LTI3LjQzaDYzLjU4cTExIDAgMTctNS42MnQ1Ljk0LTE0LjlxMC0xMC4xNi01Ljk0LTE1LjIzdC0xNy01LjEySDQ2Ljc3YTU2LjUxIDU2LjUxIDAgMCAxLTIwLTMuMzUgNDMuMTEgNDMuMTEgMCAwIDEtMTUuMTItOS4yOEM3LjU2IDY2LjQ1IDAgNTUuNDEgMCA0OS41em0xMjcuNjMgMTAuNmwtLjA3LTEwLjZjLTkgMC0xOC40NC0uMjktMjcuMjktLjI5VjE1MS4zbDI3LjU2LjItLjItNjQuODMiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNTYuMTMgODYuNjdoMzguNTJjOS4wNyAwIDE5LS44NiAyNi4xOC0zLjY3czEyLjk0LTYuMTIgMTgtMTFjNC44NC00LjY4IDktMTUuNzQgOS4zOC0yMi41aC0zMWMtMy4yMiA2LjMxLTEyLjkzIDEwLjYtMjIuNTcgMTAuNmgtMzguNTFNLjEyIDMwQzAgOC40NiAxNy40NiAwIDM5IDBoMTcwYzIxLjU0IDAgMzkgOC40NiAzOSAzMGgtMzAuNzhjLTIuMzktOC0xNC4zOS02LTIyLjU3LTZoLTM3LjA4djZoLTI3LjN2LTZoLTY5Yy0yLjM3LS4wOS0xMC40My0uMTUtMTQuMjQgMHMtMTMuMTYgMS0xNyA2eiIvPjwvZz48L2c+PC9zdmc+';

  state = {
    anchorEl: null,
    anchorElNotifications: null
  };

  // handleSave = () => {
  //   const { tasksHistory, questionsHistory } = this.props.profile.profile;
  //   const { assignment } = this.props.profile;

  //   const subjects = ['Math', 'Reading', 'Writing'];

  //   const currentAssTasks = tasksHistory.filter(
  //     taskHistory => taskHistory.taskContent.subject === subjects[assignment]
  //   );

  //   const currentAssQuestions = questionsHistory.filter(
  //     questionHistory => questionHistory.questionContent.subject === subjects[assignment]
  //   );

  //   // Find current subject
  //   const currentSubject = currentAssTasks[0].taskContent.subject;

  //   const currentAssQuestionsData = currentAssQuestions.map(currentQuestion => ({
  //     _id: currentQuestion.questionContent._id,
  //     answered: currentQuestion.answered,
  //     selected: currentQuestion.selected
  //   }));

  //   this.props.updateQuestions({
  //     assignment,
  //     currentSubject,
  //     currentAssQuestionsData
  //   });
  // };

  handleMenuNotifications = e => {
    this.setState({ anchorElNotifications: e.currentTarget });
  };

  handleMenuNotificationsClose = () => {
    this.setState({ anchorElNotifications: null });
  };

  render() {
    const { classes, handleDrawerToggle, path } = this.props;
    const { assignment } = this.props.profile;
    const { isAuthenticated } = this.props.auth;
    const { anchorEl, anchorElNotifications } = this.state;
    const open = Boolean(anchorEl);
    const openNotifications = Boolean(anchorElNotifications);

    const authLinks = (
      <div className={classes.container}>
        {/* Notifications Icon */}
        <StyledIconButton
          className={classes.notificationsIcon}
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenuNotifications}
          color="inherit"
        >
          <NotificationsIcon />
        </StyledIconButton>

        {/* Notifications Menu */}
        <Menu
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={openNotifications}
          onClose={this.handleMenuNotificationsClose}
        >
          <MenuItem onClick={this.handleMenuNotificationsClose}>Your notifications</MenuItem>
        </Menu>

        {/* User Icon */}

        {/* User Menu */}

        <UserMenu />
      </div>
    );

    const guestLinks = (
      <div className={classes.container}>
        <LinkCustom to="/register" className={classes.register}>
          <Typography component="h1" variant="body1" color="inherit">
            Register
          </Typography>
        </LinkCustom>
        <LinkCustom to="/login" className={classes.login}>
          <Typography component="h1" variant="body1" color="inherit">
            Login
          </Typography>
        </LinkCustom>
      </div>
    );

    const questionFeedLinks = (
      <LinkCustom to="/dashboard">
        <ButtonCustom
          size="small"
          backgroundColor="white"
          hasArrowLeft /* onClick={this.handleSave} */
        >
          Return
        </ButtonCustom>
      </LinkCustom>
    );
    return (
      <React.Fragment>
        <AppBar
          className={classNames(
            classes.appBarBase,
            path === '/question-feed' &&
              (assignment === 0
                ? classes.appBarMath
                : assignment === 1
                ? classes.appBarReading
                : classes.appBarWriting)
          )}
          position="static"
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Grid item className={classes.grow}>
              <a className={classes.logoLink} href="https://synapseprep.net">
                <img src={this.logoData} alt="Synapse Prep logo" className={classes.logoImg} />
                <Typography className={classes.logo} variant="caption" color="inherit">
                  Synapse Prep
                </Typography>
              </a>
            </Grid>
            <Grid item>
              {path === '/question-feed'
                ? questionFeedLinks
                : isAuthenticated
                ? authLinks
                : guestLinks}
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default withStyles(styles)(
  connect(mapStatetoProps, { logoutUser, updateQuestions })(withRouter(Navbar))
);
