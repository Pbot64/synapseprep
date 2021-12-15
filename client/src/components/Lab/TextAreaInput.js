// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import JsxParser from 'react-jsx-parser';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, RootRef, Tooltip, Divider, Grid } from '@material-ui/core';

// Local Components

// Local Assets

//  Style Overrides
const styles = theme => ({
  textInputContainerTop: {
    flexGrow: '1'
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
  purple: {
    color: theme.palette.purple
  },
  equationFormatsContainer: {
    padding: '10px'
  },
  textFormatsContainer: {
    padding: '10px'
  },
  speedDialFormatsContainer: {
    padding: '10px'
  },
  formControlRoot: {
    height: '100%'
  },
  formInputRoot: {
    height: '100%'
  },
  inputRoot: {
    height: '100%'
  }
});

const TextAreaInput = ({ classes, text, setText, textInputRef, solutions, fullHeight }) => {
  
  // State
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    console.log('e.target.value', e.target.value);
    // console.log('solutionsTESTING', solutions);
    const updatedInputText = e.target.value || '';

    if (solutions) {
      // console.log('updatedInputText Inside HandleChange', updatedInputText);

      let splitOuterArrays = updatedInputText.split('@');
      // console.log('splitOuterArrays', splitOuterArrays);
      let splitInnerArrays = splitOuterArrays.map(s => s.split(';'));

      // console.log('splitInnerArrays', splitInnerArrays);
      // const solutions = splitOuterArrays.length > 1 ? splitInnerArrays : e.target.value;

      setText(splitInnerArrays);
      // handleSolutions(splitInnerArrays);
    } else {
      setText(e.target.value);
    }

    // setText(e.target.value);
    // console.log('setInputText Inside HandleChange');

    setInputText(e.target.value);

    // dispatch({
    //   type: 'SET_CURRENT_QUESTION',
    //   payload: {
    //     ...currentQuestion,
    //     questionContent: { ...currentQuestion.questionContent, solutions: e.target.value }
    //   }
    // });
    // currentQuestion.solutions = splitOuterArrays;
    // questionProperty =
    // setTitleInput(e.target.value);
    // setInputText(e.target.value);
  };

  // useEffect(() => {
  //   if (lab && titleInput) {
  //     // console.log('titleInput', titleInput);
  //     // console.log('setCurrentQuestion', setCurrentQuestion);

  //     currentQuestionFull &&
  //       setCurrentQuestion({
  //         ...currentQuestionFull,
  //         questionContent: {
  //           ...currentQuestionFull.questionContent,
  //           soluions: splitOuterArrays
  //         }
  //       });
  //   }
  // });

  // useEffect(() => {
  //   if (lab && titleInput) {
  //     // console.log('titleInput', titleInput);
  //     // console.log('setCurrentQuestion', setCurrentQuestion);

  //     currentQuestionFull &&
  //       setCurrentQuestion({
  //         ...currentQuestionFull,
  //         questionContent: {
  //           ...currentQuestionFull.questionContent,
  //           title: titleInput
  //         }
  //       });

  // console.log('inputText outside', inputText);

  useEffect(() => {
    // console.log('text to Format Inside Effect', text);
    if (Array.isArray(text)) {
      // console.log('isArray');
      const ArraysToCombine = text;
      const combinedOuterArrays = ArraysToCombine.map(s => s.join(';'));
      const combinedInnerArrays = combinedOuterArrays.join('@');
      // setText(combinedInnerArrays);
      // console.log('setInputText Inside Text EFFECt');
      setInputText(combinedInnerArrays);
    } else {
      // console.log('isText');
      // setText(text);
      setInputText(text);
    }
  }, [text]);

  return (
    <RootRef rootRef={textInputRef}>
      <TextField
        id='outlined-multiline-static-input'
        label='Input Here'
        multiline
        rows={5}
        margin='normal'
        classes={fullHeight && { root: classes.formControlRoot }}
        InputProps={
          fullHeight && {
            classes: { root: classes.formInputRoot }
          }
        }
        fullWidth
        value={inputText}
        variant='outlined'
        onChange={handleChange}
      />
    </RootRef>
  );
};

TextAreaInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextAreaInput);
