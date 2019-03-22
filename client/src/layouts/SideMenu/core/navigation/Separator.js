import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
separator: {
  margin: '20px 30px',
  borderBottom: '1px solid #577083',
},
})

const Separator = ({ children, className, classes }) => (
  <div
    className={classnames(classes.separator, className)}
    data-hook="menu-navigation-separator"
  >
    {children}
  </div>
);

Separator.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(Separator);
