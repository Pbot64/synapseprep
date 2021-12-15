// Node Modules
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import JsxParser from 'react-jsx-parser';

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

const AccordionStep = props => {
  const { classes, children, title } = props;
  const [expanded, setexpanded] = useState('');
  const [resultInitialWidth, setResultInitialWidth] = useState(0);
  const [intermediateLast, setIntermediateLast] = useState('');
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

  let intermediateLastElementSpan = document.querySelector(
    '.rootTest span.vlist-t .vlist-r .vlist > span:last-child > .mord'
  );

  if (intermediateLastElementSpan) {
    console.log('intermediateLastElementSpans', intermediateLastElementSpan.offsetWidth);
  }
  if (intermediateLastSpans) {
    intermediateLastSpans.map(intermediateLastSpan => {
      intermediateLastSpan.style.opacity = 0;
      return intermediateLastSpan;
    });
  }

  let intermediateElement;
  // let resultElement = document.querySelector('.resultTest span.vlist-t');
  let resultElement;
  useEffect(() => {
    resultElement = document.querySelector('.resultTest span.vlist-t');
    intermediateElement = document.querySelector('.rootTest span.vlist-t');
    if (intermediateElement) {
      console.log('childrenInside', children);
      let intermediateLastLineFix = children.replace(/.+(\\l\b)/gm, '');
      setIntermediateLast(intermediateLastLineFix);
    }
    setResultInitialWidth(resultElement ? `${resultElement.offsetWidth}px` : '0px');
    console.log('test', resultInitialWidth);
    if (resultElement) {
      resultElement.style.width = resultElement ? `${resultElement.offsetWidth}px` : '0px';
    }
  }, []);

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

    if (resultElement) {
      console.log('intermediateWidthInside', `${intermediateWidth}px`);

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

  // const stringTest =
  //   '\\begin{aligned} \\blue x + (\\blue x \\green{+ 1}) + (\\blue x  \\green{+ 2})  & = 30 \\l  \\blue x +\\blue x +\\blue x   \\green{+ 1} \\green{+ 2} & = 30 \\l  \\blue{3x} \\green{+ 3}  & = 3000 \\end{aligned}';

  // if (resultElement) {
  //   intermediateLast = children.replace(/.+(\\l\b)/gm, '');
  // }

  return (
    <>
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
          <Grid item container justify='space-between' alignItems='center'>
            <Grid item className={classes.headingContainer}>
              <Typography variant='subtitle1' className={classes.headingBaseReading} inline>
                {title}
              </Typography>
            </Grid>
            <Grid item xs container justify='flex-end' alignItems='center'>
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
        <Collapse in={expanded === 'panel1'} timeout='auto'>
          <Grid item className={classNames(classes.intermediate, 'rootTest')}>
            {console.log('children', children)}

            <E block>{children}</E>
          </Grid>
        </Collapse>
      </Grid>
      {console.log('intermediateLast', intermediateLast)}
      <Grid
        container
        item
        justify='center'
        className={classNames(classes.result, 'resultTest', {
          [classes.marginTest]: expanded === 'panel1'
        })}
      >
        {/* <div style={{ width: '500px', height: '500px' }}></div> */}
        <E block>{`\\begin{aligned} ${intermediateLast}`}</E>
      </Grid>
    </>
  );
};

export default withStyles(styles)(AccordionStep);
