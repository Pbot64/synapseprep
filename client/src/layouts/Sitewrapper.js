// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Grid from '@material-ui/core/Grid';

// Local Components
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SideMenuCustom from './SideMenuCustom.js'

// Local Assets

//  Style Overrides 
const styles = theme => ({
  dashboardContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f6f9fc',
    flexGrow: 1,
    maxWidth: '1500px',
    padding: '100px 4%',
    width: '100%',
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
        <Grid container wrap='nowrap'>
          <Sidebar
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
          />
          <div className={classes.dashboardContainer}>
            {this.props.children}
          </div>
        </Grid>
      </React.Fragment>
    )
  }
}

SiteWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SiteWrapper);
