import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




import Navbar from './Navbar'

import Sidebar from './Sidebar'


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
})

class Dashboard extends Component {


  render () {
    const { classes } = this.props;
    return (

        <main className={classes.content}>
          <Card className={classes.card}>
        <CardContent>
        <Typography variant='h4' className={classes.title} color="textSecondary" gutterBottom>
           Feed
        </Typography>
        <Typography variant="h5" component="h2">
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        These are your most important practice questions
        </Typography>
        <Typography component="p">
        Lorem ipsum dolor sit amet,
          <br />
          {'"Lorem ipsum dolor sit amet,"'}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
        <Card className={classes.progress}>
        <CardContent>
        </CardContent>
        </Card>
        </main>


    )
  };
};

export default withStyles(styles)(Dashboard);
