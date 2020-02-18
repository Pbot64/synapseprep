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
  },
  half: {
    marginBottom: '5px'
  }
});

const EquationBase = props => {
  const { children, className, classes, half, ...rest } = props;
  console.log('theprops', props);
  // const latex = (...a) => String.raw(...a).replace('\\`', '`');

  // console.log(latex`${children}`);
  return (
    <TeX
      settings={{
        macros: {
          '\\l': '\\\\[0.5em]',
          '\\lf': '\\\\[1.8em]',
          '\\red': '\\textcolor{red}',
          '\\blue': '\\textcolor{#2980ba}',
          '\\green': '\\textcolor{#00BF6F}',
          '\\purple': '\\textcolor{#7336df}'
        }
      }}
      className={classNames(
        classes.root,
        {
          [classes.half]: half
        },
        className
      )}
      {...rest}
    >
      {children}
    </TeX>
  );
};

EquationBase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EquationBase);
