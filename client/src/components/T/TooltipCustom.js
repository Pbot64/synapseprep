// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Assets
import questionMark from '../../assets/images/question-mark.svg';

import { Tooltip, Grid, ClickAwayListener } from '@material-ui/core';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const styles = theme => ({
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  },

  htmlPopper: arrowGenerator('#dadde9'),
  htmlTooltip: {
    backgroundColor: '#FFFFFF',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(14),
      maxWidth: 400
    },
    '& b': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  inner: {
    padding: '10px',
    '& > div': {
      marginBottom: '10px',
      whiteSpace: 'pre-wrap',
      [theme.breakpoints.up('sm')]: {
        marginBottom: '15px'
      }
    }
  },

  questionMark: {
    width: '12px',
    position: 'relative',
    top: '-5px'
  }
});

class TooltipCustom extends React.Component {
  state = {
    arrowRef: null,
    open: false
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, title, children, hasQuestionMark } = this.props;

    return (
      <>
        <ClickAwayListener onClickAway={this.handleTooltipClose}>
          <Tooltip
            disableHoverListener
            open={this.state.open}
            onClose={this.handleTooltipClose}
            classes={{
              popper: classes.htmlPopper,
              tooltip: classes.htmlTooltip
            }}
            PopperProps={{
              popperOptions: {
                modifiers: {
                  arrow: {
                    enabled: Boolean(this.state.arrowRef),
                    element: this.state.arrowRef
                  }
                }
              }
            }}
            title={
              <>
                <Grid item className={classes.inner}>
                  {title}
                </Grid>

                <span className={classes.arrow} ref={this.handleArrowRef} />
              </>
            }
          >
            <span onClick={this.handleTooltipOpen}>
              {children}
              {hasQuestionMark && (
                <img
                  src={questionMark}
                  alt='click question mark to define word'
                  className={classes.questionMark}
                />
              )}
            </span>
          </Tooltip>
        </ClickAwayListener>
      </>
    );
  }
}

TooltipCustom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TooltipCustom);
