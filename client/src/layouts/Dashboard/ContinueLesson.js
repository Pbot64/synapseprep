// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'react-circular-progressbar/dist/styles.css';
import classNames from 'classnames';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Components
import CardCustom from '../../assets/jss/components/CardCustom';
import LinkCustom from '../../assets/jss/components/LinkCustom';
import ButtonCustom from '../../assets/jss/components/ButtonCustom';
import ProgressBar from '../../components/ProgressBar';

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    marginTop: '30px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px'
    }
  },
  bottomCardContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    borderTop: 'solid 1px lightgrey',
    padding: 5
  },
  topCardContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`
  },
  select: {
    opacity: 1
  },
  button: {
    'margin-left': '5px',
    'margin-right': '5px',
    'border-radius': '4px',
    border: 'none',
    'margin-bottom': '10px',
    opacity: 0.3,
    width: '110px',
    color: 'white'
  },
  topCardInner: {
    padding: 20,
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  circleContainer: {
    marginBottom: '40px'
  },
  mainButtonsContainer: {
    flexBasis: '110px',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: '0px'
    }
  },
  intro: {
    extend: 'button',
    ...theme.palette.blueToPurple,
    '&$selected': {
      opacity: 1
    }
  },
  reading: {
    extend: 'button',
    ...theme.palette.pinkToYellow,
    '&$selected': {
      opacity: 1
    }
  },
  math: {
    extend: 'button',
    ...theme.palette.blueToGreen,
    '&$selected': {
      opacity: 1
    }
  },
  writing: {
    extend: 'button',
    ...theme.palette.pinkToPurple,
    '&$selected': {
      opacity: 1
    }
  },
  essay: {
    extend: 'button',
    ...theme.palette.blueToTurquoise,
    '&$selected': {
      opacity: 1
    }
  },
  startButtonContainer: {
    flexBasis: '200px'
  },
  selected: {}
});

class ContinueLesson extends Component {
  state = {
    menuItem: 'intro'
  };

  handleClick = item => {
    this.setState({
      menuItem: item
    });
  };

  render() {
    const { classes } = this.props;
    const { menuItem } = this.state;
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
            fill: '#000000',
            fontSize: '16px',
            dominantBaseline: 'middle',
            textAnchor: 'middle'
          }
        }}
      >
        <Typography variant="h5" align="center" color="textPrimary">
          {percentage}%
        </Typography>
        <Typography variant="body1" color="textPrimary">
          complete
        </Typography>
      </ProgressBar>
    );

    return (
      <React.Fragment>
        <Grid item xs={12} sm={8} md={5} className={classes.root}>
          <CardCustom title="Continue Lesson" borderBottom className={classes.topCardContainer}>
            <Grid container justify="space-between" className={classes.topCardInner}>
              <Grid item container direction="column" className={classes.mainButtonsContainer}>
                <ButtonCustom
                  className={classNames(classes.intro, {
                    [classes.selected]: menuItem === 'intro'
                  })}
                  onClick={() => this.handleClick('intro')}
                >
                  <Typography variant="overline" color="inherit">
                    Intro
                  </Typography>
                </ButtonCustom>
                <ButtonCustom
                  className={classNames(classes.reading, {
                    [classes.selected]: menuItem === 'reading'
                  })}
                  onClick={() => this.handleClick('reading')}
                >
                  <Typography variant="overline" color="inherit">
                    Reading
                  </Typography>
                </ButtonCustom>
                <ButtonCustom
                  className={classNames(classes.writing, {
                    [classes.selected]: menuItem === 'writing'
                  })}
                  onClick={() => this.handleClick('writing')}
                >
                  <Typography variant="overline" color="inherit">
                    Writing
                  </Typography>
                </ButtonCustom>
                <ButtonCustom
                  className={classNames(classes.math, {
                    [classes.selected]: menuItem === 'math'
                  })}
                  onClick={() => this.handleClick('math')}
                >
                  <Typography variant="overline" color="inherit">
                    Math
                  </Typography>
                </ButtonCustom>
                <ButtonCustom
                  className={classNames(classes.essay, {
                    [classes.selected]: menuItem === 'essay'
                  })}
                  onClick={() => this.handleClick('essay')}
                >
                  <Typography variant="overline" color="inherit">
                    Essay
                  </Typography>
                </ButtonCustom>
              </Grid>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.startButtonContainer}
              >
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.circleContainer}
                >
                  {(() => {
                    switch (menuItem) {
                      case 'intro':
                        return progressCircle(0, '#4fa3eb', '#7336df');
                      case 'reading':
                        return progressCircle(20, '#ee5087', '#ffbe5f');
                      case 'writing':
                        return progressCircle(80, '#b465da', '#ee609c');
                      case 'math':
                        return progressCircle(18, '#4fa3eb', '#17ab5d');
                      case 'essay':
                        return progressCircle(5, '#209cff', '#68e0cf');
                      default:
                        return null;
                    }
                  })()}
                </Grid>
                <LinkCustom to="/intro">
                  <ButtonCustom hasArrowRight>Go to Lesson</ButtonCustom>
                </LinkCustom>
              </Grid>
            </Grid>
          </CardCustom>
          <div className={classes.bottomCardContainer}>
            <Grid container align="center" direction="column">
              <Typography variant="subtitle2" className={classes.bottomText}>
                Jump to where you stopped last time.
              </Typography>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

ContinueLesson.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContinueLesson);
