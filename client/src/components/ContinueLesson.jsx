// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'react-circular-progressbar/dist/styles.css';


// Local Components
import CardCustom from '../assets/jss/components/CardCustom.jsx'
import ButtonCustom from '../assets/jss/components/ButtonCustom.jsx'
import LinearProgressBar from './LinearProgressBar.jsx'
import ProgressBar from './ProgressBar'


// Material UI Components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart from '@material-ui/icons/PieChart';

import CircularProgressbar from 'react-circular-progressbar';


// Local Assets
import right_arrow from '../assets/images/right_arrow.svg';
import wavePattern from '../assets/images/wavePattern.png'
import { inherits } from 'util';
import { relative } from 'path';


//  Style Overrides (to this component only)
const styles = theme => ({
  bottomCardContainer: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: 5,
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`,
  },
  button: {
    padding: '8px 12px',
    'border-radius': '4px',
    border: 'none',


  },
  cardInner: {
    padding: 20,
  },
  title: {
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.text.primary}`,
  },
  topCardContainer: {
    borderBottom: 'solid 1px lightgrey',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 18,
  },
  topTextContainer: {
    flexBasis: '110px',
  },
  mainTextBase: {
    'border-radius': '4px',
    color: 'white',
    padding: '3px 10px',
    textTransform: 'none',




  },
  intro: {
    extend: 'button',
    background: 'url(' + wavePattern + '), linear-gradient(45deg, #4fa3eb, #9c6bdf 62%, #9866df 66%, #7336df)',
    backgroundBlendMode: 'color-burn',
  },
  reading: {
    extend: 'button',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    backgroundBlendMode: 'color-burn',
  },
  math: {
    extend: 'button',
    background: 'url(' + wavePattern + '), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',

  },
  writing: {
    extend: 'button',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
    backgroundBlendMode: 'color-burn',
  },
  essay: {
    extend: 'button',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #209cff 0%, #68e0cf 100%)',

  },
  start: {

    marginBottom: '40px',


  },

  white: {
    color: 'white',
  },
  circleContainer: {
    flexBasis: '200px',
    
  },
  mainContainer: {

  },
});



class ContinueLesson extends Component {
  state = {
    menuItem: 'intro',
  };

  handleClick = (item) => {
    this.setState({
      menuItem: item,
    });
  };



  render() {
    const percentage = 66;
    const { classes, theme } = this.props;
    console.log(this.props.theme)



    const progressCircle = (percentage, colorStart, colorEnd) => (<ProgressBar
      percentage={percentage}
      text={`${percentage}%`}
      initialAnimation={true}
      startColor={colorStart}
      endColor={colorEnd}
      gradientId="progress"
      strokeWidth={5}
      styles={{
        root: { height: '150px', width: '150px' },
        path: { stroke: `rgba(0,0,225, ${percentage / 100})` },
        text: {
          fill: '#000000', fontSize: '16px', dominantBaseline: 'middle',
          textAnchor: 'middle'
        },
      }}
    >
      <Typography variant="h5" align='center' color="textPrimary" >
        {percentage}%
      </Typography>
      <Typography variant="body1" color="textPrimary" >
        complete
          </Typography>
    </ProgressBar>)


    return (
      <React.Fragment>
        <Grid item xs={12} sm={8} md={5} className={classes.mainContainer}>
          <Typography variant="h6" color="textPrimary" className={classes.title}>
            Continue Lesson
          </Typography>
          <CardCustom className={classes.topCardContainer}>
            <Grid container justify='space-between' className={classes.cardInner}>


              <Grid item container direction='column' justify='space-between' className={classes.topTextContainer}>
                <ButtonCustom className={classes.intro} onClick={() => this.handleClick('intro')}>
                  <Typography variant='body2' color='textSecondary' >
                    Intro
            </Typography>

                </ButtonCustom>


                <ButtonCustom className={classes.reading} onClick={() => this.handleClick('reading')}>
                  <Typography variant='body2' color='textSecondary'>
                    Reading
</Typography>
                </ButtonCustom>


                <ButtonCustom className={classes.writing} onClick={() => this.handleClick('writing')}>
                  <Typography variant='body2' color='textSecondary' >
                    Writing
</Typography>
                </ButtonCustom>


                <ButtonCustom hasArrow className={classes.math}>
                  <Typography variant='body2' color='textSecondary' >
                    Math
</Typography>
                </ButtonCustom>
                <ButtonCustom className={classes.essay}>

                  <Typography variant='body2' color='textSecondary'>
                    Essay
</Typography>
                </ButtonCustom>





              </Grid>
              <Grid item container direction='column' justify='center' alignItems='center' className={classes.circleContainer}>

                <Grid item container direction='column' justify='center' alignItems='center' className={classes.start}>

                  {(() => {
                    switch (this.state.menuItem) {
                      case 'intro':
                        return progressCircle(66, '#4fa3eb', '#7336df')
                      case 'reading':
                        return progressCircle(20, '#ee5087', '#ffbe5f')
                      case 'writing':
                        return progressCircle(80, '#b465da', '#ee609c')

                      default:
                        return null;
                    }
                  })()}


                </Grid>

                <ButtonCustom hasArrow>
                  Go to Lesson
                </ButtonCustom>
              </Grid>
            </Grid>




          </CardCustom>
          <CardCustom className={classes.bottomCardContainer}>
            <Grid container align='center' direction='column'>
              <Typography variant='subtitle2' className={classes.bottomText}>
                Jump to where you were last time.
            </Typography>
            </Grid>
          </CardCustom>
        </Grid>
      </React.Fragment>
    )
  }
}

ContinueLesson.propTypes = {

};

export default withStyles(styles)(ContinueLesson);
