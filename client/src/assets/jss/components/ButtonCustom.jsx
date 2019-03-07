import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    border: 'none',
    cursor: 'pointer',
    fontSize: 'inherit',
    position: 'relative',
    textTransform: 'uppercase',
    zIndex: '10',
    WebkitAppearance: 'none',
    borderBottom: '0',
    borderRadius: '3px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontStyle: 'normal',
    transition: '0.3s',
    backgroundColor: '#2980ba',
    color: '#FFF',
    padding: '16px 31px',
    fontWeight: 500,
    letterSpacing: '2px',
    '&:hover': {
      transform: 'translateY(1px)',
      backgroundColor: '#2980ba',

    }
  },
});

const ButtonCustom = (props) => {
  const { classes } = props;
  return (
    <Button className={classes.root}> {props.children} </Button>
  )
};

export default withStyles(styles)(ButtonCustom);