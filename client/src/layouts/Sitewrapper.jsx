import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

import Navbar from './Navbar'

import Sidebar from './Sidebar'

import Dashboard from './Dashboard'

const styles = theme => ({
  flex: {
    display: 'flex',
    height: '1000px',
    backgroundColor: '#f6f9fc',

  },
  main: {
    paddingTop: theme.spacing.unit * 13,
    padding: theme.spacing.unit * 5,
  },
});

class SiteWrapper extends Component {
  state = {
    mobileOpen: false,
  };


handleDrawerToggle = () => {
  this.setState(state => ({ mobileOpen: !state.mobileOpen }));
};

render () {
  const { classes } = this.props;
  return (
    <div>
        <Navbar handleDrawerToggle = {this.handleDrawerToggle} />
        <div className = {classes.flex}>
        <Sidebar
          handleDrawerToggle = {this.handleDrawerToggle}
          mobileOpen = {this.state.mobileOpen}
          />
        <div className = {classes.main}>
          {this.props.children}
        </div>
          </div>
    </div>
    )
  }
}

export default withStyles(styles)(SiteWrapper);
