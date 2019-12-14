// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import classNames from 'classnames';

// Material UI Components

// Local Components

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '30px'
    }
  }
});

const E = props => {
  const { children, className, classes, ...rest } = props;

  return (
    <TeX
      settings={{
        macros: {
          '\\red': '\\textcolor{red}',
          '\\blue': '\\textcolor{#2980ba}',
          '\\green': '\\textcolor{#00BF6F}',
          '\\purple': '\\textcolor{#7336df}'
        }
      }}
      className={classNames(classes.root, className)}
      {...rest}
    >
      {children}
    </TeX>
  );
};

E.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(E);
