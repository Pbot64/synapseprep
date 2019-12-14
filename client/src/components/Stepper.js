// Node Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material UI Components
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local Components
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
    currentQuestions,
    selected,
    assignment,
    completed
  } = props;

  const handleSubmit = async () => {
    const { tasks, questions, assignment, setTasks, setCompleted, setCorrect } = props;

    const currentQuestion = currentQuestions[pageNumber];
    // if current question has a "selected" value then
    if (currentQuestion.selected !== 'null') {
      setCompleted(true);
      currentQuestion.completed = true;
    }

    if (selected === currentQuestion.rightChoice) {
      setCorrect(true);
    }
    const uncompletedCurrentQuestions = currentQuestions.filter(
      currentQuestion => currentQuestion.completed === false
    );
    if (uncompletedCurrentQuestions.length !== 0) {
      setSnackBarOpen(true);
    } else {
      // Set current tasks in store to completed
      tasks[assignment].map(task => (task.completed = true));

      // Replace current tasks in store with a new set of tasks from DB
      await setTasks({ currentTasks: tasks, assignment, questions });
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
        steps={currentQuestions.length}
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
            color={selected !== 'null' ? 'green' : null}
            hasArrowRightWhite={selected === 'null' ? false : true}
            hasArrowRight={selected === 'null' ? true : false}
            size="small"
            onClick={
              pageNumber === currentQuestions.length - 1 && completed ? handleSubmit : handleNext
            }
            disabled={selected === 15}
          >
            {pageNumber === currentQuestions.length - 1 && completed
              ? 'Submit'
              : selected === 'null' || completed
              ? 'Next'
              : 'Check'}
          </ButtonCustom>
        }
        backButton={
          <ButtonCustom size="small" onClick={handleBack} disabled={pageNumber === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
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
