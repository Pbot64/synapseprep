import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '200px',
        height: '100px',
         transition: '.3s',
        cursor: 'pointer',
    maxHeight: 1000,
    overflow: 'hidden',
    borderRadius: 10,
    background: '#f6f9fc',
    borderRadius: 10,
     boxShadow: '0 18px 56px -18px rgba(22,45,61,.18)',
    display: 'flex',
    '&:hover': {
        boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-3px)',
        background: '#f6f9fc',
    }
    },
});

  const ButtonStyled = (props) => {
    const { classes } = props;
    return (
    <Button className = {classes.root}> {props.children} </Button>
    )
  };
  
  export default withStyles(styles)(ButtonStyled);