// Node Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import School from '@material-ui/icons/School';
import Key from '@material-ui/icons/VpnKey';

// Local Components
import Expansion from './Expansion';

// Local Assets

//  Style Overrides
const styles = theme => ({
  ruleRoot: {
    width: '100%',
    '&> :last-child': {
      marginBottom: '0px'
    }
  },
  textRoot: {
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '30px'
    }
  },
  half: {
    marginBottom: '5px'
  },
  bold: {
    fontWeight: '500'
  },
  italic: {
    fontStyle: 'italic'
  },
  inline: {
    display: 'inline'
  },
  ivy: {
    fontStyle: 'italic',
    fontSize: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem'
    }
  },
  center: {
    textAlign: 'center'
  },
  extraRoot: {
    paddingTop: '10px',
    marginBottom: '40px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '20px',
      marginBottom: '50px'
    }
  },
  errorOutline: {
    width: '30px',
    height: '40px',
    color: 'red'
  },
  schoolOutline: {
    width: '30px',
    height: '40px',
    color: '#2980ba'
  },
  stratOutline: {
    width: '30px',
    height: '40px',
    color: theme.palette.green
  },
  extraContentWrapper: {},
  extraContentContainer: {
    maxWidth: '400px',
    minWidth: 'initial',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'initial',
      minWidth: '500px'
    }
  },
  extraheaderInnerBase: {
    'background-color': 'white',
    padding: '10px',
    position: 'relative',
    'border-radius': '5px',
    'box-shadow': '0 18px 56px -18px rgba(22,45,61,.18)'
  },
  ivyExtraheaderInner: {
    extend: 'extraheaderInnerBase',
    border: '1px solid #2980ba'
  },
  trapExtraheaderInner: {
    extend: 'extraheaderInnerBase',
    border: '1px solid red'
  },
  stratExtraheaderInner: {
    extend: 'extraheaderInnerBase',
    border: '1px solid #00BF6F'
  },
  extraContent: {
    fontSize: '0.8125rem',
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '20px',
    paddingTop: '60px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    },
    '&> :last-child': {
      marginBottom: '0px'
    }
  },
  expandIconContainer: {
    borderTop: '1px solid lightgrey',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', 0.15),
    '&:hover': {
      // Disable the hover effect for the IconButton,
      // because a hover effect should apply to the entire Expand button and
      // not only to the IconButton.
      backgroundColor: 'transparent'
    },
    '&$expanded': {
      transform: 'rotate(180deg)'
    }
  },
  extraExpand: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  expanded: {},
  collapse: {
    marginTop: '-45px',
    borderRadiusTopRight: '10px',
    borderRadiusTopLeft: '10px'
  },
  newLine: {
    textIndent: '1.5rem',
    display: 'block'
  },
  highlight: {
    textDecoration: 'underline',
    marginRight: '4px',
    '&:before': {
      counterIncrement: 'line',
      content: 'counter(line)',
      backgroundColor: 'grey',
      display: 'inline',
      color: 'white',
      marginLeft: '0.3rem',
      marginRight: '.3rem',
      padding: '0px 7px',
      textDecoration: 'underline',
      textDecorationColor: 'grey',
      fontSize: '0.9rem',
      fontWeight: '500',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem'
      }
    }
  },
  top: {
    marginLeft: '1.5rem'
  },
  end: {
    textDecoration: 'none',
    '&:before': {
      display: 'none'
    },
    '&:after': {
      counterIncrement: 'line',
      content: 'counter(line)',
      backgroundColor: 'grey',
      display: 'inline',
      color: 'white',
      marginLeft: '0.3rem',
      marginRight: '.3rem',
      padding: '0px 7px',
      fontSize: '0.9rem',
      fontWeight: '500',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem'
      }
    }
  },
  inlineBlock: {
    display: 'inline-block'
  },
  passageRoot: {
    display: 'inline'
  },
  numberedParagraphContainer: {
    counterReset: 'test'
  },
  sentenceNumber: {
    '&:before': {
      counterIncrement: 'test',
      content: "'['counter(test)']'",
      display: 'inline',
      marginRight: '0.2rem'
    }
  },
  indent: {
    marginLeft: '25px'
  },
  numberedParagraphConnect: {
    counterReset: 'none'
  }
});

const T = props => {
  const [expanded, setExpanded] = useState(false);

  const {
    children,
    className,
    classes,
    bold,
    half,
    italic,
    inline,
    ivy,
    center,
    trap,
    rule,
    expand,
    choice,
    strat,
    passage,
    top,
    highlight,
    body,
    end,
    indent,
    numberedParagraph,
    numberedParagraphConnect,
    inlineBlock,
    ...rest
  } = props;

  // let stringChild = [];
  // let objectChild = [];
  // if (passage) {
  //   for (var i = 0; i < children.length; i++) {
  //     if (typeof children[i] === 'string') {
  //       stringChild.push(children[i]);
  //     } else {
  //       objectChild.push(children[i]);
  //     }
  //   }
  // }
  // console.log(stringChild, objectChild);
  return (
    <React.Fragment>
      {/* {React.Children.map(children, child => {
        console.log('child', child);
      })} */}
      {rule && (
        <Expansion top={rule}>
          <div
            className={classNames(
              classes.ruleRoot,
              {
                [classes.bold]: bold,
                [classes.half]: half,
                [classes.italic]: italic,
                [classes.inline]: inline,
                [classes.center]: center
              },
              className
            )}
            {...rest}
          >
            {children}
          </div>
        </Expansion>
      )}
      {(trap || ivy || strat) && (
        <React.Fragment>
          <Grid item className={classes.extraRoot}>
            <Grid item container justify="center">
              <Grid
                item
                className={
                  trap
                    ? classes.trapExtraheaderInner
                    : ivy
                    ? classes.ivyExtraheaderInner
                    : classes.stratExtraheaderInner
                }
              >
                <Grid item container direction="column" alignItems="center" justify="center">
                  {trap ? (
                    <ErrorOutline className={classes.errorOutline} />
                  ) : ivy ? (
                    <School className={classes.schoolOutline} />
                  ) : (
                    <Key className={classes.stratOutline} />
                  )}
                  <Typography variant="caption" color="inherit">
                    {trap ? 'Trap Alert' : ivy ? 'Ivy League' : 'Key Strat'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.extraContentWrapper}>
              <Grid item xs={12} sm={10} className={classes.extraContentContainer}>
                <Collapse
                  className={classes.collapse}
                  collapsedHeight={expand ? '200px' : 'auto'}
                  in={expand ? expanded : true}
                  timeout="auto"
                >
                  <Grid
                    item
                    className={classNames(
                      classes.extraContent,
                      {
                        [classes.bold]: bold,
                        [classes.half]: half,
                        [classes.italic]: italic,
                        [classes.inline]: inline,
                        [classes.center]: center,

                        [classes.extraExpand]: expanded
                      },
                      className
                    )}
                    {...rest}
                  >
                    {children}
                  </Grid>
                </Collapse>
                {expand && (
                  <Grid
                    container
                    justify="center"
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                    className={classes.expandIconContainer}
                  >
                    <IconButton
                      className={classNames(classes.expandIcon, {
                        [classes.expanded]: expanded
                      })}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {passage && (
        <div
          className={classNames(
            classes.passageRoot,
            {
              [classes.bold]: bold,
              [classes.half]: half,
              [classes.italic]: italic,
              [classes.inline]: inline,
              [classes.inlineBlock]: inlineBlock,
              [classes.numberedParagraphContainer]: numberedParagraph,
              [classes.numberedParagraphConnect]: numberedParagraphConnect,
              [classes.indent]: indent
            },
            className
          )}
          {...rest}
        >
          {console.log('children', children)}
          {(() => {
            if (Array.isArray(children)) {
              return children.map(paragraph => {
                console.log('paragraph', paragraph);
                if (typeof paragraph === 'string' && paragraph !== ' ') {
                  console.log('IN ARRAY AND STRING', paragraph);
                  return paragraph.split('\\l').map((item, key) => {
                    return (
                      <div
                        key={key}
                        className={inline || highlight ? classes.inline : classes.newLine}
                      >
                        {highlight ? (
                          <span
                            className={classNames(classes.highlight, {
                              [classes.top]: top,
                              [classes.end]: end
                            })}
                          >
                            {item}
                          </span>
                        ) : numberedParagraph || numberedParagraphConnect ? (
                          item.match(/[^.?!]+[.!?]+[\])'"`’”]*/g).map((sentence, key) => {
                            const fixedSentence = sentence.replace(/^\s+/g, '');
                            const test = `${fixedSentence} `;
                            return <span className={classes.sentenceNumber}>{test}</span>;
                          })
                        ) : (
                          <span>{item}</span>
                        )}
                      </div>
                    );
                  });
                } else {
                  console.log('IN ARRAY AND NOT STRING', paragraph);
                  return paragraph;
                }
              });
            } else {
              if (typeof children === 'string' && children !== ' ') {
                console.log('NOT IN ARRAY AND STRING', children);
                return children.split('\\l').map((item, key) => {
                  return (
                    <span
                      key={key}
                      className={inline || highlight ? classes.inline : classes.newLine}
                    >
                      {highlight ? (
                        <span
                          className={classNames(classes.highlight, {
                            [classes.top]: top,
                            [classes.end]: end
                          })}
                        >
                          {item}
                        </span>
                      ) : numberedParagraph || numberedParagraphConnect ? (
                        item.match(/[^.?!]+[.!?]+[\])'"`’”]*/g).map((sentence, key) => {
                          const fixedSentence = sentence.replace(/^\s+/g, '');
                          const test = `${fixedSentence} `;
                          return (
                            <span key={key} className={classes.sentenceNumber}>
                              {test}
                            </span>
                          );
                        })
                      ) : (
                        <span>{item}</span>
                      )}
                    </span>
                  );
                });
              } else {
                console.log('NOT IN ARRAY AND NOT STRING', children);
                return children;
              }
            }
          })()}
        </div>
      )}
      {!rule && !trap && !ivy && !strat && !passage && (
        <div
          className={classNames(
            classes.textRoot,
            {
              [classes.bold]: bold,
              [classes.half]: half,
              [classes.italic]: italic,
              [classes.inline]: inline,
              [classes.center]: center
            },
            className
          )}
          {...rest}
        >
          {children}
        </div>
      )}
    </React.Fragment>
  );
};

T.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(T);
