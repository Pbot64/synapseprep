import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import wavePattern from '../assets/images/wavePattern.png'

import { Link } from 'react-router-dom'


import SideList from '../components/sideList'


const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'flex',
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    zIndex: 999,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
    backgroundColor: '#f6f9fc',
  },
  card: {
    maxWidth: 600,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
  progress: {
    maxWidth: 300,
    marginTop: 50,
  }
});

class Sidebar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
     open: false,
   };


  }


 handleClick = () => {
   this.setState(state => ({ open: !state.open }));
 };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.props.mobileOpen}
              onClose={this.props.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <SideList handleClick = {this.handleClick.bind(this)} open = {this.state.open} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
            <SideList handleClick = {this.handleClick.bind(this)} open = {this.state.open} />

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
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sidebar);
