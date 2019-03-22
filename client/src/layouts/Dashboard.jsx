// Node Modules
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Question from '../components/Question';
import ButtonCustom from '../assets/jss/components/ButtonCustom.jsx'
import CardCustom from '../assets/jss/components/CardCustom.jsx'
import QuestionFeed from '../components/QuestionFeed'
import ContinueLesson from '../components/ContinueLesson';
import EstimatedScores from '../components/EstimatedScores';


// Material UI Components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart from '@material-ui/icons/PieChart';

// Local Assets
import right_arrow from '../assets/images/right_arrow.svg';

//  Style Overrides (to this component only)
const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`,
  },
  center: {
    textAlign: 'center',
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  card: {
    maxWidth: 800,
    margin: 'auto'
  },
  cardQuestions: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: 5,

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    width: '100%',
    padding: '0px 31px',
    borderRadius: '0px',
  },
  cardBottomTextContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: 'solid 1px lightgrey',
    
  },
  continueContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    height: 100,
    padding: 20,
  },
  scoresContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    marginTop: 80,
  },
  buttons: {
    fontSize: '20px',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon: {
    width: 100,
  },
  border: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  questionFeedContainer: {
    width: '900px',
  },
})

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>

      <Grid container spacing = {24}  justify='space-between'>
      <QuestionFeed />


        <ContinueLesson />

      </Grid>

<EstimatedScores />
      
    </React.Fragment>
  )
}

export default withStyles(styles)(Dashboard);
