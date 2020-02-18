// TODO Refactor effects to eliminate comment hack on next line.
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
import TooltipCustom from '../components/Text/TooltipCustom';
import ProgressMobileStepper from '../components/Stepper';
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import QuestionSolution from '../components/QuestionSolution';
import DialogPassage from '../components/DialogPassage';
import UseDidMountEffect from '../components/common/useDidMountEffect';

// Actions
import {
  updateTasks,
  updateStoreSelected,
  updateStoreAnswered,
  updateStorePageNumbers
} from '../actions/profileActions';
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
    marginTop: '30px'
  },
  questionContainer: {
    minHeight: '400px',
    maxWidth: '700px'
  },
  questionTop: {
    marginBottom: 18,
    paddingBottom: '5px',
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
    height: '25px'
  },
  bottomOptionWrapper: {
    textTransform: 'none',
    padding: '6px 10px',
    border: 'none',
    boxShadow: 'none',
    [theme.breakpoints.up(450)]: {
      padding: '8px 15px'
    }
  },
  solutionTitleContainer: {
    padding: '15px',
    borderRadius: '10px',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: 'none',
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
      height: '12px',
      width: '12px',
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
      height: '12px',
      width: '12px',
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
    'font-size': '0.875rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(45deg, #2980ba 0%, #238E9B 50%, #00BF6F 100%)',
    'border-bottom': '1px solid #00BF6F',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleReading: {
    'font-size': '0.875rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    'border-bottom': '1px solid #ffbe5f',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleWriting: {
    'font-size': '0.875rem',
    extend: 'solutionTitleBase',
    backgroundImage: 'linear-gradient(224deg,  #b465da 0%, #cf6cc9 33%, #ee609c 100%)',
    'border-bottom': '1px solid #cf6cc9',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.3rem'
    }
  },
  solutionTitleWrapper: {
    minWidth: '140px',
    height: '55px'
  },
  hintNumber: {
    marginLeft: '10px'
  },
  bottomIconText: {
    marginLeft: '8px',
    display: 'none',
    [theme.breakpoints.up(450)]: {
      display: 'initial'
    }
  }
});

const QuestionFeedPage = props => {
  // Ref Hooks
  const questionRef = useRef();
  const questionSolution = useRef(null);

  // State Declarations
  const [pageNumber, setPageNumber] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState('');
  const [hintStep, setHintStep] = useState(0);
  const [passage, setPassage] = useState(false);
  console.log('pageNumber', pageNumber);

  // Destructure Props
  const {
    classes,
    updateTasks,
    updateStoreSelected,
    updateStoreAnswered,
    updateStorePageNumbers
  } = props;
  const { tasksHistory, questionsHistory } = props.profile.profile;

  const { assignment, pageNumbers } = props.profile;
  const { loading } = props.question;

  // Variables
  let currentQuestions = [];
  let currentQuestion;
  let nextQuestion;
  let previousQuestion;
  const assPageNumber = pageNumbers[assignment];

  let hasQuestions = false;

  const subjects = ['Math', 'Reading', 'Writing'];

  const currentSubject = subjects[assignment];

  const currentTasks = tasksHistory.filter(
    taskHistory => taskHistory.taskContent.subject === currentSubject
  );

  const currentTasksIds = currentTasks.map(currentTask => currentTask.taskContent.taskId);

  // const currentTasks = profileTasks.filter(
  //   profileTask => profileTask.subject === subjects[assignment]
  // );

  currentQuestions = questionsHistory.filter(
    questionHistory => questionHistory.questionContent.subject === currentSubject
  );

  // currentQuestions = profileQuestions.filter(profileQuestion => {
  //   return currentTasks.map(currentTask => currentTask.taskId === profileQuestion.taskId);
  // });

  // console.log('currentQuestions', currentQuestions);
  // console.log('currentTasks', currentTasks);

  //  const currentQuestions = currentTasks.map(currenttask => {
  //    return currentTask.questions
  //  })

  //  const currentQuest

  /* -------------------------------------------------------------------------- */
  /*                          First Render Effect Hooks                          */
  /* -------------------------------------------------------------------------- */

  //* Set local "answered", "selected", and "correct" to the first question's corresponding store properties
  useEffect(() => {
    let i = assPageNumber;
    setAnswered(currentQuestions[i].answered);
    setSelected(currentQuestions[i].selected);
    setPageNumber(i);
    setCorrect(currentQuestions[i].selected === currentQuestions[i].questionContent.rightChoice);
    setHintStep(currentQuestions[i].answered ? currentQuestions[i].questionContent.hints : 0);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                       Subsequent Render Effect Hooks                       */
  /* -------------------------------------------------------------------------- */

  //* Update current question store "selected" to local "selected"
  UseDidMountEffect(() => {
    console.log('selected', selected);
    updateStoreSelected({ selected, currentSubject, currentTasksIds, currentQuestion });
  }, [selected]);

  //* Update current question store "answered" to local "answered"
  UseDidMountEffect(() => {
    updateStoreAnswered({
      answered,
      currentSubject,
      currentTasksIds,
      currentQuestion
    });
  }, [answered]);

  //* Update current store "page number" to local "page number"
  // useEffect(() => {
  //   if (pageNumber !== pageNumberStored) {
  //     console.log('pageNumber effect hook', pageNumber);
  //     updateStorePageNumbers(pageNumber);
  //   }
  // }, [pageNumber, pageNumberStored]);

  UseDidMountEffect(() => {
    const updatedPageNumbers = pageNumbers.map((storedPageNumber, i) =>
      i === assignment ? pageNumber : storedPageNumber
    );
    console.log('updatedPageNumber', updatedPageNumbers);
    updateStorePageNumbers(updatedPageNumbers);
  }, [pageNumber]);

  // useEffect(() => {
  //   console.log('settest', test);
  // }, [test]);

  /* -------------------------------------------------------------------------- */
  /*                          "User Activated" Methods                          */
  /* -------------------------------------------------------------------------- */

  //* When user clicks NEXT button...
  const handleNext = () => {
    // If local "answered" is true or there isn't a local "selected" then apply this logic to next question:
    if (answered || !selected) {
      // Disable Next button on the last question in assignment.
      if (pageNumber === currentQuestions.length - 1) {
        return null;
      }
      // Increase page number and scroll to top
      setPageNumber(pageNumber + 1);
      window.scrollTo(0, 0);
      // Set local "selected" to next question store "selected"
      setSelected(nextQuestion.selected);
      // Set local "answered" to true/false based on next question store "answered"
      if (nextQuestion.answered) {
        setAnswered(true);
        setHintStep(nextQuestion.questionContent.hints);
      } else {
        setAnswered(false);
        setHintStep(0);
      }
      // Set local "correct" to true or false based on whether next question store "selected" is equal to next question store "rightChoice"
      nextQuestion.selected === nextQuestion.questionContent.rightChoice
        ? setCorrect(true)
        : setCorrect(false);

      // Else local "answered" is false or there is a local "selected" value then apply this logic to current question:
    } else {
      // Set local "answered" to true and local 'hints' to current question store "hints" if there is a local "selected."
      if (selected) {
        setAnswered(true);
        setHintStep(currentQuestion.questionContent.hints);
      }
      // Set local "correct" to true if local "selected" is equal to current question store "rightChoice."
      if (selected === currentQuestion.questionContent.rightChoice) {
        setCorrect(true);
      }
    }
  };

  //* When user clicks BACK button...
  const handleBack = () => {
    // Decrease page number and scroll to top
    setPageNumber(pageNumber - 1);
    window.scrollTo(0, 0);
    // Set local "selected" to previous question store "selected."
    setSelected(previousQuestion.selected);
    // Set local "answered" to true/false based on previous question store "selected."
    if (!previousQuestion.selected) {
      setAnswered(false);
      setHintStep(0);
    } else {
      setAnswered(true);
      setHintStep(previousQuestion.questionContent.hints);
    }
    // Set local "correct" to true or false based on whether previous question store "selected" is equal to previous question store "rightChoice."
    previousQuestion.selected === previousQuestion.questionContent.rightChoice
      ? setCorrect(true)
      : setCorrect(false);
  };

  //* Scroll down to solution when user clicks SOLUTION button
  const handleScroll = () => {
    console.log('testing', questionSolution.current.offsetTop - 125);
    window.scrollTo({ top: questionSolution.current.offsetTop - 125, left: 0, behavior: 'smooth' });
  };

  const handleHints = () => {
    if (hintStep < currentQuestion.questionContent.hints) {
      setHintStep(hintStep + 1);
    }
    if (answered) {
      setHintStep(currentQuestion.questionContent.hints);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            EXTRA STUFF FOR DEBUGGING                       */
  /* -------------------------------------------------------------------------- */

  //* Resets "selected" and "answered" values for all questions in store
  const handleReset = () => {
    currentQuestions.map(question => {
      question.selected = '';
      question.answered = false;
      return question;
    });
  };

  //* Create local array of current assignment store "selected" values.
  const assignmentArray = currentQuestions.map(question => {
    return {
      selected: question.selected,
      answered: question.answered
    };
  });

  if (questionsHistory.length) {
    currentQuestions = questionsHistory.filter(
      questionHistory => questionHistory.questionContent.subject === currentSubject
    );

    currentQuestion = currentQuestions[pageNumber];
    nextQuestion = currentQuestions[pageNumber + 1];
    previousQuestion = currentQuestions[pageNumber - 1];
    hasQuestions = true;
  }

  //* Need to learn jest + enzyme
  // console.log('assignmentArray', assignmentArray);
  console.log('currentQuestion', currentQuestion);
  if (hasQuestions) {
    console.log('currentQuestions', currentQuestions);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 DOM Content                                */
  /* -------------------------------------------------------------------------- */

  let questionFeedContent;
  if (!hasQuestions || loading) {
    questionFeedContent = (
      <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
        <CircularProgress className={classes.progress} />
      </Grid>
    );
  } else {
    questionFeedContent = (
      <React.Fragment>
        {passage && (
          <DialogPassage
            open={passage}
            assignment={assignment}
            currentQuestion={currentQuestion}
            handleClose={() => {
              setPassage(false);
            }}
          />
        )}
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
                    <Grid item>
                      {(assignment === 1 || assignment === 2) && (
                        <ButtonCustom
                          size="small"
                          onClick={() => {
                            setPassage(true);
                          }}
                        >
                          Open Passage
                        </ButtonCustom>
                      )}
                    </Grid>
                    {assignment === 0 && (
                      <img
                        src={currentQuestion.questionContent.calculator ? calculator : noCalculator}
                        className={classes.calculator}
                        alt={
                          currentQuestion.questionContent.calculator ? 'calculator' : 'noCalculator'
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <CardCustom borderBottom padding>
                <Question
                  previousQuestion={previousQuestion ? previousQuestion.questionContent : ''}
                  questionRef={questionRef}
                  answered={answered}
                  rightChoice={currentQuestion.questionContent.rightChoice}
                  correct={correct}
                  selected={selected}
                  setSelected={setSelected}
                  currentQuestion={currentQuestion.questionContent}
                  pageNumber={pageNumber}
                />
              </CardCustom>
            </Grid>
          </Grid>
        </RootRef>

        <Grid item container justify="center" className={classes.bottomWrapper}>
          <Grid item xs={12} sm={10} md={9} className={classes.bottomContainer}>
            <Grid item container justify="space-between" alignItems="center">
              <ButtonCustom
                onClick={handleHints}
                className={classes.bottomOptionWrapper}
                backgroundColor="white"
              >
                <Grid item container alignItems="center" className={classes.hintContainer}>
                  <img src={lightBulb} className={classes.bottomIcon} alt="hint" />
                  <Typography variant="subtitle2" className={classes.bottomIconText}>
                    Hint
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.hintNumber}
                  >
                    {hintStep}/{currentQuestion.questionContent.hints}
                  </Typography>
                </Grid>
              </ButtonCustom>

              <Grid item xs={5} className={classes.solutionTitleWrapper}>
                {answered && (
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
              <ButtonCustom backgroundColor="white" className={classes.bottomOptionWrapper}>
                <TooltipCustom title="Sorry. Not available yet. Currently working on linking questions to their associated lessons.">
                  <Grid item container justify="center" alignItems="center">
                    <img src={lesson} className={classes.bottomIcon} alt="lesson" />
                    <Typography variant="subtitle2" className={classes.bottomIconText}>
                      Lesson
                    </Typography>
                  </Grid>
                </TooltipCustom>
              </ButtonCustom>
            </Grid>
            <RootRef rootRef={questionSolution}>
              <Grid item container className={classes.explanationWrapper}>
                <QuestionSolution
                  hintStep={hintStep}
                  pageNumber={pageNumber}
                  answered={answered}
                  solutions={currentQuestion.questionContent.solutions}
                  alternate={currentQuestion.questionContent.alternate}
                />
              </Grid>
            </RootRef>
          </Grid>
        </Grid>

        <ButtonCustom hasArrowRight onClick={handleReset}>
          Reset
        </ButtonCustom>
        {pageNumber}

        <ProgressMobileStepper
          updateStorePageNumbers={updateStorePageNumbers}
          pageNumbers={pageNumbers}
          setAnswered={setAnswered}
          setSelected={setCorrect}
          setCorrect={setCorrect}
          answered={answered}
          tasksHistory={tasksHistory}
          currentAssQuestions={currentQuestions}
          assignment={assignment}
          updateTasks={updateTasks}
          questionsHistory={questionsHistory}
          selected={selected}
          currentAssTasks={currentTasks}
          handleNext={handleNext}
          handleBack={handleBack}
          pageNumber={pageNumber}
        />
      </React.Fragment>
    );
  }

  return <React.Fragment>{questionFeedContent}</React.Fragment>;
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
  connect(mapStatetoProps, {
    updateTasks,
    updateStoreSelected,
    updateStoreAnswered,
    updateStorePageNumbers
  })(QuestionFeedPage)
);
