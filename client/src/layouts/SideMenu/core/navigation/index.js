import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  navigation: {
    marginBottom: 'auto',
    overflow: 'auto',
    flex: 1,
    flexBasis: 0,
  }
})


const Navigation = ({ children, className, classes }) => (
  <div
    className={classnames(classes.navigation, className)}
    data-hook="menu-navigation"
  >
    {children}
  </div>
);

Navigation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(Navigation);
