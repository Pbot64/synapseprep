// Node Modules
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Grid from '@material-ui/core/Grid';

// Local Components
import QuestionFeed from '../components/QuestionFeed'
import ContinueLesson from '../components/ContinueLesson';
import EstimatedScores from '../components/EstimatedScores';

// Local Assets

//  Style Overrides 
const styles = theme => ({
})

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container spacing={24} justify='space-between'>
        <QuestionFeed />
        <ContinueLesson />
      </Grid>
      <EstimatedScores />
    </React.Fragment>
  )
}

export default withStyles(styles)(Dashboard);
