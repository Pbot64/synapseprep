import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  linkLayout: {
    position: 'relative',
    display: 'block',
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
      '& $linkArrow': {
        opacity: 100,
      },
    },
    '&:hover, &:hover a': {
      color: '#9fd8fc',
    },
    '& a': {
      display: 'block',
      padding: '12px 30px',
      transition: '.2s ease all',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'none',
      lineHeight: '14px',
       color: 'black',
    },
    '& .linkAnchor': {
      display: 'flex',
      alignItems: 'center',
      '& .linkChildren': {
      flexGrow: 1,
    },
  },
  '& .linkDiminishedHover:hover, & .linkDiminishedHover:hover a': {
    background: 'transparent',
    color: '#4EB7F5',
  },
  '& .linkDiminishedHover:focus, & .linkDiminishedHover:focus a': {
    background: 'transparent',
  },
  '&:hover:not(.linkActive),  &:focus:not(.linkActive), &:hover:not(.linkActive) a, &:focus:not(.linkActive) a': {
    background: '#33566f',
    transition: '0.3s',
  },
},
  linkActive: {
    '& a': {
    color: '#9fd8fc',
    background: '#2A4F68',
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
