// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';


// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import green from '@material-ui/core/colors/green';


// Local Components
import CardCustom from '../../assets/jss/components/CardCustom'
import QuestionFeedTabs from './QuestionFeedTabs'
import * as colors from '../../assets/jss/components/colors'

// Local Assets
import wavePattern from '../../assets/images/wavePattern.png'


//  Style Overrides 
const styles = theme => ({
  bottomText: {
    color: `${theme.palette.text.lightGrey}`,
  },
  cardBottomContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: 5,
  },
  cardTopContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    marginTop: '15px',
  },
  title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    paddingBottom: '10px',
  },
});

class QuestionFeed extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item md={7} xs={12} >
          <Typography variant='h5' className={classes.title} color="textPrimary" >
            Question Feed
        </Typography>
          <CardCustom className={classes.cardTopContainer}>
            <Grid item container align='center' direction='column'>
              <QuestionFeedTabs />
            </Grid>
          </CardCustom>
          <CardCustom className={classes.cardBottomContainer}>
            <Grid container align='center' direction='column'>
              <Typography variant='subtitle2' className={classes.bottomText}>
                Hand picked questions to strengthen your weakest skills.
              </Typography>
            </Grid>
          </CardCustom>
        </Grid>
      </React.Fragment>
    )
  }
}

QuestionFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(QuestionFeed);


