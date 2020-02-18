// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

// Local Components
import Table from './Table';

// Local Assets

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    root: {
      width: '100%'
    },
    panelRoot: {
      transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    panelRootExpanded: {
      marginTop: '16px'
    },
    headingContainer: {
      flexBasis: '60%',
      [theme.breakpoints.up('sm')]: {
        flexBasis: '35%'
      }
    },
    headingBase: {
      'font-weight': '600',
      'font-size': '1.3rem',
      'text-transform': 'uppercase',
      'letter-spacing': '1.2px',
      color: 'transparent',
      '-webkit-background-clip': 'text',
      'background-clip': 'text'
    },
    headingBaseReading: {
      extend: 'headingBase',
      'background-image': 'linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)'
    },
    headingBaseWriting: {
      extend: 'headingBase',
      'background-image': 'linear-gradient(224deg,  #b465da 0%, #cf6cc9 33%, #ee609c 100%)'
    },
    headingBaseMath: {
      extend: 'headingBase',
      'background-image': 'linear-gradient(45deg, #2980ba 0%, #238E9B 50%, #00BF6F 100%)'
    },
    summaryContainer: {
      minHeight: '48px',
      cursor: 'pointer',
      transition:
        'min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid lightgrey'
    },
    summaryContainerExpanded: {
      minHeight: '64px'
    },
    taskNumberContainerBase: {
      'margin-left': '10px',
      opacity: '0.7',
      padding: '3px 15px',
      'border-radius': '100px'
    },
    taskNumberContainerReading: {
      extend: 'taskNumberContainerBase',
      backgroundColor: theme.palette.pink
    },
    taskNumberContainerWriting: {
      extend: 'taskNumberContainerBase',
      backgroundColor: theme.palette.purple
    },
    taskNumberContainerMath: {
      extend: 'taskNumberContainerBase',
      backgroundColor: theme.palette.blue
    },
    taskNumber: {
      fontSize: theme.typography.pxToRem(14),
      color: 'white',
      fontWeight: '600',
      lineHeight: '1.2'
    },
    content: {
      height: '0',
      overflow: 'hidden',
      transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    contentExpanded: {
      height: 'auto',
      overflow: 'visible'
    },
    expandIcon: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        backgroundColor: 'transparent'
      },
      '&$expanded': {
        transform: 'rotate(180deg)'
      }
    },
    expanded: {}
  };
};

class AccordionReview extends Component {
  state = {
    expanded: false
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  handleClick = panel => {
    const { expanded } = this.state;
    console.log('expanded', expanded);
    if (expanded === panel || expanded === false) {
      this.setState({
        expanded: !expanded ? panel : false
      });
    } else {
      this.setState({
        expanded: expanded ? panel : false
      });
    }
  };
  render() {
    console.log('state', this.state);
    const { classes, profile } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel1'
          })}
        >
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            onClick={() => {
              this.handleClick('panel1');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel1'
            })}
          >
            <Grid item className={classes.headingContainer}>
              <Typography variant="h5" className={classes.headingBaseReading} inline>
                Reading
              </Typography>
            </Grid>
            <Grid item xs container justify="space-between" alignItems="center">
              <Grid item className={classes.taskNumberContainerReading}>
                <Typography variant="subtitle2" className={classes.taskNumber}>
                  3/170
                </Typography>
              </Grid>
              <IconButton
                className={classNames(classes.expandIcon, {
                  [classes.expanded]: expanded === 'panel1'
                })}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel1'} timeout="auto">
            <Table profile={profile} />
          </Collapse>
        </Grid>
        {/* Panel 2 */}
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel2'
          })}
        >
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            onClick={() => {
              this.handleClick('panel2');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel2'
            })}
          >
            <Grid item className={classes.headingContainer}>
              <Typography variant="h5" className={classes.headingBaseWriting} inline>
                Writing
              </Typography>
            </Grid>
            <Grid item xs container justify="space-between" alignItems="center">
              <Grid item className={classes.taskNumberContainerWriting}>
                <Typography variant="subtitle2" className={classes.taskNumber}>
                  7/200
                </Typography>
              </Grid>
              <IconButton
                className={classNames(classes.expandIcon, {
                  [classes.expanded]: expanded === 'panel2'
                })}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel2'} timeout="auto">
            <Table profile={profile} />
          </Collapse>
        </Grid>
        {/* Panel 3 */}
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel3'
          })}
        >
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            onClick={() => {
              this.handleClick('panel3');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel3'
            })}
          >
            <Grid item className={classes.headingContainer}>
              <Typography variant="h5" className={classes.headingBaseMath} inline>
                Math{'  '}
                {'  '}
              </Typography>
            </Grid>
            <Grid item xs container justify="space-between" alignItems="center">
              <Grid item className={classes.taskNumberContainerMath}>
                <Typography variant="subtitle2" className={classes.taskNumber}>
                  9/120
                </Typography>
              </Grid>
              <IconButton
                className={classNames(classes.expandIcon, {
                  [classes.expanded]: expanded === 'panel3'
                })}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel3'} timeout="auto">
            <Table profile={profile} />
          </Collapse>
        </Grid>
      </div>
    );
  }
}

AccordionReview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccordionReview);
