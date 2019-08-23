import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const variantIcon = {
  error: ErrorIcon
};

const styles1 = theme => ({
  root: {
    maxWidth: '350px',
    borderRadius: '4px',
    padding: '0px 10px',
    position: 'relative',
    bottom: '40px'
  },
  newAnchor: {
    right: '24px',
    bottom: '60px'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  close: {
    padding: '5px'
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      classes={{ root: classes.root }}
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <Typography variant="body1" color="inherit">
            {message}
          </Typography>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class SnackBar extends React.Component {
  handleClose = (event, reason) => {
    const { setSnackBarOpen } = this.props;
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  render() {
    const { classes, snackBarOpen } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          classes={{ anchorOriginBottomRight: classes.newAnchor }}
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            className={classes.margin}
            message="There are unanswered questions!"
          />
        </Snackbar>
      </div>
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(SnackBar);
