import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    textDecoration: 'none',
  },
});


const LinkCustom = (props) => {
  const { classes, className } = props;
  return (
    <Link className={classNames(classes.root, className)} {...props}> {props.children} </Link>
  )
};

export default withStyles(styles)(LinkCustom);

