import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import PieChart from '@material-ui/icons/PieChart';
import School from '@material-ui/icons/School';
import Settings from '@material-ui/icons/Settings';
import StarBorder from '@material-ui/icons/StarBorder';
import Timer from '@material-ui/icons/Timer';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    opacity: 0.8,
  },
  toolbar: theme.mixins.toolbar,
  link : {
    color: 'inherit',
    textDecoration: 'none',
  }
})



const SideList = (props) => {
  const { classes } = props;

  return (
  <div>
    <div className={classes.toolbar} />
    <Divider />
        <List component="nav">
<Link to = './dashboard' className = {classes.link}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          <ListItemText inset primary="Dashboard" />
          </ListItem>
        </Link>


          <ListItem button onClick={props.handleClick}>
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText inset primary="Lessons" />

            {props.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>



      <Collapse in={props.open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
        <Link to = './intro' className = {classes.link}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Intro" />

          </ListItem>
</Link>
        </List>

      </Collapse>


      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Reading" />
          </ListItem>
        </List>
      </Collapse>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Writing" />
          </ListItem>
        </List>
      </Collapse>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PieChart />
            </ListItemIcon>
            <ListItemText inset primary="Math" />
          </ListItem>
        </List>
      </Collapse>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Essay" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <Timer />
        </ListItemIcon>
        <ListItemText inset primary="Full Tests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText inset primary="Review" />
      </ListItem>
    </List>
    <Divider />
    <List>
      {['Settings', 'Support'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <Settings /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
  )
};

export default withStyles(styles)(SideList);
