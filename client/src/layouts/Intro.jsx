// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Lessons from '../components/Lessons'
import Table from './Table'

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  text: {
    lineHeight: 3,
    flexBasis: '300px'
  },
});

const Intro = (props) => {
  const { classes } = props
  return (
    <div>
      <Lessons>
    
        <Typography className = {classes.text} variant='h5' color="textSecondary" gutterBottom>
        The SAT is a 3-hour long beast of a test (3 hours 50 minutes with essay). <br/>
  It has 4 parts--Reading, Writing and Language, Math, and an optional Essay. . <br/>
  Here’s the breakdown: 
        </Typography>
        <Table/>
      </Lessons>
    </div>
  )
}

export default withStyles(styles)(Intro);
