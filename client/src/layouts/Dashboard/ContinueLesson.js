// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'


// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Components
import CardCustom from '../../assets/jss/components/CardCustom'
import LinkCustom from '../../assets/jss/components/LinkCustom'
import ButtonCustom from '../../assets/jss/components/ButtonCustom'
import ProgressBar from '../../components/ProgressBar'
import * as colors from '../../assets/jss/components/colors'

// Local Assets
import wavePattern from '../../assets/images/wavePattern.png'


//  Style Overrides 
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
    'border-radius': '4px',
    border: 'none',
  },
  topCardContainer: {
    borderBottom: 'solid 1px lightgrey',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 18,
  },
  topCardInner: {
    padding: 20,
  },
  circleContainer: {
    marginBottom: '40px',
  },
  title: {
    paddingBottom: 10,
    borderBottom: `1px solid black`,
  },
  mainButtonsContainer: {
    flexBasis: '110px',
  },
  intro: {
    extend: 'button',
    ...colors.blueToPurple
  },
  reading: {
    extend: 'button',
    ...colors.pinktoYellow
  },
  math: {
    extend: 'button',
    ...colors.blueToGreen
  },
  writing: {
    extend: 'button',
    ...colors.pinktoPurple
  },
  essay: {
    extend: 'button',
    ...colors.blueToTurquoise
  },
  startButtonContainer: {
    flexBasis: '200px',
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
    const { classes } = this.props;
    const progressCircle = (percentage, colorStart, colorEnd) => (
      <ProgressBar
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
      </ProgressBar>
    )

    return (
      <React.Fragment>
        <Grid item xs={12} sm={8} md={5}>
          <Typography variant="h5" color="textPrimary" className={classes.title}>
            Continue Lesson
          </Typography>
          <CardCustom className={classes.topCardContainer}>
            <Grid container justify='space-between' className={classes.topCardInner}>
              <Grid item container direction='column' justify='space-between' className={classes.mainButtonsContainer}>
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
                <ButtonCustom className={classes.math}>
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
              <Grid item container direction='column' justify='center' alignItems='center' className={classes.startButtonContainer}>
                <Grid item container direction='column' justify='center' alignItems='center' className={classes.circleContainer}>
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
                <LinkCustom to='./intro'>
                <ButtonCustom hasArrow>
                  Go to Lesson
                </ButtonCustom>
                </LinkCustom>
              </Grid>
            </Grid>
          </CardCustom>
          <CardCustom className={classes.bottomCardContainer}>
            <Grid container align='center' direction='column'>
              <Typography variant='subtitle2' className={classes.bottomText}>
                Jump to where you stopped last time.
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
