//Node Modules
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import { setAlerted } from '../actions/profileActions';

//  Style Overrides
const styles = theme => ({
  dialog: {
    margin: '16px',
    [theme.breakpoints.up('sm')]: {
      margin: '24px'
    }
  }
});

class Alert extends React.Component {
  state = {
    open: !this.props.alerted
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.setAlerted();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="alert-dialog-title">{'This App is Under Construction'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We're in the process of rolling out our awesome new app! Just know that most of the
              values you see are randomly generated and parts of the app remain inaccessible.
              Nevetheless, there are some math questions that you can work through! We'll keep you
              updated as more features are released in the coming weeks.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Gotcha!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  alerted: state.profile.alerted
});

export default withStyles(styles)(connect(mapStatetoProps, { setAlerted })(Alert));
