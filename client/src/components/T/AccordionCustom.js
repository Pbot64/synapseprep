// Node Modules
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Local Components
// import Table from '../Table';
import E from '../Equation/@Equation';
import { Typography, Grid, IconButton, Collapse } from '@material-ui/core';
// import T from './@Text';

// Local Assets

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    root: {},
    accordionWrapper: {
      maxWidth: '450px'
    },
    panelRoot: {
      transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    panelRootExpanded: {
      marginTop: '16px'
    },
    headingContainer: {},
    headingBase: {
      'font-weight': '600',
      'font-size': '1.3rem',
      'text-transform': 'uppercase',
      'letter-spacing': '1.2px',
      color: 'transparent',
      '-webkit-background-clip': 'text',
      'background-clip': 'text'
    },
    headingBaseReading: {},
    headingBaseWriting: {
      extend: 'headingBase',
      'background-image': 'linear-gradient(224deg,  #b465da 0%, #cf6cc9 33%, #ee609c 100%)'
    },
    headingBaseMath: {
      extend: 'headingBase',
      'background-image': 'linear-gradient(45deg, #2980ba 0%, #238E9B 50%, #00BF6F 100%)'
    },
    summaryContainer: {
      marginBottom: '20px',
      minHeight: '36px',
      cursor: 'pointer',
      transition:
        'min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid lightgrey'
    },
    summaryContainerExpanded: {
      marginBottom: '20px',
      minHeight: '52px'
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
      padding: '6px',
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        backgroundColor: 'transparent'
      },
      '&$expanded': {
        transform: 'rotate(180deg)'
      }
    },
    expanded: {},
    marginTest: {},
    result: {
      marginBottom: '25px',
      transition: 'margin-left 200ms',
      '&.rootTest': {
        color: 'red'
      }
    },
    intermediate: {
      marginBottom: '-20px'
    }
  };
};

const AccordionCustom = props => {
  const { classes } = props;
  const [expanded, setexpanded] = useState('');
  const [resultInitialWidth, setResultInitialWidth] = useState(0);
  // const [intermediateWidth, setIntermediateWidth] = useState(0);

  // const intermediateRef = useRef(null);

  // useEffect(() => {
  //   setIntermediateWidth(theElement ? theElement.offsetWidth : 0);
  // }, [intermediateRef.current]);

  // const handleChange = panel => expanded => {
  //   setexpanded(expanded ? panel : '');
  // };

  let intermediateLastSpans = [
    ...document.querySelectorAll('.rootTest span.vlist-t .vlist-r .vlist > span:last-child')
  ];
  if (intermediateLastSpans) {
    intermediateLastSpans.map(intermediateLastSpan => {
      console.log('intermediateLastSpan', intermediateLastSpan);
      intermediateLastSpan.style.opacity = 0;
      return intermediateLastSpan;
    });
  }
  console.log('intermediateLastSpans', intermediateLastSpans);
  let intermediateElement;
  let resultElement = document.querySelector('.resultTest span.vlist-t');

  useEffect(() => {
    resultElement = document.querySelector('.resultTest span.vlist-t');
    intermediateElement = document.querySelector('.rootTest span.vlist-t');
    let resultWidth = resultElement ? resultElement.offsetWidth : 0;
    setResultInitialWidth(`${resultWidth}px`);
    resultElement.style.width = `${resultWidth}px`;
  }, []);

  console.log('resultInitialWidth', resultInitialWidth);
  console.log('resultElement', resultElement);

  const handleClick = panel => {
    // if (!expanded) {
    //   setResultInitialWidth(resultElement ? resultWidth : 0);
    // }
    intermediateElement = document.querySelector('.rootTest span.vlist-t');
    console.log('intermediateElement', intermediateElement);

    let intermediateWidth = intermediateElement ? intermediateElement.offsetWidth : 0;
    console.log('intermetidate width', intermediateWidth);

    resultElement = document.querySelector('.resultTest span.vlist-t');
    resultElement.style.transition = 'width 232ms';

    console.log('resultElement', resultElement);

    if (resultElement) {
      console.log('intermediateWidthInside', `${intermediateWidth}px`);
      console.log('resultElementInside', resultElement);
      if (!expanded) {
        resultElement.style.width = `${intermediateWidth}px`;
      } else {
        resultElement.style.width = resultInitialWidth;
      }
    }

    if (expanded === panel || expanded === '') {
      setexpanded(!expanded ? panel : '');
    } else {
      setexpanded(expanded ? panel : '');
    }
  };

  // let childNumber;

  // if (expanded === 'panel1') {
  //   childNumber = 0;
  // }

  return (
    <Grid container item justify="center" className={classes.root}>
      <Grid item xs className={classes.accordionWrapper}>
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel1'
          })}
        >
          <Grid
            item
            onClick={() => {
              handleClick('panel1');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel1'
            })}
          >
            <Grid item container justify="space-between" alignItems="center">
              <Grid item className={classes.headingContainer}>
                <Typography variant="subtitle1" className={classes.headingBaseReading} inline>
                  First, combine like terms.
                </Typography>
              </Grid>
              <Grid item xs container justify="flex-end" alignItems="center">
                <IconButton
                  className={classNames(classes.expandIcon, {
                    [classes.expanded]: expanded === 'panel1'
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel1'} timeout="auto">
            <Grid item className={classes.intermediate}>
              <E block className="rootTest">
                {
                  '\\begin{aligned} \\blue x + (\\blue x \\green{+ 1}) + (\\blue x  \\green{+ 2})  & = 30 \\\\[0.5em]  \\blue x +\\blue x +\\blue x   \\green{+ 1} \\green{+ 2} & = 30 \\\\[0.5em]  \\blue{3x} \\green{+ 3}  & = 3000 \\end{aligned}'
                }
              </E>
            </Grid>
          </Collapse>
        </Grid>
        <Grid
          container
          item
          justify="center"
          className={classNames(classes.result, 'resultTest', {
            [classes.marginTest]: expanded === 'panel1'
          })}
        >
          {/* <div style={{ width: '500px', height: '500px' }}></div> */}
          <E block>{'\\begin{aligned}\\blue{3x} \\green{+ 3}  & = 3000 \\end{aligned}'}</E>
        </Grid>
        {/* Panel 2 */}
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel2'
          })}
        >
          <Grid
            item
            onClick={() => {
              handleClick('panel2');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel2'
            })}
          >
            <Grid item container justify="space-between" alignItems="center">
              <Grid item className={classes.headingContainer}>
                <Typography variant="subtitle1" className={classes.headingBaseReading} inline>
                  Next, subtract 3 from each side.
                </Typography>
              </Grid>
              <Grid item xs container justify="flex-end" alignItems="center">
                <IconButton
                  className={classNames(classes.expandIcon, {
                    [classes.expanded]: expanded === 'panel2'
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel2'} timeout="auto">
            <Grid item className={classes.intermediate}>
              <E block>
                {
                  '\\begin{aligned} 3x + 3 & = 30 \\\\[0.5em]  3x + 3 \\red{ - 3} & = 30 \\red{ - 3} \\end{aligned} \\hphantom{.......}'
                }
              </E>
            </Grid>
          </Collapse>
          <Grid container item justify="center" className={classes.result}>
            <E block>{'3x  = 27 '}</E>
          </Grid>
        </Grid>
        {/* Panel 3 */}
        <Grid
          className={classNames(classes.panelRoot, {
            [classes.panelRootExpanded]: expanded === 'panel3'
          })}
        >
          <Grid
            item
            onClick={() => {
              handleClick('panel3');
            }}
            className={classNames(classes.summaryContainer, {
              [classes.summaryContainerExpanded]: expanded === 'panel3'
            })}
          >
            <Grid item container justify="space-between" alignItems="center">
              <Grid item className={classes.headingContainer}>
                <Typography variant="subtitle1" className={classes.headingBaseReading} inline>
                  Last, divide both sides by 3.
                </Typography>
              </Grid>
              <Grid item xs container justify="flex-end" alignItems="center">
                <IconButton
                  className={classNames(classes.expandIcon, {
                    [classes.expanded]: expanded === 'panel3'
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={expanded === 'panel3'} timeout="auto">
            <Grid item className={classes.intermediate}>
              <E block>
                {'\\dfrac{3x}{\\red 3}  = \\dfrac{27}{\\red 3} \\hphantom{.} \\\\[1.8em]'}
              </E>
            </Grid>
          </Collapse>
          <Grid container item justify="center" className={classes.result}>
            <E block>{'x = 9'}</E>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AccordionCustom);
