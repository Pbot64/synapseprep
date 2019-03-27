import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  backLink: {
    display: 'block',
    padding: '12px 30px',
    transition: '.2s ease all',
    color: 'black',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    lineHeight: '14px',
    position: 'relative',
    marginBottom: 36,
    marginTop: 21,
    '&:hover': {
      color: 'white',
      '& $backArrow': {
          transform: 'translateX(-5px)',
        },
      },
    },
    backArrow: {
      display: 'inline-block',
      verticalAlign: 'middle',
      transition: 'transform 0.5s',
      '& > svg': {
        display: 'block',
        transform: 'scale(2)',
      },
    },
    backLabel: {
    verticalAlign: 'middle',
    margin: '0px 8px'
  },
})

const BackLink = ({ onBackHandler, className, children, classes }) => (
  <a
    className={classnames(classes.backLink, className)}
    onClick={onBackHandler}
    data-hook="menu-navigation-back-link"
  >
    <span className={classes.backArrow}>
      <ChevronLeft size="14px" />
    </span>
    <span className={classes.backLabel}>{children}</span>
  </a>
);

BackLink.propTypes = {
  onBackHandler: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(BackLink);
