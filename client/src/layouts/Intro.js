// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Pdf from '../assets/pdf/book.pdf'

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProgressMobileStepper from '../components/Stepper'

// Local Components
import Lessons from '../components/Lessons'
import right_arrow from '../assets/images/right_arrow.svg';
import ButtonCustom from '../assets/jss/components/ButtonCustom'

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
  },
  paragraph: {
    marginTop: 50,
    lineHeight: 2,
  },
  arrowsContainer: {
    marginTop: 100,
  }
});

const Intro = (props) => {
  const { classes, match } = props
  return (
    <div>
  
    <div className = {classes.root}>
    <Grid container align='center' direction='column'>
            <Typography variant='h3' className={classes.title} color="textPrimary" >
              Welcome to the Course!
           </Typography>
          </Grid>
          <Typography className = {classes.paragraph} variant='body1' color="textPrimary" gutterBottom>
        <br/>
  You'll learn best by actually writing in the answers by hand <br/>
  Download and Print the PDF in the link
        </Typography>
    <ButtonCustom href= {Pdf}>Link to PDF</ButtonCustom>
    <ProgressMobileStepper />
    <div className = {classes.arrowsContainer}>
   
        <Link to={`${match.url}:1`} className={classes.link}>
       
        <img src={right_arrow} alt={right_arrow} width='40' />
        </Link>
       
        </div>
      
        </div>
    
    </div>
  )
}

export default withStyles(styles)(Intro);
