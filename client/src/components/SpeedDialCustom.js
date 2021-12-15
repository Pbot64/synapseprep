import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const styles = theme => ({
  root: {
    width: '100%'
  },
  exampleWrapper: {
    position: 'relative'
  },
  speedDialIcon: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  }
});

class SpeedDialCustom extends React.Component {
  state = {
    direction: 'right',
    open: false,
    hidden: false
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleDirectionChange = (event, value) => {
    this.setState({
      direction: value
    });
  };

  handleHiddenChange = (event, hidden) => {
    this.setState(state => ({
      hidden,
      // hidden implies !open
      open: hidden ? false : state.open
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, icons, mainIcon } = this.props;
    const { direction, hidden, open } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.exampleWrapper}>
          <SpeedDial
            ariaLabel="SpeedDial"
            hidden={hidden}
            icon={mainIcon || <SpeedDialIcon />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
            direction={direction}
          >
            {icons.map(icon => (
              <SpeedDialAction
                classes={{ button: classes.speedDialIcon }}
                key={icon.name}
                icon={icon.icon}
                enterDelay={500}
                tooltipTitle={icon.name}
                tooltipPlacement={'bottom'}
                onClick={icon.eventHandler}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    );
  }
}

SpeedDialCustom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpeedDialCustom);
