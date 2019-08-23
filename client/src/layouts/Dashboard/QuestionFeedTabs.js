// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

// Local Components
import ButtonCustom from '../../assets/jss/components/ButtonCustom';
import Category from '../../components/Category';
import LinkCustom from '../../assets/jss/components/LinkCustom';
import { setAssignment } from '../../actions/profileActions';
import { getQuestions } from '../../actions/questionActions';

// Local Assets
import chevronRight from '../../assets/images/chevron-right.svg';
// import line from '../../assets/images/Icon-Line.svg';
// import inequality from '../../assets/images/Icon-Inequality.svg';
// import parabola from '../../assets/images/Icon-Parabola.svg';
import social from '../../assets/images/Icon-Social.svg';
import clock from '../../assets/images/Icon-Clock.svg';
// import considering from '../../assets/images/Icon-Considering.svg';
// import handshake from '../../assets/images/Icon-HandShake.svg';
// import fist from '../../assets/images/Icon-Fist.svg';
// import flasks from '../../assets/images/Icon-Flasks.svg';

//  Style Overrides
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 400,
    width: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: '20px',
    right: '30px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    backgroundColor: 'white',
    color: 'black',
    '&:hover $fabIcon': {
      transform: 'translateX(5px)'
    },
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing.unit * 2
    }
  },
  fabIcon: {
    marginLeft: theme.spacing.unit,
    height: '15px',
    transition: '0.5s',
    width: '15px'
  },
  appBar: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0)'
  },
  tabBase: {
    'text-transform': 'none',
    'border-top-left-radius': '10px',
    'border-top-right-radius': '10px',
    position: 'relative',
    top: '1px',
    'border-bottom': '1px solid white'
  },
  math: {
    extend: 'tabBase',
    ...theme.palette.blueToGreen,
    marginRight: '15px',
    'font-size': '1.2rem',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.375rem'
    }
  },
  reading: {
    extend: 'tabBase',
    ...theme.palette.pinkToYellow,
    marginRight: '15px',
    'font-size': '1.2rem',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.375rem'
    }
  },
  writing: {
    extend: 'tabBase',
    ...theme.palette.pinkToPurple,
    'font-size': '1.2rem',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.375rem'
    }
  },
  tabContainer: {
    position: 'relative',
    background: 'linear-gradient(to right, red, purple)',
    padding: '3px'
  },
  textColorInherit: {
    opacity: '0.3',
    color: 'white'
  },
  none: {
    display: 'none'
  },
  topicMainContainer: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: '40px'
    }
  },
  fixed: {
    'overflow-x': 'inherit'
  },
  tabRoot: {
    overflow: 'inherit'
  }
});

const TabContainer = props => {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: '20px' }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class QuestionFeedTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  setAssignment = async () => {
    await this.props.setAssignment(this.state.value);
  };

  render() {
    const { tasks } = this.props.profile.practice;
    const { classes, theme } = this.props;
    const { value } = this.state;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <img src={chevronRight} className={classes.fabIcon} alt="chevronRight" />
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <img src={chevronRight} className={classes.fabIcon} alt="chevronRight" />
      },
      {
        color: 'inherit',
        className: classNames(classes.fab),
        icon: <img src={chevronRight} className={classes.fabIcon} alt="chevronRight" />
      }
    ];

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{
              indicator: classes.none,
              fixed: classes.fixed,
              root: classes.tabRoot
            }}
            variant="fullWidth"
          >
            <Tab
              className={classes.math}
              classes={{ textColorInherit: classes.textColorInherit }}
              label="Math"
            />
            <Tab
              className={classes.reading}
              classes={{ textColorInherit: classes.textColorInherit }}
              label="Reading"
            />
            <Tab
              className={classes.writing}
              classes={{ textColorInherit: classes.textColorInherit }}
              label="Writing"
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              {tasks[value].map(task => {
                return <Category src={task.img}>{task.title}</Category>;
              })}
              {/* {<img src = {require(task[0][0].img)} />} */}
              {/* <Category src={line}>{tasks[0].title}</Category>
              <Category src={inequality}>Inequalities</Category>
              <Category src={parabola}>Graphing Parabolas</Category> */}
            </Grid>
            {tasks[0].length === 0 && (
              <Typography variant="h5" className={classes.bottomText}>
                You've completed all the math tasks, but we're currently making more, so come back
                soon!
              </Typography>
            )}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              {tasks[1].map((task, i) => {
                return (
                  <Category key={i} src={social}>
                    {task.title}
                  </Category>
                );
              })}
              {/* <Category src={social}>Social Science</Category>
              <Category src={fist}>Great Global Conversation</Category>
              <Category src={flasks}>Physical Science</Category> */}
              {tasks[1].length === 0 && (
                <Typography variant="h5" className={classes.bottomText}>
                  You've completed all the reading tasks, but we're currently making more, so come
                  back soon!
                </Typography>
              )}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              {tasks[2].map((task, i) => {
                return (
                  <Category key={i} src={clock}>
                    {task.title}
                  </Category>
                );
              })}
              {/* <Category src={clock}>Tense</Category>
              <Category src={handshake}>Subject-Verb Agreement</Category>
              <Category src={considering}>Author is Considering...</Category> */}
              {tasks[2].length === 0 && (
                <Typography variant="h5" className={classes.bottomText}>
                  You've completed all the writing tasks, but we're currently making more, so come
                  back soon!
                </Typography>
              )}
            </Grid>
          </TabContainer>
        </SwipeableViews>

        {fabs.map((fab, index) => (
          <LinkCustom
            key={fab.color}
            to="/question-feed"
            onClick={this.setAssignment}
            className={classes.link}
          >
            <Zoom
              in={value === index}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`
              }}
              unmountOnExit
            >
              <ButtonCustom disabled={tasks[index].length === 0} className={fab.className}>
                Start Tasks
                {fab.icon}
              </ButtonCustom>
            </Zoom>
          </LinkCustom>
        ))}
      </div>
    );
  }
}

QuestionFeedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStatetoProps,
    { setAssignment, getQuestions }
  )(QuestionFeedTabs)
);
