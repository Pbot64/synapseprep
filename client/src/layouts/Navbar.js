// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { clearCurrentProfile } from '../actions/profileActions';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';

// Local Components
import MenuTest from '../components/Menu';
import LinkCustom from '../assets/jss/components/LinkCustom';

// Local Assets
import wavePattern from '../assets/images/wavePattern.png';
import * as colors from '../assets/jss/components/colors';

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
  appBar: {
    position: 'fixed',
    ...colors.blueToGreen,
    color: 'white'
  },
  notificationsIcon: {
    marginRight: '5px',
    fontSize: '0px'
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    }
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
  state = {
    anchorEl: null,
    anchorElNotifications: null
  };

  handleMenuNotifications = e => {
    this.setState({ anchorElNotifications: e.currentTarget });
  };

  handleMenuNotificationsClose = () => {
    this.setState({ anchorElNotifications: null });
  };

  render() {
    const { classes, handleDrawerToggle } = this.props;
    const { isAuthenticated, user } = this.props.auth;
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
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
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

        <MenuTest />
      </div>
    );

    const guestLinks = (
      <div className={classes.container}>
        <LinkCustom to="./register" className={classes.register}>
          <Typography component="h1" variant="body1" color="inherit">
            Register
          </Typography>
        </LinkCustom>
        <LinkCustom to="./login" className={classes.login}>
          <Typography component="h1" variant="body1" color="inherit">
            Login
          </Typography>
        </LinkCustom>
      </div>
    );

    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="static">
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
              <Typography variant="caption" color="inherit" className={classes.logo}>
                Synapse Prep
              </Typography>
            </Grid>
            <Grid item className="navlinks">
              {isAuthenticated ? authLinks : guestLinks}
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
  auth: state.auth
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { logoutUser, clearCurrentProfile }
  )(Navbar)
);
