// Node Modules
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Material UI
import { Button, Box } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

// Local assets

// Style Overrides
const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontSize: '0.875rem',
    letterSpacing: '2px',
    transition: 'transform 0.3s',
    // paddingLeft: '5px',
    // paddingRight: '5px',
    '&:hover': {
      transform: 'translateY(1px)'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },
  hasChevronRight: {
    paddingRight: '0px',
    paddingLeft: '8px',
    '&:hover $chevron': {
      transform: 'translateX(2px)'
    }
  },
  hasChevronLeft: {
    paddingLeft: '0px',
    paddingRight: '8px',
    '&:hover $chevron': {
      transform: 'translateX(-2px)'
    }
  },
  chevron: props => ({
    color: props.color === 'green' && 'white',
    transition: 'transform 0.3s',
    height: '30px',
    width: '30px'
  }),
  testing2: {
    ...theme.palette.blueToGreen,
    color: 'white'
  },
  backgroundColor: props => ({
    backgroundColor: props.backgroundColor,
    '&:hover': {
      backgroundColor: props.backgroundColor
    }
  }),
  green: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}));

export default function ButtonCustom(props) {
  const classes = useStyles(props);
  const {
    className,
    hasArrowRight,
    hasArrowLeft,
    hasArrowRightWhite,
    children,
    color,
    backgroundColor = 'white',
    chevron,
    colorInner,
    size,
    ...rest
  } = props;

  // (chevron && chevron !== 'left') ? chevron === 'right' ? ''
  // (chevron === true &&

  // if (chevron === true && chevron !== 'left') {
  //   chevron = 'right';
  // }

  //   if (chevron && chevron !== 'right' && chevron !== 'left') {
  //     chevron
  //   } else if (chevron === 'left') {
  // chevron
  //   }

  //* The 4 potenial Chevron values
  // 1) chevron === 'left'
  // 2) chevron === 'right'
  // 3) chevron === true
  // triggers `hasChevron${capitalize(chevron || '')}`]

  // 4) chevron === false
  // Nothing happens

  return (
    <>
      <Button
        className={clsx(
          classes.root,
          {
            [classes.backgroundColor]: backgroundColor,
            [classes[`hasChevronRight`]]: chevron && chevron !== 'left',
            [classes[`hasChevronLeft`]]: chevron === 'left',
            [classes.green]: color === 'green'
          },
          className
        )}
        size={size}
        {...rest}
      >
        <Box display='flex' alignItems='center'>
          {chevron === 'left' && <ChevronLeft className={classes.chevron} />}
          {children}
          {chevron && chevron !== 'left' && <ChevronRight className={classes.chevron} />}
        </Box>
      </Button>
    </>
  );
}
