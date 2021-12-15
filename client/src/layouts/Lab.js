// Node Modules
import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

//Redux Actions
import { getProfile } from '../actions/profileActions';

// Local Components
import QuestionFeedPage from './QuestionFeedPage';
import SwitchCustom from '../components/SwitchCustom';
import ButtonCustom from '../components/Button/ButtonCustom';
import TextEditorLabContainer from '../components/Lab/TextEditorLabContainer';
import DialogCustom from '../components/DialogCustom';

import { Grid, TextField, MenuItem } from '@material-ui/core';

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {},
  rootDrawerOpened: {
    marginLeft: '500px'
  },
  textInputContainerTop: {
    minHeight: '450px'
  },
  textOutputContainerTop: {
    minHeight: '480px',
    background: 'none',
    boxShadow: 'none'
  },
  textOutputWrapper: {
    minWidth: 'none',
    marginTop: '30px',
    [theme.breakpoints.up('md')]: {
      minWidth: '500px',
      marginTop: '0px'
    }
  },
  outputContainer: {
    padding: '50px'
  },
  select: {
    width: '200px'
  }
});

const Lab = ({ classes, profile, getProfile }) => {
  const { hasProfile, questionsHistory, tasksHistory } = profile.currentProfile;

  // State
  const [questionNumber, setQuestionNumber] = useState('0');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [questionsSubject, setQuestionsSubject] = useState('Math');

  let currentQuestionsLength =
    questionsHistory.filter(
      questionHistory => questionHistory.questionContent.subject === questionsSubject
    ).length || questionsHistory.length;

  const tasks = tasksHistory.map(task => task.taskContent.title);

  console.log('tasks', tasks);

  // Question properties
  const [state, setState] = useState({
    task: '',
    type: '',
    rightChoice: '',
    difficulty: '',
    subject: '',
    multi: '',
    calculator: false,
    hints: 3,
    alternate: '',
    questionId: 0,
    questionNum: 0
  });

  const [task, setTask] = useState({
    taskContent: {
      title: ''
    }
  });

  const currentQuestionStored = useSelector(state => state.question.currentQuestion);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasProfile) {
      getProfile({ getAllQuestions: true });
    }
  }, []);

  // useEffect(() => {
  //   const currentQuestionTest = currentQuestionsTest[questionNumber];

  //   console.log('currentQuestionTest', currentQuestionTest);
  // }, [questionNumber]);

  // Refs
  useEffect(() => {
    if (currentQuestionStored && currentQuestionStored.questionContent) {
      const p = currentQuestionStored.questionContent;
      setState({
        type: p.type,
        task: p.task,
        rightChoice: p.rightChoice,
        difficulty: p.difficulty,
        subject: p.subject,
        multi: p.multi,
        calculator: p.calculator,
        hints: p.hints,
        alternate: p.alternate,
        questionId: p.questionId,
        questionNum: p.questionNum
      });
      if (tasksHistory.taskContent) {
        const currentTask = tasksHistory.filter(task => task.taskContent.title === p.type);
        setTask(currentTask);
      }
    }
  }, [currentQuestionStored]);

  console.log('task', task);

  console.log('questionNum state', state.questionNum);
  console.log('type of questionNum state', typeof state.questionNum);

  const handleCalculatorSwitch = checked => {
    setState({ ...state, calculator: checked });

    dispatch({
      type: 'SET_CURRENT_QUESTION',
      payload: {
        ...currentQuestionStored,
        questionContent: {
          ...currentQuestionStored.questionContent,
          calculator: checked
        }
      }
    });
  };

  const handleChange = name => e => {
    console.log('e.target.value', e.target.value);
    console.log('typeof e.target.value', typeof e.target.value);
    console.log('name', name);
    console.log("name === 'questionNum'", name === 'questionNum');
    setState({
      ...state,
      [name]: name === 'questionNum' ? parseInt(e.target.value) : e.target.value
    });
    dispatch({
      type: 'SET_CURRENT_QUESTION',
      payload: {
        ...currentQuestionStored,
        questionContent: {
          ...currentQuestionStored.questionContent,
          ...state,
          [name]: name === 'questionNum' ? parseInt(e.target.value) : e.target.value
        }
      }
    });
  };

  // Change question number
  const handlePageNumberChange = e => {
    setQuestionNumber(e.target.value);
  };

  const handleSaveQuestion = () => {
    axios
      .post('/api/questions/updateQuestionsAdmin', { updatedQuestion: currentQuestionStored })
      .then(res => {
        console.log('all Questions with updated One', res.data);
        setOpen(true);
        getProfile({ getAllQuestions: true });
      });
  };

  const handleNewQuestion = async () => {
    await axios.post('/api/questions/newQuestion', { currentSubject: questionsSubject });
    getProfile({ getAllQuestions: true });
    setQuestionNumber(currentQuestionsLength - 1);
  };

  const handleNewTask = async () => {
    const profileWithUpdatedTasks = await axios.post('/api/tasks/newTask', {
      newTaskTitle: task.taskContent.title
    });
    console.log('profileWithUpdatedTasks', profileWithUpdatedTasks);
  };

  const handleDeleteQuestion = async () => {
    console.log('currentQuestionStored', currentQuestionStored);
    await axios.post('/api/questions/deleteQuestion', {
      _id: currentQuestionStored.questionContent._id
    });
    getProfile({ getAllQuestions: true });
    setQuestionNumber(currentQuestionsLength - 3);
  };

  const toggleDrawer = open => {
    console.log('open', open);
    setDrawerOpen(!open);
  };

  const difficulties = ['easy', 'medium', 'hard'];
  const subjects = ['Math', 'Reading', 'Writing'];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <Grid item className={drawerOpen ? classes.rootDrawerOpened : classes.root}>
      <DialogCustom
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        Question Saved!
      </DialogCustom>
      <TextEditorLabContainer
        // handleCurrentQuestionLab={handleCurrentQuestionLab}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        currentQuestion={currentQuestionStored}
      />

      <Grid item>
        <TextField
          value={state.task}
          select
          onChange={handleChange('task')}
          variant='outlined'
          id='outlined-task'
          label='Task'
          name='task'
          className={classes.select}
        >
          {tasks.map((task, i) => (
            <MenuItem key={i} value={task}>
              {task}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
            value={task.title}
            onChange={handleChange('task')}
            variant="outlined"
            id="outlined-type"
            label="Type"
            name="questionType"
          /> */}
        <Grid item>
          <TextField
            value={questionsSubject}
            select
            onChange={e => {
              setQuestionsSubject(e.target.value);
            }}
            variant='outlined'
            id='outlined-questionsSubject'
            label='Subject of Questions'
            name='questionsSubject'
            className={classes.select}
          >
            {subjects.map(subject => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='outlined-number'
            label='Question Number'
            type='number'
            inputProps={{ min: '0', max: currentQuestionsLength - 1 }}
            value={questionNumber}
            onChange={handlePageNumberChange}
            variant='outlined'
          />
          <ButtonCustom onClick={handleSaveQuestion}>Save Question</ButtonCustom>
          <ButtonCustom onClick={handleNewQuestion}>New Question</ButtonCustom>
          <ButtonCustom onClick={handleDeleteQuestion}>Delete Question</ButtonCustom>
          <ButtonCustom onClick={handleNewTask}>New Task</ButtonCustom>
        </Grid>
        <Grid item>
          <TextField
            value={state.hints}
            inputProps={{ min: 0, max: 6 }}
            onChange={handleChange('hints')}
            variant='outlined'
            id='outlined-hints'
            type='number'
            label='Hints'
            name='hints'
          />
          <TextField
            value={state.difficulty}
            onChange={handleChange('difficulty')}
            variant='outlined'
            id='outlined-difficulty'
            select
            label='Difficulty'
            name='difficulty'
            className={classes.select}
          >
            {difficulties.map(difficulty => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={state.subject}
            select
            onChange={handleChange('subject')}
            variant='outlined'
            id='outlined-subject'
            label='Subject'
            name='subject'
            className={classes.select}
          >
            {subjects.map(subject => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={state.multi}
            onChange={handleChange('multi')}
            variant='outlined'
            id='outlined-multi'
            label='Multi'
            multiline
            rows={5}
            name='multi'
          />
          <TextField
            value={state.alternate}
            onChange={handleChange('alternate')}
            variant='outlined'
            id='outlined-alternate'
            label='Alternate'
            multiline
            rows={5}
            name='alternateSolution'
          />
          <TextField
            value={state.rightChoice}
            onChange={handleChange('rightChoice')}
            variant='outlined'
            select
            id='outlined-rightChoice'
            label='Right Choice'
            name='rightChoice'
            className={classes.select}
          >
            {letters.map(letter => (
              <MenuItem key={letter} value={letter}>
                {letter}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={state.type}
            onChange={handleChange('type')}
            variant='outlined'
            id='outlined-type'
            label='Type'
            name='questionType'
          />
          <TextField
            value={state.questionId}
            onChange={handleChange('questionId')}
            variant='outlined'
            id='outlined-questionId'
            type='number'
            label='QuestionId'
            name='questionId'
          />
          <TextField
            value={state.questionNum}
            onChange={handleChange('questionNum')}
            variant='outlined'
            id='outlined-questionNum'
            type='number'
            label='QuestionNum'
            name='questionNum'
          />
          <SwitchCustom
            label='Calculator'
            checked={state.calculator}
            setChecked={handleCalculatorSwitch}
          />
        </Grid>
        <QuestionFeedPage
          // handleCurrentQuestionLab={handleCurrentQuestionLab}
          lab={true}
          // handleUpdateQuestionFromLab={handleUpdateQuestionFromLab}
          drawerOpen={drawerOpen}
          setQuestionNumber={setQuestionNumber}
          questionNumberFromLab={questionNumber}
          currentQuestionStored={currentQuestionStored}
          questionsSubjectFromLab={questionsSubject}
        />
      </Grid>
    </Grid>
  );
};

Lab.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile
});

export default withStyles(styles)(
  connect(mapStatetoProps, {
    getProfile
  })(Lab)
);
