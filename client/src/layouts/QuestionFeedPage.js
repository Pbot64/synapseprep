// TODO Refactor effects to eliminate both comment hack on next line.
/* eslint-disable react-hooks/exhaustive-deps */
// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import RootRef from '@material-ui/core/RootRef';

// Local Components
import Question from '../components/Question';
import TooltipCustom from '../components/TooltipCustom';
import ProgressMobileStepper from '../components/Stepper';
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import QuestionSolution from '../components/QuestionSolution';

// Actions
import { setTasks, updateStoreSelected, updateStoreCompleted } from '../actions/profileActions';
import CardCustom from '../assets/jss/components/CardCustom';

// Local Assets
import calculator from '../assets/images/calculator.svg';
import noCalculator from '../assets/images/no-calculator.svg';
import lightBulb from '../assets/images/light-bulb.svg';
import lesson from '../assets/images/lesson.svg';
import chevronRight from '../assets/images/chevron-right.svg';

//  Style Overrides
const styles = theme => ({
  questionWrapper: {
    marginTop: '50px'
  },
  questionContainer: {
    minHeight: '400px',
    maxWidth: '700px'
  },
  questionTop: {
    marginBottom: 18,
    borderBottom: '1px solid black'
  },
  progress: {
    color: 'grey'
  },
  progressContainer: {
    height: '-webkit-fill-available'
  },
  bottomContainer: {
    maxWidth: '700px',
    marginTop: '18px',
    borderTop: '1px solid black'
  },
  calculator: {
    marginLeft: '20px',
    width: '15px'
  },
  bottomIcon: {
    height: '25px',
    marginRight: '8px'
  },
  bottomOptionWrapper: {
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.6'
    }
  },
  solutionTitleContainer: {
    padding: '15px',
    borderRadius: '10px',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    width: '100%',
    '&:hover': {
      transform: 'translateY(0px)',
      opacity: '0.8'
    },
    '&:after': {
      background: `url(${chevronRight}) no-repeat`,
      transform: 'rotate(90deg)',
      content: '""',
      transition: 'transform 0.3s',
      height: '14px',
      width: '14px',
      [theme.breakpoints.up('sm')]: {
        height: '20px',
        width: '20px'
      }
    },
    '&:hover:after': {
      transform: 'rotate(90deg) translateX(5px)'
    },
    '&:before': {
      background: `url(${chevronRight}) no-repeat`,
      transform: 'rotate(90deg)',
      content: '""',
      transition: 'transform 0.3s',
      height: '14px',
      width: '14px',
      [theme.breakpoints.up('sm')]: {
        height: '20px',
        width: '20px'
      }
    },
    '&:hover:before': {
      transform: 'rotate(90deg) translateX(5px)'
    }
  },
  solutionTitleBase: {
    'font-weight': '600',
    'font-size': '1.3rem',
    'text-transform': 'uppercase',
    'letter-spacing': '1.2px',
    transform: 'skewY(-4deg)',
    color: 'transparent',
    '-webkit-background-clip': 'text',
    'background-clip': 'text'
  },
  solutionTitleMath: {
    'font-size': '1rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(45deg, #2980ba 0%, #238E9B 50%, #00BF6F 100%)',
    'border-bottom': '1px solid #00BF6F',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleReading: {
    'font-size': '1rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    'border-bottom': '1px solid #ffbe5f',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleWriting: {
    'font-size': '1rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(224deg,  #b465da 0%, #cf6cc9 33%, #ee609c 100%)',
    'border-bottom': '1px solid #cf6cc9',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleWrapper: {
    height: '55px'
  },
  hintNumber: {
    marginLeft: '10px'
  }
});

const QuestionFeedPage = props => {
  // Ref Hooks
  const questionRef = useRef();
  const questionSolution = useRef(null);

  // State Declarations
  const [pageNumber, setPageNumber] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState('');
  const [solutionStep, setSolutionStep] = useState(0);

  // Destructure Props
  const { classes, setTasks, updateStoreSelected, updateStoreCompleted } = props;
  const { tasks, questions } = props.profile.practice;
  const { assignment } = props.profile;
  const { loading } = props.question;

  // Variables
  let currentQuestions = [];
  let currentQuestion;
  let nextQuestion;
  let previousQuestion;
  let hasQuestions = false;
  if (questions[assignment].length !== 0) {
    currentQuestions = questions[assignment];
    currentQuestion = questions[assignment][pageNumber];
    nextQuestion = questions[assignment][pageNumber + 1];
    previousQuestion = questions[assignment][pageNumber - 1];
    hasQuestions = true;
  }

  /* -------------------------------------------------------------------------- */
  /*                          First Render Effect Hooks                          */
  /* -------------------------------------------------------------------------- */

  //* Set local "completed", "selected", and "correct" to the first question's corresponding store properties
  useEffect(() => {
    setCompleted(currentQuestion.completed);
    setSelected(currentQuestion.selected);
    setCorrect(currentQuestion.selected === currentQuestion.rightChoice);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                       Subsequent Render Effect Hooks                       */
  /* -------------------------------------------------------------------------- */

  //* Update current question store "selected" to local "selected"
  useEffect(() => {
    updateStoreSelected({ selected, pageNumber, assignment });
  }, [selected]);

  //* Update current question store "completed" to local "completed"
  useEffect(() => {
    updateStoreCompleted({ completed, pageNumber, assignment });
  }, [completed]);

  /* -------------------------------------------------------------------------- */
  /*                          "User Activated" Methods                          */
  /* -------------------------------------------------------------------------- */

  //* When user clicks NEXT button...
  const handleNext = () => {
    // If local "completed" is true or there is no local selected then apply following logic to next question:
    if (completed || selected === '') {
      // Disable Next button on the last question in assignment.
      if (pageNumber === currentQuestions.length - 1) {
        return null;
      }
      // Increase page number
      setPageNumber(pageNumber + 1);
      // Set local "selected" to next question store "selected"
      setSelected(nextQuestion.selected);
      // Set local "completed" to true/false and local "solutionStep" to 0 based on next question store "completed"
      if (nextQuestion.completed) {
        setCompleted(true);
      } else {
        setCompleted(false);
        setSolutionStep(0);
      }
      // Set local "correct" to true or false based on whether next question store "selected" is equal to next question store "rightChoice"
      nextQuestion.selected === nextQuestion.rightChoice ? setCorrect(true) : setCorrect(false);

      // Else local "completed" is false or there is a local "selected" value then apply following logic to current question:
    } else {
      // Set local "solutionStep" to 3
      setSolutionStep(3);
      // Set local "completed" to true if there is a local "selected"
      if (selected !== '') {
        setCompleted(true);
      }
      // Set local "correct" to true if local "selected" is equal to current question store "rightChoice."
      if (selected === currentQuestion.rightChoice) {
        setCorrect(true);
      }
    }
  };

  //* When user clicks BACK button...
  const handleBack = () => {
    // Decrease page number
    setPageNumber(pageNumber - 1);
    // Set local "selected" to previous question store "selected"
    setSelected(previousQuestion.selected);
    // Set local "completed" to true/false and local "solutionStep" # based on previous question store "selected"
    if (previousQuestion.selected === '') {
      setCompleted(false);
      setSolutionStep(0);
    } else {
      setSolutionStep(3);
      setCompleted(true);
    }
    // Set local "correct" to true or false based on whether previous question store "selected" is equal to previous question store "rightChoice"
    previousQuestion.selected === previousQuestion.rightChoice
      ? setCorrect(true)
      : setCorrect(false);
  };

  //* Scroll down to solution when user clicks SOLUTION button
  const handleScroll = () => {
    window.scrollTo({ top: questionSolution.current.offsetTop - 95, left: 0, behavior: 'smooth' });
  };

  /* -------------------------------------------------------------------------- */
  /*                            EXTRA STUFF FOR DEBUGGING                       */
  /* -------------------------------------------------------------------------- */

  //* Resets "selected" and "completed" values for all questions in store
  const handleReset = () => {
    currentQuestions.map(question => {
      question.selected = '';
      question.completed = false;
      return question;
    });
  };

  //* Create local array of current assignment store "selected" values.
  const assignmentArray = currentQuestions.map(question => {
    return {
      selected: question.selected,
      completed: question.completed
    };
  });

  //* Need to learn jest + enzyme
  console.log('props', props);
  console.log('assignmentArray', assignmentArray);
  console.log('pageNumber', pageNumber);
  console.log('currentQuestion', currentQuestion);
  if (hasQuestions) {
    console.log('questions', currentQuestions);
  }
  console.log('correct', correct);

  /* -------------------------------------------------------------------------- */
  /*                                 DOM Content                                */
  /* -------------------------------------------------------------------------- */

  let questionContent;
  if (!hasQuestions || loading) {
    questionContent = (
      <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
        <CircularProgress className={classes.progress} />
      </Grid>
    );
  } else {
    questionContent = (
      <React.Fragment>
        <RootRef rootRef={questionRef}>
          <Grid item container justify="center" className={classes.questionWrapper}>
            <Grid item xs={12} sm={10} md={9} className={classes.questionContainer}>
              <Grid
                item
                container
                className={classes.questionTop}
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="caption" className={classes.questionNumber}>
                  QUESTION {pageNumber + 1}
                </Typography>

                <Grid item>
                  <Grid item container>
                    <Typography variant="h6" className={classes.questionType}>
                      {currentQuestion.type}
                    </Typography>
                    {tasks[assignment][0].subject === 'Math' && (
                      <img
                        src={currentQuestion.calculator ? calculator : noCalculator}
                        className={classes.calculator}
                        alt={currentQuestion.calculator ? 'calculator' : 'noCalculator'}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <CardCustom borderBottom padding>
                <Question
                  questionRef={questionRef}
                  completed={completed}
                  rightChoice={currentQuestion.rightChoice}
                  correct={correct}
                  selected={selected}
                  setSelected={setSelected}
                  currentQuestion={currentQuestion}
                  pageNumber={pageNumber}
                />
              </CardCustom>
            </Grid>
          </Grid>
        </RootRef>

        <Grid item container justify="center" className={classes.bottomWrapper}>
          <Grid item xs={12} sm={10} md={9} className={classes.bottomContainer}>
            <Grid item container justify="space-between" alignItems="center">
              <Grid
                item
                onClick={() => {
                  if (solutionStep < 3) {
                    setSolutionStep(solutionStep + 1);
                  }
                  if (completed) {
                    setSolutionStep(3);
                  }
                }}
                className={classes.bottomOptionWrapper}
              >
                <Grid item container alignItems="center" className={classes.hintContainer}>
                  <img src={lightBulb} className={classes.bottomIcon} alt="hint" />
                  <div ref={questionSolution}>
                    <Typography variant="subtitle2" className={classes.bottomIconText}>
                      Hint
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.hintNumber}
                  >
                    {solutionStep}/3
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={5} className={classes.solutionTitleWrapper}>
                {(solutionStep > 0 || completed) && (
                  <ButtonCustom
                    onClick={handleScroll}
                    className={classes.solutionTitleContainer}
                    backgroundColor="white"
                  >
                    <Typography
                      variant="h4"
                      className={
                        assignment === 0
                          ? classes.solutionTitleMath
                          : assignment === 1
                          ? classes.solutionTitleReading
                          : classes.solutionTitleWriting
                      }
                    >
                      Solution
                    </Typography>
                  </ButtonCustom>
                )}
              </Grid>
              <Grid item className={classes.bottomOptionWrapper}>
                <TooltipCustom title="Sorry. Not available yet. Currently working on linking questions to their associated lessons.">
                  <Grid item container alignItems="center">
                    <img src={lesson} className={classes.bottomIcon} alt="lesson" />
                    <Typography variant="subtitle2" className={classes.bottomIconText}>
                      Lesson
                    </Typography>
                  </Grid>
                </TooltipCustom>
              </Grid>
            </Grid>

            <Grid item container className={classes.explanationWrapper}>
              <QuestionSolution
                completed={completed}
                solutions={currentQuestion.solutions}
                solutionStep={solutionStep}
              />
            </Grid>
          </Grid>
        </Grid>

        <ButtonCustom hasArrowRight onClick={handleReset}>
          Reset
        </ButtonCustom>
        {pageNumber}

        <ProgressMobileStepper
          setCompleted={setCompleted}
          setSelected={setCorrect}
          setCorrect={setCorrect}
          completed={completed}
          questions={questions}
          currentQuestions={currentQuestions}
          assignment={assignment}
          setTasks={setTasks}
          selected={selected}
          tasks={tasks}
          handleNext={handleNext}
          handleBack={handleBack}
          pageNumber={pageNumber}
        />
      </React.Fragment>
    );
  }

  return <React.Fragment>{questionContent}</React.Fragment>;
};

QuestionFeedPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  question: state.question,
  profile: state.profile,
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { setTasks, updateStoreSelected, updateStoreCompleted }
  )(QuestionFeedPage)
);
