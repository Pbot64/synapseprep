import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';
import LinkLayout from './LinkLayout';

import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  linkBase: {
    display: 'block',
    padding: '12px 30px',
    transition: '.2s ease all',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    lineHeight: '14px',
  },
  linkAnchor: {
    display: 'flex',
    alignItems: 'center',
  },
  linkChildren: {
    flexGrow: '1',
  },
  linkArrow: {
    opacity: 0,
    fontSize: 10,
    transition: '0.5s',
    height: 24,
  },
  



 /* @include withRTL() {
  .linkArrow {
    transform: scaleX(-1);
  }

  backLink {
    '&:hover' {
      backArrow: {
        transform: translateX(5px);
      }
    }
  }

  .backArrow {
    > svg {
      transform: scale(-2);
    }
  } */


}) 


const Link = ({
  classes,
  children,
  isDiminishedHover,
  isActive,
  withArrow,
  badge,
  dataHook,
  disabled,
  ...rest,
}) => {
  return (
  <LinkLayout
    isDiminishedHover={isDiminishedHover}
    isActive={isActive}
    disabled={disabled}
  >
    <a data-hook={dataHook} {...rest} className={classes.linkAnchor}>
      <span className={classes.linkChildren}>{children}</span>
      {badge}
      {withArrow && (
        <span className={classes.linkArrow}>
          <ChevronRight />
        </span>
      )}
    </a>
  </LinkLayout>
  )
};

Link.defaultProps = {
  dataHook: 'menu-navigation-link',
  withArrow: false,
  disabled: false,
};

Link.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  withArrow: PropTypes.bool,
  badge: PropTypes.node,
  isDiminishedHover: PropTypes.bool,
  dataHook: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(Link);
