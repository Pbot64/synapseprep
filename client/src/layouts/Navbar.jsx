// Node Modules
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions'
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

// Local Assets
import wavePattern from '../assets/images/wavePattern.png'

//  Style Overrides (to this component only)
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    width: '25px',
    height: '25px',
  },
  appBar: {
    position: 'fixed',
    zIndex: 1000,
    color: '#FFFFFF',
    background:
      'url(' + wavePattern + '), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',
    backgroundBlendMode: 'color-burn',
  },
  iconButton: {
    padding: '6px',
  },
  navlinks: {
    backgroundColor: '#d12229',
    flexGrow: 1
  },
  notificationsIcon: {
    padding: 6,
    marginRight: 15,
  },
  logo_title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
})

const StyledIconButton = withStyles({
  label: {
    display: 'block',
  },
})(IconButton);

class Navbar extends Component {
  state = {
    anchorEl: null,
    anchorElNotifications: null
  };

  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuNotifications = e => {
    this.setState({ anchorElNotifications: e.currentTarget });
  };

  handleMenuNotificationsClose = () => {
    this.setState({ anchorElNotifications: null });
  };

  handleLogout(e) {
    e.preventDefault();
    this.handleMenuClose();
    this.props.logoutUser();
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { anchorEl, anchorElNotifications } = this.state;
    const open = Boolean(anchorEl);
    const openNotifications = Boolean(anchorElNotifications)

    const authLinks = (
      <div className='container'>
        { /* Notifications Icon */}
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

        { /* Notifications Menu */}
        <Menu
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openNotifications}
          onClose={this.handleMenuNotificationsClose}
        >
          <MenuItem onClick={this.handleMenuNotificationsClose}>Your notifications</MenuItem>
        </Menu>

        { /* User Icon */}
        <IconButton
          className={classes.iconButton}
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <Avatar className={classes.avatar} src={user.avatar} alt={user.name}
            title='You must have a gravatar connected to your email to display an image'>
          </Avatar>
        </IconButton>

        { /* User Menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handleMenuClose}
        >
          <MenuItem></MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>Get Paid to Rep</MenuItem>
        </Menu>
      </div>
    );

    const guestLinks = (
      <div className='container'>
        <Link to='./register'>
          <h4>Register</h4>
        </Link>
        <Link to='./login'>
          <h4>Login</h4>
        </Link>
      </div>
    );

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label="Menu"
              onClick={this.props.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Grid item className={classes.grow}>
              <Typography variant="h3" color='inherit' className={classes.logo_title}>
                Synapse Prep
              </Typography>
            </Grid>
            <Grid item className='navlinks'>
              {isAuthenticated ? authLinks : guestLinks}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(mapStatetoProps, { logoutUser })(Navbar));