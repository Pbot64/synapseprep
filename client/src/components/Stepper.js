// Node modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material components
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local components
import SnackBar from './SnackBar';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    background: 'white',
    borderTop: '1px solid lightgrey'
  },
  childRoot: {
    justifyContent: 'space-around'
  },
  progress: {
    backgroundColor: 'lightgrey',
    padding: '2px',
    margin: '0px 10px'
  },
  barColorMath: {
    ...theme.palette.blueToGreen
  },
  barColorReading: {
    ...theme.palette.pinkToYellow
  },
  barColorWriting: {
    ...theme.palette.pinkToPurple
  }
});

const ProgressMobileStepper = props => {
  // State Declarations
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // Destructure Props
  const {
    classes,
    theme,
    handleBack,
    handleNext,
    pageNumber,
    selected,
    currentAssTasks,
    currentAssQuestions,
    assignment,
    updateTasks,
    setAnswered,
    setCorrect,
    pageNumbers,
    updateStorePageNumbers,
    answered
  } = props;

  let onLastQuestion = pageNumber === currentAssQuestions.length - 1;

  const handleSubmit = async () => {
    const currentAssQuestion = currentAssQuestions[pageNumber];
    // if current question has a "selected" value then
    if (currentAssQuestion.selected) {
      setAnswered(true);
      currentAssQuestion.answered = true;
    }

    if (selected === currentAssQuestion.questionContent.rightChoice) {
      setCorrect(true);
    }
    const unansweredCurrentAssQuestions = currentAssQuestions.filter(
      currentAssQuestion => currentAssQuestion.answered === false
    );
    if (unansweredCurrentAssQuestions.length !== 0) {
      setSnackBarOpen(true);
    } else {
      // Set current tasks in store to answered
      currentAssTasks.map(task => (task.completed = true));

      // Find current subject
      const currentSubject = currentAssTasks[0].taskContent.subject;

      const currentAssQuestionsData = currentAssQuestions.map(currentQuestion => ({
        _id: currentQuestion.questionContent._id,
        answered: currentQuestion.answered,
        selected: currentQuestion.selected
      }));

      const updatedPageNumbers = pageNumbers.map((storedPageNumber, i) =>
        i === assignment ? 0 : storedPageNumber
      );

      updateStorePageNumbers(updatedPageNumbers);

      // Replace current tasks in store with a new set of tasks from DB
      await updateTasks({
        currentAssTasks,
        assignment,
        currentSubject,
        currentAssQuestionsData
      });
      props.history.push('./dashboard');
    }
  };

  const barColor =
    assignment === 0
      ? classes.barColorMath
      : assignment === 1
      ? classes.barColorReading
      : classes.barColorWriting;

  return (
    <React.Fragment>
      <MobileStepper
        variant="progress"
        steps={currentAssQuestions.length}
        position="bottom"
        activeStep={pageNumber}
        className={classes.root}
        LinearProgressProps={{
          classes: {
            barColorPrimary: barColor
          }
        }}
        classes={{
          root: classes.childRoot,
          progress: classes.progress,
          barColorPrimary: classes.barColorPrimary
        }}
        nextButton={
          <ButtonCustom
            color={selected ? 'green' : null}
            hasArrowRightWhite={!selected ? false : true}
            hasArrowRight={!onLastQuestion && !selected ? true : false}
            size="small"
            onClick={onLastQuestion && answered ? handleSubmit : handleNext}
            disabled={onLastQuestion && !selected}
          >
            {onLastQuestion && answered ? 'Submit' : !selected || answered ? 'Next' : 'Check'}
          </ButtonCustom>
        }
        backButton={
          <ButtonCustom hasArrowLeft size="small" onClick={handleBack} disabled={pageNumber === 0}>
            Back
          </ButtonCustom>
        }
      />
      <SnackBar snackBarOpen={snackBarOpen} setSnackBarOpen={setSnackBarOpen} />
    </React.Fragment>
  );
};

ProgressMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(ProgressMobileStepper));
