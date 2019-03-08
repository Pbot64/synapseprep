// Node Modules
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Question from '../components/Question';
import ButtonCustom from '../assets/jss/components/ButtonCustom.jsx'
import CardCustom from '../assets/jss/components/CardCustom.jsx'

// Material UI Components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Assets
import right_arrow from '../assets/images/right_arrow.svg';

//  Style Overrides (to this component only)
const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: 'flex',
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
  cardTitle: { 
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    padding: 15,
  },
  cardQuestions: { 
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    height: '400px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    flexGrow: 1,
    width: '100%',
    height: 40,
    padding: '0px 31px',
    borderRadius: '0px',
  },
  progress: {
    maxWidth: 300,
    marginTop: 50,
  },
  buttons: {
    fontSize: '20px',
  },
  mainContainer: {
    maxWidth: 400,
  }
})

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className = {classes.mainContainer}>
      <CardCustom className={classes.cardTitle}>
       
          <Grid container align='center' direction='column'>
            <Typography variant='h5' className={classes.title} color="textSecondary" >
              Question Feed
              </Typography>
            <Typography variant='subtitle1' color="textSecondary" gutterBottom>
              These are your most important practice questions
              </Typography>
          </Grid>
     
      </CardCustom>


          <Grid container justify='space-around' className = {classes.buttons}>
            <Grid item xs ={4}>
              <ButtonCustom className = {classes.button}>Reading</ButtonCustom>
            </Grid>
            <Grid item xs ={4}>
              <ButtonCustom className = {classes.button} >Math</ButtonCustom>
            </Grid>
            <Grid item xs ={4}>
              <ButtonCustom className = {classes.button} >Writing</ButtonCustom>

            </Grid>
          </Grid>

          <CardCustom className={classes.cardQuestions}>

        <CardContent >
          <Grid container align='center' direction='column'>
            <Typography variant='h2' className={classes.title} color="textSecondary" >
              Question #1
              </Typography>
            <Typography color="textSecondary" gutterBottom>
              Question #2
              </Typography>
          </Grid>
        </CardContent>
      </CardCustom>

      </div>

        
    






      <Card className={classes.progress}>
        <CardContent>
          <Typography variant="h5" component="p">
            Continue Where you left off
          </Typography>
          <img src={right_arrow} alt={right_arrow} width='40' />
        </CardContent>
      </Card>

      <Card className={classes.progress}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Estimated Scores
          </Typography>
          <Typography component="p">
            These are the scores we think you'd get if you took the SAT today
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default withStyles(styles)(Dashboard);
