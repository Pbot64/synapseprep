/* eslint-disable react-hooks/exhaustive-deps */
// Node Modules
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import RootRef from '@material-ui/core/RootRef';

// Local Components

// Local Assets

//  Style Overrides
const styles = theme => ({
  questionBody: {
    marginTop: '20px'
  },
  choicesWrapper: {
    marginTop: '40px'
  },
  choiceButtonRoot: {
    marginLeft: '5px',
    marginRight: '20px',
    minWidth: 'inherit',
    borderRadius: '1000px',
    height: '45px',
    width: '45px',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(0px)',
      backgroundColor: '#00BF6F'
    }
  },
  choiceContainer: {
    cursor: 'pointer',
    borderBottom: '1px solid lightgrey',
    padding: '10px 0px',
    '&:hover': {
      backgroundColor: '#00f08b14',
      '& $notSelected': {
        backgroundColor: '#00f08b',
        transform: 'scale(1.1)',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    }
  },
  choiceContainerSelected: {
    cursor: 'pointer',
    borderBottom: '1px solid lightgrey',
    padding: '10px 0px',
    backgroundColor: '#00f08b14',
    '&:hover': {
      '& $notSelected': {
        backgroundColor: '#00f08b',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    }
  },
  choiceContainerTop: {
    cursor: 'pointer',
    borderBottom: '1px solid lightgrey',
    borderTop: '1px solid lightgrey',
    padding: '10px 0px',
    '&:hover': {
      backgroundColor: '#00f08b14',
      '& $notSelected': {
        backgroundColor: '#00f08b',
        transform: 'scale(1.1)',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    }
  },
  choiceContainerTopSelected: {
    cursor: 'pointer',
    borderBottom: '1px solid lightgrey',
    borderTop: '1px solid lightgrey',
    padding: '10px 0px',
    backgroundColor: '#00f08b14',
    '&:hover': {
      '& $notSelected': {
        backgroundColor: '#00f08b',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    }
  },
  selected: {
    backgroundColor: '#00BF6F',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    color: 'white',
    border: '1px solid white'
  },
  notSelected: {
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  incorrect: {
    transition: 'transform 0.3s',
    backgroundColor: '#ffe6e6'
  },
  incorrectChoiceButton: {
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'red',
      transform: 'translateY(0px)'
    }
  },
  disabled: {
    backgroundColor: 'white',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'white',
      '& $notSelected': {
        backgroundColor: 'white',
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        transform: 'scale(1)'
      }
    }
  },
  disabledButton: {
    marginRight: '20px',
    minWidth: 'inherit',
    borderRadius: '1000px',
    padding: '8px 16px',
    transition: 'transform 0.3s',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.0)',
      boxShadow: '0px 5px 10px rgba(0,0,0,0)'
    }
  }
});

const Question = props => {
  const questionChoice = useRef();
  const {
    classes,
    currentQuestion,
    setSelected,
    selected,
    correct,
    completed,
    questionRef
  } = props;
  console.log('completed in question', completed);
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const handleClick = (e, selection) => {
    console.log(questionRef.current);
    console.log('selection', selection);
    console.log(e.target);
    console.log('completed in question', completed);
    console.log('notcompleted', !completed);

    if (!completed && questionChoice.current.contains(e.target)) {
      setSelected(selection);
      return;
    }
    if (!completed && questionRef.current.contains(e.target)) {
      setSelected('');
    }
  };

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item container xs={12} className={classes.questionBody}>
          <Grid item container justify="center">
            <Typography variant="body2">{currentQuestion.title}</Typography>
          </Grid>
          <RootRef rootRef={questionChoice}>
            <Grid item xs className={classes.choicesWrapper}>
              <Grid
                item
                container
                alignItems="center"
                className={classNames(
                  selected === 'A'
                    ? classes.choiceContainerTopSelected
                    : classes.choiceContainerTop,
                  {
                    [classes.incorrect]: selected === 'A' && completed === true && !correct,
                    [classes.disabled]: selected !== 'A' && completed === true
                  }
                )}
                onClick={e => {
                  handleClick(e, 'A');
                }}
              >
                <ButtonCustom
                  disabled={selected !== 'A' && completed === true}
                  className={classNames(
                    classes.choiceButtonRoot,
                    selected === 'A' ? classes.selected : classes.notSelected,
                    {
                      [classes.incorrectChoiceButton]:
                        selected === 'A' && completed === true && !correct,
                      [classes.disabledButton]: selected !== 'A' && completed === true
                    }
                  )}
                >
                  A
                </ButtonCustom>
                <Typography variant="body2">{currentQuestion.choices[0]}</Typography>
              </Grid>

              <Grid
                item
                container
                alignItems="center"
                className={classNames(
                  selected === 'B' ? classes.choiceContainerSelected : classes.choiceContainer,
                  {
                    [classes.incorrect]: selected === 'B' && completed === true && !correct,
                    [classes.disabled]: selected !== 'B' && completed === true
                  }
                )}
                onClick={e => {
                  handleClick(e, 'B');
                }}
              >
                <ButtonCustom
                  disabled={selected !== 'B' && completed === true}
                  className={classNames(
                    classes.choiceButtonRoot,
                    selected === 'B' ? classes.selected : classes.notSelected,
                    {
                      [classes.incorrectChoiceButton]:
                        selected === 'B' && completed === true && !correct,
                      [classes.disabledButton]: selected !== 'B' && completed === true
                    }
                  )}
                >
                  B
                </ButtonCustom>
                <Typography variant="body2">{currentQuestion.choices[1]}</Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                className={classNames(
                  selected === 'C' ? classes.choiceContainerSelected : classes.choiceContainer,
                  {
                    [classes.incorrect]: selected === 'C' && completed === true && !correct,
                    [classes.disabled]: selected !== 'C' && completed === true
                  }
                )}
                onClick={e => {
                  handleClick(e, 'C');
                }}
              >
                <ButtonCustom
                  disabled={selected !== 'C' && completed === true}
                  className={classNames(
                    classes.choiceButtonRoot,
                    selected === 'C' ? classes.selected : classes.notSelected,
                    {
                      [classes.incorrectChoiceButton]:
                        selected === 'C' && completed === true && !correct,
                      [classes.disabledButton]: selected !== 'C' && completed === true
                    }
                  )}
                >
                  C
                </ButtonCustom>
                <Typography variant="body2">{currentQuestion.choices[2]}</Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                className={classNames(
                  selected === 'D' ? classes.choiceContainerSelected : classes.choiceContainer,
                  {
                    [classes.incorrect]: selected === 'D' && completed === true && !correct,
                    [classes.disabled]: selected !== 'D' && completed === true
                  }
                )}
                onClick={e => {
                  handleClick(e, 'D');
                }}
              >
                <ButtonCustom
                  disabled={selected !== 'D' && completed === true}
                  className={classNames(
                    classes.choiceButtonRoot,
                    selected === 'D' ? classes.selected : classes.notSelected,
                    {
                      [classes.incorrectChoiceButton]:
                        selected === 'D' && completed === true && !correct,
                      [classes.disabledButton]: selected !== 'D' && completed === true
                    }
                  )}
                >
                  D
                </ButtonCustom>
                <Typography variant="body2">{currentQuestion.choices[3]}</Typography>
              </Grid>
            </Grid>
          </RootRef>
        </Grid>
      </Grid>
    </div>
  );
};

Question.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);
