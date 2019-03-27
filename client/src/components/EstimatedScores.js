// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardCustom from '../assets/jss/components/CardCustom.js'
import CustomBarchart from './Barchart'

// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom.js'

// Local Assets

//  Style Overrides 
const styles = theme => ({
  root: {
    marginTop: 50,
  },
  bottomCardContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: 'solid 1px lightgrey',
    padding: 5,
  },
  topCardContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 18,
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
          <Typography variant="h5" component="h2" color="textPrimary" className={classes.title}>
            Estimated Scores
           </Typography>
          <CardCustom className={classes.topCardContainer}>
            <Grid container justify='center' className={classes.topCardInner}>
              <CustomBarchart gradientId="barChart" />
            </Grid>
          </CardCustom>
          <CardCustom className={classes.bottomCardContainer}>
            <Grid container align='center' direction='column'>
              <Typography variant='subtitle2' className={classes.bottomText}>
                These are the scores we think you'd get if you took the SAT today
              </Typography>
            </Grid>
          </CardCustom>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

EstimatedScores.propTypes = {

};

export default withStyles(styles)(EstimatedScores);
