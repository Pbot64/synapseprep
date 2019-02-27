import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser} from '../actions/authActions'
import { withStyles } from '@material-ui/core/styles';


// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import wavePattern from '../assets/images/wavePattern.png'



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
    backgroundColor:'#d12229',
    flexGrow: 1
  },
  logo_title: {
      display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
})


class Navbar extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout(e) {
    e.preventDefault();
    this.handleClose();
    this.props.logoutUser();
  }
  render () {
    const { classes } = this.props;
    const {isAuthenticated, user } = this.props.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


    const authLinks = (
      <div className = 'container'>
        <IconButton
          className = {classes.iconButton}
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
        <Avatar className = {classes.avatar} src={user.avatar} alt={user.name}
          title = 'You must have a gravatar connected to your email to display an image'>
        </Avatar>
        </IconButton>
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
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick= {this.handleLogout.bind(this)}>Logout
          </MenuItem>
        </Menu>
      </div>
    );

    const guestLinks = (
      <div className = 'container'>
        <Link to = './register'>
          <h4>Register</h4>
          < /Link>
        <Link to = './login'>
          <h4>Login</h4>
          < /Link>
      </div>

  );
    return (
      <div >
        <AppBar className = {classes.appBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color= 'inherit'
              aria-label="Menu"
              onClick = {this.props.handleDrawerToggle}
              >
              <MenuIcon />
            </IconButton>
            <Grid item className = {classes.grow}>
              <Typography variant="h3" color='inherit' className = {classes.logo_title}>
                Synapse Prep
              </Typography>
            </Grid>
            <Grid item  className='navlinks'>
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
