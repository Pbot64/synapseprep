// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI components

// Local Components
import CardCustom from '../../assets/jss/components/CardCustom';
import TextAreaInput from './TextAreaInput';
import TextFormattingToolbar from './TextFormattingToolbar';

//Constants

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

const initialText = `<T>Use algebra to translate and solve!</T><T>Any 3 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E>, and <E>{'x + 2'}</E>.</T>  
              
<T>In this case, we’re told the sum of the 3 integers is 30, so we can write,</T>  

<E block>{'x + (x + 1) + (x + 2) = 30'}</E>  

<T>Translated! Now let's solve it.</T> 

<T>First, combine like terms.</T>  

<E block>{'\\\\begin{aligned} \\\\blue x + (\\\\blue x \\\\green{+ 1}) + (\\\\blue x  \\\\green{+ 2}) & = 30 \\\\\\\\ \\\\blue{3x} \\\\green{+ 3} & = 30 \\\\end{aligned}'}</E>

<T>Then subtract 3 from each side.</T>   

<E block>{'\\\\hphantom{x + (x + 1) + (} \\\\begin{aligned} 3x + 3 \\\\red{ - 3} & = 30 \\\\red{ - 3} \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>   

<T>Finally, divide each side by 3.</T>   

<E block>{'\\\\begin{aligned} \\\\hphantom{.............................} \\\\dfrac{3x}{\\\\red 3} & = \\\\dfrac{27}{\\\\red 3} \\\\\\\\[10pt] x & = 9 \\\\end{aligned}'}</E>

<T>Thus, if <E>{'x'}</E> is 9, then the greatest integer, <E>{'x + 2'}</E>, is <E>{'\\\\boxed{11}'}</E></T>`;

const TextEditor = ({
  classes,
  currentQuestion,
  handleCurrentQuestionLab,
  text,
  solutions,
  setText
}) => {
  // State
  const [inputTextArea, setInputTextArea] = useState({});
  const [inputTextSelected, setInputTextSelected] = useState(false);

  // Refs
  const toolbarRef = useRef();
  const textInputRef = useRef();

  const handleClick = e => {
    // setToolbarRef(toolbarRef.current);
    // setTest();
    if (textInputRef.current && textInputRef.current.contains(e.target)) {
      setInputTextArea(e.target);
      setInputTextSelected(true);
    } else if (
      toolbarRef.current &&
      toolbarRef.current.contains(e.target) &&
      inputTextSelected === true
    ) {
      setInputTextSelected(true);
    } else {
      setInputTextSelected(false);
    }
  };

  // console.log('toolbarRef', toolbarRef);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  });

  // console.log('textInputRef', textInputRef);

  return (
    <>
      <div ref={toolbarRef}>
        <TextFormattingToolbar
          inputTextSelected={inputTextSelected}
          inputTextArea={inputTextArea}
          solutions={currentQuestion && currentQuestion.solutions}
        />
      </div>
      <CardCustom padding borderBottom className={classes.textInputContainerTop}>
        <TextAreaInput
          handleCurrentQuestionLab={handleCurrentQuestionLab}
          setText={setText}
          text={text}
          solutions={solutions}
          textInputRef={textInputRef}
          fullHeight
          currentQuestion={currentQuestion}
        />
      </CardCustom>

      {/* {text.length && createMarkup()} */}
    </>
  );
};

TextEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextEditor);
