// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom.jsx'

// Material UI Components
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardCustom from '../assets/jss/components/CardCustom.jsx'
import Barchart from './Barchart'


// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  scoresContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    marginTop: 80,
  },
  cardBottomTextContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: 'solid 1px lightgrey',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
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
cardInner: {
padding: '20px',
},
});



const EstimatedScores = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid className={classes.scoresContainer} item xs={12}>
        <Typography variant="h6" component="h2" color="textPrimary" className={classes.title}>
          Estimated Scores
          </Typography>
        <CardCustom className={classes.topCardContainer}>
          <Grid container justify='center' className={classes.cardInner}>
         
   
           
              <Barchart 
             
              gradientId="barChart"
              
              />
              
 
           
          </Grid>
        </CardCustom>
        <CardCustom className={classes.cardBottomTextContainer}>


          <Grid container align='center' direction='column'>

            <Typography variant='subtitle2' className = {classes.bottomText}>
              These are the scores we think you'd get if you took the SAT today
</Typography>
          </Grid>

        </CardCustom>
      </Grid>
    </React.Fragment>
  )
}

EstimatedScores.propTypes = {

};

export default withStyles(styles)(EstimatedScores);
