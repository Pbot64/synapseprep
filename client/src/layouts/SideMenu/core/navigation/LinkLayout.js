import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  linkLayout: {
    color: 'white',
    display: 'block',
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
      '& a': {
        color: '#9fd8fc'
      },
      '& $linkArrow': {
        opacity: 100,
      },
    },
    '& a': {
      display: 'block',
      padding: '12px 30px',
      transition: '.2s ease all',
      
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'none',
      lineHeight: '14px',
      color: 'black',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    '& .linkAnchor': {
      display: 'flex',
      alignItems: 'center',
      '& .linkChildren': {
      flexGrow: 1,
    },
  },
    '& .linkDiminishedHover': {
    '&:hover': {
      background: 'transparent',
      color: 'red',
    },
  },
  '& .linkDiminishedHover:focus, & .linkDiminishedHover:focus a': {
    background: 'transparent',
    background: 'red',
  },
  '&:hover:not(.linkActive),  &:focus:not(.linkActive), &:hover:not(.linkActive) a, &:focus:not(.linkActive) a': {
    background: 'rgba(0, 0, 0, 0.02)',
    transition: '0.3s',
  },
},
  linkActive: {
    '& a': {
    color: '#3899ec',
    background: 'rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    },
  }, 
});


const LinkLayout = ({
  classes,
  children,
  isDiminishedHover,
  isActive,
  disabled,
  className,
  ...rest
}) => (
 
  <span
    className={classnames(
      classes.linkLayout,
      {
        [classes.linkActive]: isActive,
        [classes.linkDiminishedHover]: isDiminishedHover,
        [classes.linkDisabled]: disabled,
      },
      className,
    )}
    data-hook="menu-navigation-link-wrapper"
    data-link-active={isActive} // hack to allow styling
    {...rest}
  >
    {children}
  
  </span>
);

LinkLayout.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDiminishedHover: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default withStyles(styles)(LinkLayout);
