// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

// Local Components


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
import ListSubheader from '@material-ui/core/ListSubheader';
import PieChart from '@material-ui/icons/PieChart';
import School from '@material-ui/icons/School';
import Settings from '@material-ui/icons/Settings';
import StarBorder from '@material-ui/icons/StarBorder';
import Timer from '@material-ui/icons/Timer';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    opacity: 0.8,
  },
  center: {
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },

})

const StyledListItem = withStyles({
  button: {
    '&:focus': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
})(ListItem);

const SidebarList = (props) => {
  const { classes } = props;
  return (
    <div className = {classes.root}>
      <Link to='./' className={classes.link}>
        <Toolbar className={classes.center}>
          <Typography variant="caption" color='inherit'>
            Synapse Prep
          </Typography>
        </Toolbar>
      </Link>

      <Divider />
      <List component="nav">
        <Link to='./dashboard' className={classes.link}>
          <StyledListItem button   >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText inset primary="Dashboard" />
          </StyledListItem>
        </Link>

        <StyledListItem button onClick={props.handleClick}>
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText inset primary="Lessons" />
          {props.open ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem >

        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='./intro' className={classes.link}>
              <StyledListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Intro" />
              </StyledListItem >
            </Link>
          </List>
        </Collapse>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='./reading' className={classes.link}>
              <StyledListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Reading" />
              </StyledListItem >
            </Link>
          </List>
        </Collapse>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Writing" />
            </StyledListItem >
          </List>
        </Collapse>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon>
                <PieChart />
              </ListItemIcon>
              <ListItemText inset primary="Math" />
            </StyledListItem >
          </List>
        </Collapse>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Essay" />
            </StyledListItem >
          </List>
        </Collapse>

        <StyledListItem button onClick={props.handleClick}>
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText inset primary="Practice" />
          {props.open ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem >

        <StyledListItem button>
          <ListItemIcon>
            <Timer />
          </ListItemIcon>
          <ListItemText inset primary="Full Tests" />
        </StyledListItem >


        <StyledListItem button>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText inset primary="Review" />
        </StyledListItem >
      </List>
      <Divider />

      <List>
        {['Settings', 'Support'].map((text, index) => (
          <StyledListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <Settings /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </StyledListItem >
        ))}
      </List>
    </div>
  )
};

export default withStyles(styles)(SidebarList);
