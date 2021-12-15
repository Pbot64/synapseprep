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
  // console.log('children', children);
  // console.log('typeof children', typeof children);
  // console.log('string.raw`${children}`', String.raw`${children}`);
  // console.log('type of string children', typeof String.raw`${children}`);
  return (
    <TeX
      settings={{
        strict: 'ignore',
        macros: {
          '\\l': '\\\\[0.5em]',
          '\\lf': '\\\\[1.5em]',
          '\\red': '\\textcolor{red}',
          '\\blue': '\\textcolor{#4fa3eb}',
          '\\green': '\\textcolor{#00BF6F}',
          '\\purple': '\\textcolor{#7336df}',
          '\\black': '\\textcolor{343e4d}'
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
