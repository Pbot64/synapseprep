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

// Local Assets
import chevronRight from '../../assets/images/chevron-right.svg';

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
    value: 0,
    image: []
  };

  componentDidMount() {
    const { tasksHistory } = this.props.profile.profile;
    const allCurrentTasksContent = tasksHistory.map(task => task.taskContent);
    this.loadImage(allCurrentTasksContent.map(taskContent => taskContent.img));
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  setAssignment = async () => {
    await this.props.setAssignment(this.state.value);
  };

  loadImage = imageNames => {
    console.log(imageNames);
    const imagesArray = imageNames.map(imageName => {
      return import(`../../assets/images/${imageName}.svg`).then(image => {
        return image.default;
      });
    });
    Promise.all(imagesArray).then(res => {
      this.setState({
        image: res
      });
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { tasksHistory } = this.props.profile.profile;
    const { value } = this.state;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };

    const allCurrentTasksContent = tasksHistory.map(task => task.taskContent);

    const currentMathTaskContent = allCurrentTasksContent.filter(
      currentTaskContent => currentTaskContent.subject === 'Math'
    );
    const currentReadingTaskContent = allCurrentTasksContent.filter(
      currentTaskContent => currentTaskContent.subject === 'Reading'
    );
    const currentWritingTaskContent = allCurrentTasksContent.filter(
      currentTaskContent => currentTaskContent.subject === 'Writing'
    );

    const subjects = ['Math', 'Reading', 'Writing'];

    const currentTasks = tasksHistory.filter(
      taskHistory => taskHistory.taskContent.subject === subjects[value]
    );

    console.log('currentTasks', currentTasks);

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
              {allCurrentTasksContent.map((task, i) => {
                if (task.subject === 'Math') {
                  return (
                    <Category key={task.title} src={this.state.image[i]}>
                      {task.title}
                    </Category>
                  );
                }
                return null;
              })}
            </Grid>
            {currentMathTaskContent.length === 0 && (
              <Typography variant="h5" className={classes.bottomText}>
                You've completed all the math tasks, but we're currently making more, so come back
                soon!
              </Typography>
            )}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              {allCurrentTasksContent.map((task, i) => {
                if (task.subject === 'Reading') {
                  return (
                    <Category key={task.title} src={this.state.image[i]}>
                      {task.title}
                    </Category>
                  );
                }
                return null;
              })}
              {currentReadingTaskContent.length === 0 && (
                <Typography variant="h5" className={classes.bottomText}>
                  You've completed all the reading tasks, but we're currently making more, so come
                  back soon!
                </Typography>
              )}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              {allCurrentTasksContent.map((task, i) => {
                if (task.subject === 'Writing') {
                  return (
                    <Category key={task.title} src={this.state.image[i]}>
                      {task.title}
                    </Category>
                  );
                }
                return null;
              })}
              {currentWritingTaskContent.length === 0 && (
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
              <ButtonCustom disabled={currentTasks.length === 0} className={fab.className}>
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
  connect(mapStatetoProps, { setAssignment })(QuestionFeedTabs)
);
