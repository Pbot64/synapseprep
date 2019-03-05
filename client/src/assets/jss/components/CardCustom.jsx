import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
         transition: '.3s',
        cursor: 'pointer',
    maxHeight: 1000,
    overflow: 'hidden',
    borderRadius: 10,
    background: '#fff',
     boxShadow: '0 18px 56px -18px rgba(22,45,61,.18)',
    },
});

  const CardStyled = (props) => {
    const { classes } = props;
    return (
    <Card className = {classes.root}> {props.children} </Card>
    )
  };
  
  export default withStyles(styles)(CardStyled);