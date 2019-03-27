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
import CardCustom from '../assets/jss/components/CardCustom'
import SwipeableQuestionFeedMenu from './SwipeableQuestionFeedMenu'
import * as colors from '../assets/jss/components/colors'

// Local Assets
import wavePattern from '../assets/images/wavePattern.png'


//  Style Overrides 
const styles = theme => ({
  bottomText: {
    color: `${theme.palette.text.lightGrey}`,
  },
  title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    paddingBottom: '10px',
  },
  cardTitle: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    marginTop: '15px',
  },
  cardBottomTextContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: 5,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 400,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  appBar: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0)',
  },
  reading: {
    textTransform: 'none',
    ...colors.pinktoYellow,
    color: 'white',
    fontSize: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    marginRight: '15px',
  },
  writing: {
    textTransform: 'none',
    ...colors.pinktoPurple,
    color: 'white',
    fontSize: '20px',
    borderTopLeftRadius: '10px',
  },
  math: {
    textTransform: 'none',
    ...colors.blueToGreen,
    color: 'white',
    fontSize: '20px',
    marginRight: '15px',
    borderTopRightRadius: '10px',
  },
  topic: {
    width: '120px',
    height: '120px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    texAlign: 'center',
  },
  topicContainer: {
    flexBasis: '120px',
  },
  tabContainer: {
    position: 'relative',
    background: 'linear-gradient(to right, red, purple)',
    padding: '3px',
  },
  textColorInherit: {
    opacity: '0.3',
  }
});

class QuestionFeed extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item md={7} sm={12} >
          <Typography variant='h5' className={classes.title} color="textPrimary" >
            Question Feed
        </Typography>
          <CardCustom className={classes.cardTitle}>
            <Grid item container align='center' direction='column'>
              <SwipeableQuestionFeedMenu />
            </Grid>
          </CardCustom>
          <CardCustom className={classes.cardBottomTextContainer}>
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


