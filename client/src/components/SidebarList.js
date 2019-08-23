// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Material UI Components
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import School from '@material-ui/icons/School';
import Settings from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StarBorder from '@material-ui/icons/StarBorder';
import Timer from '@material-ui/icons/Timer';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';

// Local Components

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    opacity: 0.8
  },
  center: {
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  logoLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  logo: {
    '&:hover': {
      opacity: '0.6'
    }
  }
});

const StyledListItem = withStyles({
  button: {
    '&:focus': {
      backgroundColor: 'rgba(0,0,0,0.2)'
    }
  }
})(ListItem);

const SidebarList = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <a href="https://synapseprep.net" className={classes.logoLink}>
        <Toolbar className={classes.center}>
          <Typography className={classes.logo} variant="caption" color="inherit">
            Synapse Prep
          </Typography>
        </Toolbar>
      </a>

      <Divider />
      <List component="nav">
        <Link onClick={props.handleDrawerToggle} to="/dashboard" className={classes.link}>
          <StyledListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </StyledListItem>
        </Link>

        <StyledListItem
          button
          onClick={() => {
            props.handleClick('Lessons');
          }}
        >
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary="Lessons" />
          {props.lessonsMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem>

        <Collapse in={props.lessonsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link onClick={props.handleDrawerToggle} to="/intro" className={classes.link}>
              <StyledListItem button className={classes.nested}>
                <ListItemIcon />
                <ListItemText primary="Intro" />
              </StyledListItem>
            </Link>
          </List>
        </Collapse>
        <Collapse in={props.lessonsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/underConstruction" className={classes.link}>
              <StyledListItem button className={classes.nested}>
                <ListItemIcon />
                <ListItemText primary="Reading" />
              </StyledListItem>
            </Link>
          </List>
        </Collapse>
        <Collapse in={props.lessonsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/underConstruction" className={classes.link}>
              <StyledListItem button className={classes.nested}>
                <ListItemIcon />
                <ListItemText primary="Writing" />
              </StyledListItem>
            </Link>
          </List>
        </Collapse>
        <Collapse in={props.lessonsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon />
              <ListItemText primary="Math" />
            </StyledListItem>
          </List>
        </Collapse>
        <Collapse in={props.lessonsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon />
              <ListItemText primary="Essay" />
            </StyledListItem>
          </List>
        </Collapse>

        <StyledListItem
          button
          onClick={() => {
            props.handleClick('Practice');
          }}
        >
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Practice" />
          {props.practiceMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem>

        <Collapse in={props.practiceMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon />
              <ListItemText primary="Math" />
            </StyledListItem>
          </List>
        </Collapse>
        <Collapse in={props.practiceMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon />
              <ListItemText primary="Essay" />
            </StyledListItem>
          </List>
        </Collapse>

        <StyledListItem button>
          <ListItemIcon>
            <Timer />
          </ListItemIcon>
          <ListItemText primary="Full Tests" />
        </StyledListItem>

        <Link onClick={props.handleDrawerToggle} to="/review" className={classes.link}>
          <StyledListItem button>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Review" />
          </StyledListItem>
        </Link>
      </List>
      <Divider />

      <List>
        <Link onClick={props.handleDrawerToggle} to="/profile" className={classes.link}>
          <StyledListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>

            <ListItemText primary="Settings" />
          </StyledListItem>
        </Link>

        <StyledListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </StyledListItem>
      </List>
    </div>
  );
};

SidebarList.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarList);
