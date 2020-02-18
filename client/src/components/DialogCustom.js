/* eslint-disable react-hooks/exhaustive-deps */
// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import JsxParser from 'react-jsx-parser';

// Material UI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// Local Components
import T from './Text/@Text';
import E from './Equation/@Equation';

// Local Assets

//  Style Overrides
const styles = theme => ({
  dialogContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  dialog: {
    cursor: 'move',
    marginLeft: '20px',
    marginRight: '20px',
    height: 'fit-content',
    maxWidth: '600px',
    [theme.breakpoints.up('sm')]: {
      margin: '75px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  textContainer: {
    padding: '0px 20px',

    [theme.breakpoints.up('sm')]: {
      padding: '0px 30px'
    }
  },
  testWrapper: {
    position: 'relative'
  },
  cancelButton: {
    paddingTop: '15px',
    color: '#ff6d6d'
  }
});

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const DialogCustom = props => {
  const { classes, content } = props;

  return (
    <Dialog
      open={props.open}
      PaperComponent={PaperComponent}
      onClose={props.handleClose}
      scroll="body"
      maxWidth={false}
      aria-labelledby="scroll-dialog-title"
      classes={{
        paper: classes.dialog,
        container: classes.dialogContainer
      }}
    >
      <Grid item>
        <Grid item container justify="flex-end">
          <Button onClick={props.handleClose} color="inherit" className={classes.cancelButton}>
            <HighlightOffIcon />
          </Button>
        </Grid>

        <Grid container justify="center">
          <Grid item className={classes.textContainer}>
            <Typography variant="body2" component="div">
              <JsxParser
                disableFragments={true}
                components={{ Grid, Typography, T, E }}
                jsx={content}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default withStyles(styles)(DialogCustom);
