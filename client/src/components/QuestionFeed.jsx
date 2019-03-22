// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

// Local Components
import CardCustom from '../assets/jss/components/CardCustom.jsx'
import SwipeableQuestionFeedMenu from './SwipeableQuestionFeedMenu.jsx'


// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import green from '@material-ui/core/colors/green';


// Local Assets
import wavePattern from '../assets/images/wavePattern.png'


//  Style Overrides (to this component only)
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
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    backgroundBlendMode: 'color-burn',
  color: 'white',
  fontSize: '20px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  
  marginRight: '15px',
  },
  writing: {
    textTransform: 'none',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
    backgroundBlendMode: 'color-burn',
    color: 'white',
    fontSize: '20px',
    borderTopLeftRadius: '10px',
  },
  math: {
    textTransform: 'none',
    background: 'url(' + wavePattern + '), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',
    backgroundBlendMode: 'color-burn',
    color: 'white',
    fontSize: '20px',
    marginRight: '15px',
    borderTopRightRadius: '10px',
  },
  topic: {
    width: '120px',
    height: '120px',
    background: 'url(' + wavePattern + '), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',
    backgroundBlendMode: 'color-burn',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    texAlign: 'center',
  },
  svg: {
    width: '50px',
    height: '50px',
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

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class QuestionFeed extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    
    const { classes, theme } = this.props;
  const transitionDuration = {
    enter: 225,
    exit: 195,
  }
  
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

};

export default withStyles(styles, { withTheme: true })(QuestionFeed);


