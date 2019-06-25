// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

// Local Components
import ButtonCustom from '../../assets/jss/components/ButtonCustom';
import * as colors from '../../assets/jss/components/colors';
import Category from '../../components/Category';
import LinkCustom from '../../assets/jss/components/LinkCustom';

// Local Assets
import chevronRight from '../../assets/images/chevron-right.svg';
import line from '../../assets/images/Icon-Line.svg';
import inequality from '../../assets/images/Icon-Inequality.svg';
import parabola from '../../assets/images/Icon-Parabola.svg';
import flasks from '../../assets/images/Icon-Flasks.svg';
import social from '../../assets/images/Icon-Social.svg';
import fist from '../../assets/images/Icon-Fist.svg';
import handshake from '../../assets/images/Icon-HandShake.svg';
import clock from '../../assets/images/Icon-Clock.svg';
import considering from '../../assets/images/Icon-Considering.svg';

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
    'font-size': '22px',
    'border-top-left-radius': '10px',
    'border-top-right-radius': '10px',
    position: 'relative',
    top: '1px',
    'border-bottom': '1px solid white'
  },
  math: {
    extend: 'tabBase',
    ...colors.blueToGreen,
    marginRight: '15px'
  },
  reading: {
    extend: 'tabBase',
    ...colors.pinktoYellow,
    marginRight: '15px'
  },
  writing: {
    extend: 'tabBase',
    ...colors.pinktoPurple
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

  render() {
    const { classes, theme } = this.props;
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
            value={this.state.value}
            onChange={this.handleChange}
            classes={{ indicator: classes.none, fixed: classes.fixed, root: classes.tabRoot }}
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
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              <Category src={line}>System of Linear Equations</Category>
              <Category src={inequality}>Inequalities</Category>
              <Category src={parabola}>Graphing Parabolas</Category>
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              <Category src={social}>Social Science</Category>
              <Category src={fist}>Great Global Conversation</Category>
              <Category src={flasks}>Physical Science</Category>
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container justify={'space-between'} className={classes.topicMainContainer}>
              <Category src={clock}>Tense</Category>
              <Category src={handshake}>Subject-Verb Agreement</Category>
              <Category src={considering}>Author is Considering...</Category>
            </Grid>
          </TabContainer>
        </SwipeableViews>
        {fabs.map((fab, index) => (
          <LinkCustom to="./question-feed" className={classes.link}>
            <Zoom
              key={fab.color}
              in={this.state.value === index}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`
              }}
              unmountOnExit
            >
              <ButtonCustom className={fab.className}>
                Start Task
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

export default withStyles(styles, { withTheme: true })(QuestionFeedTabs);
