// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material UI Components
import Grid from '@material-ui/core/Grid';

// Local Components
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Local Assets

//  Style Overrides
const styles = theme => ({
  dashboardContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f6f9fc',
    flexGrow: 1,
    maxWidth: '1500px',
    padding: '75px 0px',
    'padding-left': '16px',
    'padding-right': '16px',
    [theme.breakpoints.up('sm')]: {
      padding: '90px 0px',
      'padding-left': '24px',
      'padding-right': '24px'
    },
    width: '100%'
  },
  dashboardWrapper: {
    minHeight: '100vh'
  }
});

class SiteWrapper extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    // let sideBar;
    // if (this.props.history.location.pathname == '/question-feed') {
    //   this.setState({ mobileOpen: false });
    // }

    const { classes } = this.props;
    return (
      <React.Fragment>
        <Navbar
          path={this.props.history.location.pathname}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <Grid item container wrap="nowrap" className={classes.dashboardWrapper}>
          <Sidebar
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
          />
          <div className={classes.dashboardContainer}>{this.props.children}</div>
        </Grid>
      </React.Fragment>
    );
  }
}

SiteWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SiteWrapper));
