import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';



import chevronRight from '../../../assets/images/chevron-right.svg'


const styles = theme => ({
  root: {
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    color: 'black',
    display: 'flex',
    fontSize: 'inherit',
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '2px',
    padding: '8px 15px',
    position: 'relative',
    textTransform: 'uppercase',
    transition: 'transform 0.3s',
    zIndex: '10',
    '&:hover': {
      transform: 'translateY(1px)', 
    },
  },
  arrow: {
    '&:after': {
      background: `url(${chevronRight}) no-repeat`,
      content: '""',
      height: '14px',
      marginLeft: '10px',
      transition: '0.5s',
      width: '14px',
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