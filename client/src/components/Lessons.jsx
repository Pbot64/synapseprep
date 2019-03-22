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
import students from '../assets/images/students.jpg'

//  Style Overrides (to this component only)
const styles = theme => ({
  headerContainer: {
    paddingTop: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'sticky',
    top: 0,
    backgroundColor: '#f6f9fc',
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  videoContainer: {
    maxWidth: 1050,

    height: '500px',
  },
  title: {
    padding: '16px 50px',
  img: {
    width: '100%',
  },
  },
});

const Lessons = (props) => {
  const { classes } = props
  
  return (
    <div className={classes.root}>
      
  
      <div className={classes.mainContainer}>
    
        <CardCustom className={classes.videoContainer}>
          <Grid container align='center' direction='column'>
          <h1>What is the SAT?</h1>
            <img className = {classes.img} src = {students} ></img>
          </Grid>
        </CardCustom>

        
    
      </div>

      <div className = {classes.headerContainer}>
      
         
        
        </div>
      {props.children}
    </div>
  )
}

Lessons.propTypes = {

};

export default withStyles(styles)(Lessons);


