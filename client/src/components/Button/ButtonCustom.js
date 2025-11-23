// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Material UI
import { Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

// Style Overrides
const styles = theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontSize: '0.875rem',
    letterSpacing: '2px',
    transition: 'transform 0.3s',
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
  chevron: {
    transition: 'transform 0.3s',
    height: '30px',
    width: '30px'
  },
  inline: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  backgroundColor: {
    '&:hover': {
      // hover color will be set inline
    }
  },
  green: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
});

const ButtonCustom = props => {
  const {
    classes,
    className,
    children,
    color,
    backgroundColor = 'white',
    chevron,
    colorInner,
    size,
    ...rest
  } = props;

  const chevronStyle = color === 'green' ? { color: 'white' } : undefined;
  const backgroundStyle = backgroundColor ? { backgroundColor } : undefined;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.backgroundColor]: Boolean(backgroundColor),
          [classes.hasChevronRight]: chevron && chevron !== 'left',
          [classes.hasChevronLeft]: chevron === 'left',
          [classes.green]: color === 'green'
        },
        className
      )}
      size={size}
      style={backgroundStyle}
      {...rest}
    >
      <span className={classes.inline}>
        {chevron === 'left' && <ChevronLeft className={classes.chevron} style={chevronStyle} />}
        {children}
        {chevron && chevron !== 'left' && (
          <ChevronRight className={classes.chevron} style={chevronStyle} />
        )}
      </span>
    </Button>
  );
};

export default withStyles(styles)(ButtonCustom);
