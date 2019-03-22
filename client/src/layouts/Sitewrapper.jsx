// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import SideMenuCustom from './SideMenuCustom.jsx'
// import MenuTest from './MenuTest'

// Material UI Components

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  flex: {
    display: 'flex',
    backgroundColor: '#f6f9fc',
  },
  main: {
    padding: '100px 4%',
    width: '100%',
    flexGrow: 1,
    
  },
  
});

class SiteWrapper extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Navbar handleDrawerToggle={this.handleDrawerToggle} />
        <div className={classes.flex}>
        
        
          <Sidebar
          handleDrawerToggle={this.handleDrawerToggle}
          mobileOpen = {this.state.mobileOpen} />
        
          <div className={classes.main}>
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SiteWrapper);
