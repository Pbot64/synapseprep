import React, { Component } from 'react';
import { node, bool, oneOf, func } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import slideIn from './SlideInAnimation.scss';
import slideOut from './SlideOutAnimation.scss';

import { withStyles } from '@material-ui/core/styles';

export const SlideDirection = {
  in: 'in',
  out: 'out',
};

const styles = theme => ({
  enterActiveBase: {
  transform: 'translate(0%)',
  transition: 'transform 0.3s ease-in-out',
  },
  exitBase: {
    transform: 'translate(0%)',
  },
  exitActiveBase: {
    transition: 'transform 0.3s ease-in-out',
  },
  enter: {
    transform: 'translate(100%)',
  },
  appear: {
    transform: 'translate(100%)',
  },
  '.enter.enterActive, .appear.appearActive': {
    extend: 'enterActiveBase'
  },
  exit: {
    extend: 'exitBase',
  },
  '.exit .exitActive': {
    extend: 'exitActiveBase',
    transform: 'translate(-100%)',
  },
})
const animationDuration = 300; // Synced with SlideAnimation.scss file

class SlideAnimation extends Component {
  render() {
    const {
      isVisible,
      animateAppear,
      animateEnter,
      animateLeave,
      children,
      direction,
      onEnter,
      onExit,
      onEntered,
      onExited,
      classes
    } = this.props;
    const transitionNames =
      direction === SlideDirection.in ? slideIn : slideOut;
    const childTimeout = {
      enter: animateEnter ? animationDuration : 0,
      exit: animateLeave ? animationDuration : 0,
    };

    return (
      <CSSTransition
        in={isVisible}
        appear={animateAppear}
        exit={animateLeave}
        classNames={transitionNames}
        timeout={childTimeout}
        unmountOnExit
        onEnter={onEnter}
        onExit={onExit}
        onEntered={onEntered}
        onExited={onExited}
      >
        {children || <span />}
      </CSSTransition>
    );
  }
}

SlideAnimation.propTypes = {
  isVisible: bool.isRequired,
  direction: oneOf([SlideDirection.in, SlideDirection.out]),
  animateAppear: bool,
  animateEnter: bool,
  animateLeave: bool,
  children: node,
  onEnter: func,
  onEntered: func,
  onExit: func,
  onExited: func,
};

SlideAnimation.defaultProps = {
  direction: SlideDirection.in,
  animateAppear: true,
  animateEnter: true,
  animateLeave: true,
  children: null,
};

export default withStyles(styles)(SlideAnimation);