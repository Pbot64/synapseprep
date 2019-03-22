import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import parabola from '../assets/images/Icon-Parabola.svg'
import chevronRight from '../assets/images/chevron-right.svg'
import vertMenu from '../assets/images/Icon-VertMenu.svg'
import star from '../assets/images/Icon-Star.svg'
import Grid from '@material-ui/core/Grid';
import inequality from '../assets/images/Icon-Inequality.svg'
import compass from '../assets/images/Icon-Compass.svg'


import CardCustom from '../assets/jss/components/CardCustom.jsx'
import wavePattern from '../assets/images/wavePattern.png'
import ButtonCustom from '../assets/jss/components/ButtonCustom';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 400,

  },
  fab: {
    position: 'absolute',
    bottom: '20px',
    right: '30px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    backgroundColor: 'white',
    color: 'black',
    '&:hover $fabIcon': {
      transform: 'translateX(5px)',
      },
    [theme.breakpoints.down('xs')]: {
      
      bottom: theme.spacing.unit * 2,
      
    },
  },
  fabIcon: {
    marginLeft: theme.spacing.unit,
    height: '15px',
    transition: '0.5s',
    width: '15px',
},
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
   
  },
  appBar: {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottom: 'solid 1px lightgrey',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0)',

  },
  reading: {
    textTransform: 'none',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    backgroundBlendMode: 'color-burn',
    color: 'white',
    fontSize: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',

    marginRight: '15px',
  },
  writing: {
    textTransform: 'none',
    background: 'url(' + wavePattern + '), linear-gradient(224deg, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
    backgroundBlendMode: 'color-burn',
    color: 'white',
    fontSize: '20px',
    borderTopLeftRadius: '10px',
  },
  math: {
    textTransform: 'none',
    background: 'url(' + wavePattern + '), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',
    backgroundBlendMode: 'color-burn',
    color: 'white',
    fontSize: '20px',
    marginRight: '15px',
    borderTopRightRadius: '10px',
  },
  topic: {
    position: 'relative',
    maxWidth: '140px',
    height: '140px',
    backgroundBlendMode: 'color-burn',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    marginBottom: '10px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

  
  },
  svg: {
    width: '50px',
    height: '50px',
  },
  topicContainer: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '400px',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between'
      

    },

  },
  tabContainer: {
    position: 'relative',
    background: 'linear-gradient(to right, red, purple)',
    padding: '3px',
    
  },
  textColorInherit: {
    opacity: '0.3',
  },
  none: {
    display: 'none',
  },
  topicMainContainer: {
    [theme.breakpoints.down('xs')]: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '70px',
    },
  },
 font: {
  width: '100%',
   fontSize: '14px',
  [theme.breakpoints.down('xs')]: {
  fontSize: '18px',
  width: '50%',
  textAlign: 'left',
  },
},
vertMenu: {
  width: '15px',
  position: 'absolute',
  right: '10px',
  top: '15px',
},
star: {
  width: '15px',
  position: 'absolute',
  left: '10px',
  top: '15px',
},
});

class SwipeableQuestionFeedMenu extends React.Component {
  state = {
    value: 0,
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
      exit: theme.transitions.duration.leavingScreen,
    };
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <img src = {chevronRight} className = {classes.fabIcon}/>,
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <img src = {chevronRight} className = {classes.fabIcon}/>,
      },
      {
        color: 'inherit',
        className: classNames(classes.fab),
        icon: <img src = {chevronRight} className = {classes.fabIcon}/>,
      },
    ];

    return (
      <div className={classes.root}>

        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{ indicator: classes.none }}

            variant="fullWidth"
          >
            <Tab className={classes.math} classes={{ textColorInherit: classes.textColorInherit }} label="Math" />
            <Tab className={classes.reading} classes={{ textColorInherit: classes.textColorInherit }} label="Reading" />
            <Tab className={classes.writing} classes={{ textColorInherit: classes.textColorInherit }} label="Writing" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >

          <TabContainer dir={theme.direction}>

            <Grid container justify={"space-between"} className = {classes.topicMainContainer}>


              <Grid item  container xs = {12} sm = {3} md = {3} justify = 'center' className={classes.topicContainer} alignContent = 'flex-start'>
                <Grid item  container xs = {6} sm = {12} className={classes.topic}>
                <img src={star} className = {classes.star} />
               <img src={compass} className={classes.svg} />

               <img src={vertMenu} className = {classes.vertMenu} />
                </Grid>

                <Typography  variant='subtitle2' align='center' className = {classes.font}>
                  System of Linear Equations
            </Typography>

              </Grid>

              <Grid item container  xs = {12} sm = {3} md = {3}className={classes.topicContainer} justify = 'center' alignContent = 'flex-start'>

                <Grid item container xs = {6} sm = {12} className={classes.topic}>
                  <img src={inequality} className={classes.svg} />
                  </Grid>
                  <Typography variant='subtitle2' align='center' className = {classes.font}>
                    Inequalities
            </Typography>
                
              </Grid>

              <Grid item  container xs = {12} sm = {3} md = {3} className={classes.topicContainer} justify = 'center' alignContent = 'flex-start'>
                <Grid item container  xs = {6} sm = {12} className={classes.topic}>
                <img src={parabola} className={classes.svg} />
                </Grid>
                <Typography variant='subtitle2' align='center' className = {classes.font}>
                    Graphing Parabolas
            </Typography>
              </Grid>
            </Grid>
          </TabContainer>

          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
        {fabs.map((fab, index) => (
         
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <ButtonCustom className={fab.className}  >
            Start Task
              {fab.icon}
             
            </ButtonCustom>
          </Zoom>
        ))}
         
      </div>
    );
  }
}

SwipeableQuestionFeedMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableQuestionFeedMenu);