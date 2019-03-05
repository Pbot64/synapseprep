// Node Modules
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

// Local Components
import Question from '../components/Question';
import ButtonStyled from '../assets/jss/components/ButtonStyle.jsx'
import CardCustom from '../assets/jss/components/CardCustom.jsx'

// Material UI Components
import Button from '@material-ui/core/Button';
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
  }
})

const Dashboard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CardCustom className={classes.card}>
        <CardContent> 
          <Grid container align = 'center' direction = 'column'>
              <Typography variant='h4' className={classes.title} color="textSecondary" >
                Question Feed
              </Typography>
              <Typography  color="textSecondary" gutterBottom>
                These are your most important practice questions
              </Typography>
          </Grid>

          <Grid container spacing = {16} justify = 'space-around'>
          <Grid item>
         <ButtonStyled variant="contained" color= 'primary'>Reading</ButtonStyled>
         </Grid>
         <Grid item>
         <Button variant="contained" color= 'secondary'>Math</Button>
         </Grid>
         <Grid item>
         <Button variant="contained" color= 'default'>Writing</Button>
        
         
          </Grid>
          </Grid>

          <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
        </CardContent>
      </CardCustom>
   
      


     


      <Card className={classes.progress}>
        <CardContent>
          <Typography variant="h5" component="p">
            Continue Where you left off
          </Typography>
          <img src={right_arrow} alt={right_arrow} width='40'/>
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
