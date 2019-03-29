// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components

// Local Components
import Lessons from '../components/Lessons'

// Local Assets

//  Style Overrides 
const styles = theme => ({

});

const Reading = () => {
  return (
    <div>
      <Lessons>

      </Lessons>
    </div>
  )
}

export default withStyles(styles)(Reading);
