import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Local assets
import chevronLeft from '../../../assets/images/chevron-left.svg';
import chevronRight from '../../../assets/images/chevron-right.svg';
import chevronRightWhite from '../../../assets/images/chevron-right-white.svg';
const styles = theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    color: 'black',
    display: 'flex',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '2px',
    position: 'relative',
    textTransform: 'uppercase',
    transition: 'transform 0.3s',
    zIndex: '10',
    '&:hover': {
      transform: 'translateY(1px)'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },
  green: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  hasArrowRight: {
    '&:after': {
      background: `url(${chevronRight}) no-repeat`,
      content: '""',
      height: '14px',
      marginLeft: '10px',
      transition: 'transform 0.5s',
      width: '14px'
    },
    '&:hover:after': {
      transform: 'translateX(5px)'
    }
  },
  hasArrowRightWhite: {
    '&:after': {
      background: `url(${chevronRightWhite}) no-repeat`,
      content: '""',
      height: '14px',
      marginLeft: '10px',
      transition: 'transform 0.5s',
      width: '14px'
    },
    '&:hover:after': {
      transform: 'translateX(5px)'
    }
  },
  hasArrowLeft: {
    '&:before': {
      background: `url(${chevronLeft}) no-repeat`,
      content: '""',
      height: '14px',
      marginRight: '10px',
      transition: '0.5s',
      width: '14px'
    },
    '&:hover:before': {
      transform: 'translateX(-5px)'
    }
  },
  backgroundColorWhite: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    }
  }
});

const ButtonCustom = props => {
  const {
    classes,
    className,
    hasArrowRight,
    hasArrowLeft,
    hasArrowRightWhite,
    children,
    color,
    backgroundColor,
    ...rest
  } = props;
  return (
    <Button
      className={classNames(
        classes.root,
        {
          [classes.hasArrowRight]: hasArrowRight,
          [classes.hasArrowLeft]: hasArrowLeft,
          [classes.hasArrowRightWhite]: hasArrowRightWhite,
          [classes.green]: color === 'green',
          [classes.backgroundColorWhite]: backgroundColor === 'white'
        },
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(ButtonCustom);
