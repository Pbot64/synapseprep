import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';



import chevronRight from '../../../assets/images/chevron-right.svg'


const styles = theme => ({
  root: {
    display: 'flex',
    border: 'none',
    fontSize: 'inherit',
    position: 'relative',
    textTransform: 'uppercase',
    zIndex: '10',
    borderBottom: '0',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontStyle: 'normal',
    transition: 'transform 0.3s',
    backgroundColor: 'white',
    color: 'black',
    padding: '8px 15px',
    fontWeight: 500,
    letterSpacing: '2px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
      transform: 'translateY(1px)',
      
    },
  },
  arrow: {
  
    '&:after': {
      content: '""',
      height: '14px',
      width: '14px',
      background: `url(${chevronRight}) no-repeat`,
      marginLeft: '10px',
      transition: '0.5s',
    },
    '&:hover:after': {
    transform: 'translateX(5px)',
    },
  },
});

const ButtonCustom = (props) => {
  const { classes, className, hasArrow, children, ...rest } = props;
  return (
    <Button 
    className={classNames(
      classes.root, 
      {
      [classes.arrow]: hasArrow
      }, 
      className
    )} 
    {...rest}
    > 
    {children} 
    </Button>
  )
};

export default withStyles(styles)(ButtonCustom);