import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { withStyles } from '@material-ui/core/styles';

  const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: '#fff',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    },
})

const SideMenu = ({ children, className, dataHook, classes}) => {
  

  return (
    <div className={classNames(classes.root, className)} data-hook={dataHook}>
      {children}
    </div>
  );
};

SideMenu.defaultProps = {
  inFlex: false,
};

SideMenu.propTypes = {
  inFlex: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  dataHook: PropTypes.string,
};

export default withStyles(styles)(SideMenu);
