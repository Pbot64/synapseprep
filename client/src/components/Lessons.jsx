// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



// Local Components

// Material UI Components

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
  background: {
    color: '#ff0000'
  }
});

const Lessons = (props) => {
  const { classes } = props
  return (
          <div>
            <div className = {classes.background}>
            <p>Hello</p>
            {props.children}
            </div>
          </div>   
  )
}

  Lessons.propTypes = {
   
  };

  export default withStyles(styles)(Lessons);


 