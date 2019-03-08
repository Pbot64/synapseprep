// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom.jsx'
import CardCustom from '../assets/jss/components/CardCustom.jsx'


// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
    paddingTop: 50,
    justifyContent: 'space-around',
    position: 'sticky',
    top: 0,
  },
  videoContainer: {
    
    height: 250,  
  
    flexBasis: '600px'
  },
  title: {
    padding: '16px 50px',
  },
});

const Lessons = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
        <div className = {classes.headerContainer}>
        <CardCustom>
          <Grid container align='center' direction='column'>
            <Typography variant='h3' className={classes.title} color="textSecondary" >
              What is the SAT?
           </Typography>
          </Grid>
        </CardCustom>
        </div>
  
      <div className={classes.mainContainer}>
    
        <CardCustom className={classes.videoContainer}>
          <Grid container align='center' direction='column'>
            <Typography variant='h3' className={classes.title} color="textSecondary" >
              Video
           </Typography>
            <Typography variant='subtitle1' color="textSecondary" gutterBottom>
              Video Box Here
           </Typography>
          </Grid>
        </CardCustom>
    
      </div>
      {props.children}
    </div>
  )
}

Lessons.propTypes = {

};

export default withStyles(styles)(Lessons);


