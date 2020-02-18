// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material UI Components
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import SidebarList from '../components/SidebarList';

// Local Assets

//  Style Overrides
const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'flex'
    }
  },
  noDrawer: {
    display: 'none'
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 999
  },
  card: {
    maxWidth: 600
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  }
});

class Sidebar extends Component {
  state = {
    practiceMenuOpen: false,
    lessonsMenuOpen: false
  };

  handleClick = menu => {
    switch (menu) {
      case 'Practice':
        this.setState(state => ({ practiceMenuOpen: !state.practiceMenuOpen }));
        break;
      case 'Lessons':
        this.setState(state => ({ lessonsMenuOpen: !state.lessonsMenuOpen }));
        break;
      default:
        return null;
    }
  };

  render() {
    const { classes, theme, children, handleDrawerToggle, mobileOpen } = this.props;
    const { location } = this.props.history;
    const { practiceMenuOpen, lessonsMenuOpen } = this.state;
    console.log('props', this.props);
    return (
      <div className={classes.root}>
        <nav className={location.pathname === '/question-feed' ? classes.noDrawer : classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden
            {...(location.pathname === '/testing' ? { mdUp: true } : { lgUp: true })}
            implementation="css"
          >
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {children || (
                <SidebarList
                  handleClick={this.handleClick.bind(this)}
                  handleDrawerToggle={handleDrawerToggle}
                  practiceMenuOpen={practiceMenuOpen}
                  lessonsMenuOpen={lessonsMenuOpen}
                />
              )}
            </Drawer>
          </Hidden>
          <Hidden
            {...(location.pathname === '/testing' ? { smDown: true } : { mdDown: true })}
            implementation="css"
          >
            {/* <Hidden> */}
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {children || (
                <SidebarList
                  handleClick={this.handleClick.bind(this)}
                  practiceMenuOpen={practiceMenuOpen}
                  lessonsMenuOpen={lessonsMenuOpen}
                />
              )}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(Sidebar));
