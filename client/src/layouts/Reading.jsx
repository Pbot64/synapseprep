// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Lessons from '../components/Lessons'
// Material UI Components

// Local Assets

//  Style Overrides (to this component only)
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
