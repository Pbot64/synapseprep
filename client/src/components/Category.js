// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


// Local Assets
import star from '../assets/images/Icon-Star.svg'
import vertMenu from '../assets/images/Icon-VertMenu.svg'

//  Style Overrides 
const styles = theme => ({
  font: {
    width: '100%',
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      width: '50%',
      textAlign: 'left',
    },
  },
  topicContainer: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '400px',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  },
  topic: {
    position: 'relative',
    maxWidth: '140px',
    height: '140px',
    backgroundBlendMode: 'color-burn',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    marginBottom: '15px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  star: {
    extend: 'subIconBase',
    left: '10px',
  },
  subIconBase:{
  width: '15px',
  position: 'absolute',
  top: '15px',
  },
  svg: {
    width: '75px',
    height: '65px',
  },
  vertMenu: {
    extend: 'subIconBase',
    right: '10px',
  },
});

const Category = (props) => {
  const { classes, children, src } = props;
  return (
    <React.Fragment>
      <Grid item container xs={12} sm={3} md={3} className={classes.topicContainer} justify='center' alignContent='flex-start'>
        <Grid item container xs={6} sm={12} className={classes.topic}>
          <img src={star} className={classes.star} alt='star' />
          <img src={src} className={classes.svg} alt={src} />
          <img src={vertMenu} className={classes.vertMenu} alt='vertMenu' />
        </Grid>
        <Typography variant='subtitle2' align='center' className={classes.font}>
          {children}
        </Typography>
      </Grid>
    </React.Fragment>
  )
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
