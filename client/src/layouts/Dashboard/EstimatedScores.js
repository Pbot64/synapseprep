// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardCustom from '../../assets/jss/components/CardCustom.js'
import CustomBarchart from '../../components/Barchart'

// Local Components

// Local Assets

//  Style Overrides 
const styles = theme => ({
  root: {
    marginTop: 50,
  },
  bottomCardContainer: {
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    padding: 5,
    backgroundColor: 'white',
    borderTop: 'solid 1px lightgrey',
  },
  topCardContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    paddingBottom: '10px',
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`,
  },
  topCardInner: {
    padding: '20px',
  },
});

const EstimatedScores = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid item container className={classes.root} >
        <Grid item xs={12} sm={12} md={10}>
           <CardCustom title = 'Estimated Scores' borderBottom className={classes.topCardContainer}>
            <Grid container justify='center' className={classes.topCardInner}>
              <CustomBarchart gradientId="barChart" />
            </Grid>
          </CardCustom>
          <div className={classes.bottomCardContainer}>
            <Grid container align='center' direction='column'>
              <Typography variant='subtitle2' className={classes.bottomText}>
                These are the scores we think you'd get if you took the SAT today
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

EstimatedScores.propTypes = {

};

export default withStyles(styles)(EstimatedScores);
