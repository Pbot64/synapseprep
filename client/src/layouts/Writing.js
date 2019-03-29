// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Lessons from '../components/Lessons'
// Material UI Components

// Local Assets

//  Style Overrides 
const styles = theme => ({

});

const Intro = () => {
  return (
    <div>
      <Lessons>
        <h4>PDF LINK TO INTRO</h4>
      </Lessons>
    </div>
  )
}

export default withStyles(styles)(Intro);
