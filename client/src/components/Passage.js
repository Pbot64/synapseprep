// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components

// Local Components

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
    whiteSpace: 'pre-wrap',
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
  underline: {
    textDecoration: 'underline'
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

const P = props => {
  const {
    children,
    className,
    classes,
    bold,
    half,
    italic,
    inline,
    center,
    choice,
    strat,
    top,
    highlight,
    body,
    end,
    indent,
    underline,
    numberedParagraph,
    numberedParagraphConnect,
    inlineBlock,
    ...rest
  } = props;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

P.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(P);
