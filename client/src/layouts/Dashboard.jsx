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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {

  },
  progress: {
    maxWidth: 300,
    marginTop: 50,
  },
  buttons: {
    margin: '100px 10px',
  },
})

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CardCustom className={classes.card}>
        <CardContent>
          <Grid container align='center' direction='column'>
            <Typography variant='h4' className={classes.title} color="textSecondary" >
              Question Feed
              </Typography>
            <Typography color="textSecondary" gutterBottom>
              These are your most important practice questions
              </Typography>
          </Grid>

          <Grid container spacing={16} justify='space-around' className = {classes.buttons}>
            <Grid item>
              <ButtonCustom variant="contained" color='primary'>Reading</ButtonCustom>
            </Grid>
            <Grid item>
              <ButtonCustom>Math</ButtonCustom>
            </Grid>
            <Grid item>
              <ButtonCustom>Writing</ButtonCustom>


            </Grid>
          </Grid>

          <CardActions>
      
          </CardActions>
        </CardContent>
      </CardCustom>







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
