// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Components
import CardCustom from '../assets/jss/components/CardCustom';
import Accordion from '../components/Accordion';

// Local Assets

// Style Overrides
const styles = theme => ({
  root: {},
  bottomCardContainer: {
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    padding: 5,
    backgroundColor: 'white',
    borderTop: 'solid 1px lightgrey'
  },
  topCardContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    paddingBottom: '10px'
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`
  },
  topCardInner: {
    padding: '20px'
  }
});

const Review = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={10}>
          <CardCustom title="Completed Tasks" borderBottom className={classes.topCardContainer}>
            <Grid container justify="center" className={classes.topCardInner}>
              <Accordion />
            </Grid>
          </CardCustom>
          <div className={classes.bottomCardContainer}>
            <Grid container align="center" direction="column">
              <Typography variant="subtitle2" className={classes.bottomText}>
                Review questions you've previously attempted
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
