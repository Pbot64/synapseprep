/* eslint-disable react-hooks/exhaustive-deps */
// Node Modules
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import JsxParser from 'react-jsx-parser';
import Triangle from '@material-ui/icons/PlayArrow';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RootRef from '@material-ui/core/RootRef';

// Local Components
import E from './Equation/@Equation';
import T from './Text/@Text';
import Choice from './Choice';
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import DialogCustom from './DialogCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
  dialogContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  dialog: {
    padding: '40px',
    cursor: 'move',
    paddingBottom: '20px',
    paddingRight: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    flexGrow: '1',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
      paddingTop: '35px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '60px',
      paddingTop: '70px',
      paddingBottom: '20px',
      margin: '75px',
      maxWidth: '900px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  choicesWrapper: {
    marginTop: '30px',
    borderTop: '0.5px solid lightgrey',
    borderBottom: '0'
    // borderBottom: '0.5px solid lightgrey'
  },
  questionTitleContainer: {
    marginLeft: '5px',
    marginTop: '20px'
  },
  line: {
    borderTop: '3px solid #343e4d'
  },
  triangle: {
    marginTop: '-8px',
    transform: 'rotate(90deg)'
  },
  multiQuestionTitle: {
    fontWeight: '600'
  },
  multiQuestionInfoWrapper: {}
});

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

const Question = props => {
  const [open, setOpen] = useState(false);
  const questionChoices = useRef();
  const {
    classes,
    currentQuestion,
    pageNumber,
    setSelected,
    selected,
    correct,
    answered,
    previousQuestion,
    questionRef
  } = props;

  const handleClick = e => {
    if (
      !answered &&
      !questionChoices.current.contains(e.target) &&
      questionRef.current.contains(e.target)
    ) {
      setSelected('');
    }
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const toggleMultiQuestionInfo = () => {
    setOpen(!open);
  };

  let multiQuestionTitle = [];
  if (currentQuestion.multi && previousQuestion.multi) {
    multiQuestionTitle = [pageNumber, pageNumber + 1];
  } else if (currentQuestion.multi) {
    multiQuestionTitle = [pageNumber + 1, pageNumber + 2];
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item container xs={12} className={classes.questionBody}>
          <Grid container item>
            {currentQuestion.multi && (
              <React.Fragment>
                <DialogCustom
                  open={open}
                  content={currentQuestion.multi}
                  currentQuestion={currentQuestion}
                  handleClose={() => {
                    setOpen(false);
                  }}
                />

                <Grid item container justify="center">
                  <Grid item>
                    <Grid
                      container
                      justify="center"
                      direction="column"
                      alignItems="center"
                      className={classes.multiQuestionInfoWrapper}
                    >
                      <Typography variant="subtitle2" className={classes.multiQuestionTitle}>
                        Questions {multiQuestionTitle[0]} and {multiQuestionTitle[1]} refer to the
                        following information.
                      </Typography>

                      <Grid container item>
                        <Grid item xs className={classes.line}></Grid>
                        <Triangle className={classes.triangle} />
                        <Grid item xs className={classes.line}></Grid>
                      </Grid>

                      <ButtonCustom size="small" onClick={toggleMultiQuestionInfo}>
                        View
                      </ButtonCustom>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
            <Grid item container justify="center" className={classes.questionTitleContainer}>
              <Typography variant="body2" component="div">
                <JsxParser
                  components={{ TeX, Grid, Typography, E, T }}
                  jsx={currentQuestion.title}
                />
              </Typography>
            </Grid>
          </Grid>
          <RootRef rootRef={questionChoices}>
            <Grid item xs className={classes.choicesWrapper}>
              {currentQuestion.choices.map((choiceContent, i) => (
                <Choice
                  key={choiceContent}
                  letter={letters[i]}
                  handleClick={handleClick}
                  selected={selected}
                  setSelected={setSelected}
                  answered={answered}
                  correct={correct}
                  choiceContent={choiceContent}
                />
              ))}
            </Grid>
          </RootRef>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Question.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);
