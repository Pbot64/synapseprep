// Node Modules
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import JsxParser from 'react-jsx-parser';

//Redux Actions
import { updateText } from '../actions/textEditorActions';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField, RootRef } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';

// Local Components
import E from '../components/Equation/@Equation';
import T from '../components/Text/@Text';
// import Editable from '../components/Editable';
import CardCustom from '../assets/jss/components/CardCustom';
// import AccordionCustom from '../components/AccordionCustom';
// import AccordionStep from '../components/AccordionStep';
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import DrawerCustom from '../components/DrawerCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
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
  commandsWrapper: {
    marginTop: '50px'
  },
  commandsTitle: {
    marginBottom: '50px'
  },
  equationContainer: {
    paddingTop: '25px',
    paddingBottom: '25px'
  },
  commandsTopText: {
    marginBottom: '50px'
  },
  outputContainer: {
    padding: '50px'
  },
  commandWrapper: {
    marginBottom: '50px'
  },
  textOutputContainer: {
    background: 'none',
    boxShadow: 'none',
    padding: '0px'
  },
  commandOutputTitle: {
    textDecoration: 'underline',
    marginBottom: '15px'
  },
  commandInputTitle: {
    textDecoration: 'underline',
    marginBottom: '15px'
  },
  darkenText: {
    color: '#343e4d'
  },
  updateContent: {
    whiteSpace: 'pre-line',
    marginLeft: '20px'
  },
  mainTitle: {
    margin: '60px 0px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px'
  },
  subTitle: {
    marginTop: '80px',
    marginBottom: '10px',
    fontSize: '1.875rem',
    backgroundColor: 'white',
    padding: '15px',
    display: 'inline-block',
    borderRadius: '10px'
  },
  smallTitle: {
    marginTop: '30px'
  },
  smallerTitle: {
    textDecoration: 'underline',
    marginTop: '10px'
  },
  guideWrapper: {
    marginBottom: '80px',
    whiteSpace: 'pre-wrap'
  },
  subSectionWrapper: {
    marginLeft: '40px'
  },
  breaking: {
    color: theme.palette.red,
    textDecoration: 'underline'
  },
  updateContainer: {
    marginBottom: '50px'
  },
  updateDate: {
    marginBottom: '20px'
  }
});

const textCommands = [
  { title: 'Regular', input: '<T>This is regular text.</T>', output: <T>This is regular text.</T> },
  {
    title: 'Small',
    input: '<T small>This is small text.</T>',
    output: <T small>This is small text.</T>
  },
  {
    title: 'Large',
    input: '<T large>This is large text.</T>',
    output: <T large>This is large text.</T>
  },
  {
    title: 'Bold',
    input: '<T bold>This is bold text.</T>',
    output: <T bold>This is bold text.</T>
  },
  {
    title: 'Italic',
    input: '<T italic>This is italic text.</T>',
    output: <T italic>This is italic text.</T>
  },
  {
    title: 'Underline',
    input: '<T underline>This is underlined text.</T>',
    output: <T underline>This is underlined text.</T>
  },
  {
    title: 'Center',
    input: '<T center>This is centered text.</T>',
    output: <T center>This is centered text.</T>
  },
  {
    title: 'Indent',
    input: `<T indent>This is indented text.</T>`,
    output: <T indent>This is indented text.</T>
  },
  {
    title: 'Half',
    input:
      '<T half>This is grouped text.</T><T>Its bottom margin is half that of regular text.</T>',
    output: (
      <T>
        <T half>This is grouped text</T>
        <T>Its bottom margin is half that of regular text.</T>
      </T>
    )
  },
  {
    title: 'Making a List',
    input: `<T half>A list made with halfs and indents:</T>

    <T half indent>1) This is item 1.</T> 
    <T half indent>2) This is item 2.</T> 
    <T indent>3) This is item 3.</T>`,
    output: (
      <React.Fragment>
        <T half>A list made with halfs and indents:</T>
        <T half indent>
          1) This is item 1.
        </T>
        <T half indent>
          2) This is item 2.
        </T>
        <T indent>3) This is item 3.</T>
      </React.Fragment>
    )
  },
  {
    title: 'Inline',
    input: '<T>This is block text here, but <T inline>this text is inline.</T></T>',
    output: (
      <T>
        This is block text here, but <T inline>this text is inline.</T>
      </T>
    )
  },
  {
    title: 'Block',
    input:
      "<T bold block>Bold, Italic, and Underline, are inline by default.</T><T>You'll likely need to add this 'block' property if you want to apply any of these to an entire sentence.'</T>",
    output: (
      <React.Fragment>
        <T bold block>
          Bold, Italic, and Underline, are inline by default.
        </T>
        <T>
          You'll likely need to add this 'block' property if you want to apply any of these to an
          entire sentence.'
        </T>
      </React.Fragment>
    )
  },
  {
    title: 'Quote',
    input:
      '<T quote>This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted text.</T>',
    output: (
      <T quote>
        This is quoted text. This is quoted text. This is quoted text. This is quoted text. This is
        quoted text. This is quoted text. This is quoted text. This is quoted text. This is quoted
        text.
      </T>
    )
  },
  {
    title: 'Define',
    input:
      '<T>This is a sentence with a <T define ="word-to-define">This is the definition of the word.</T> that needs defining.</T>',
    output: (
      <T>
        This is a sentence with a <T define="word-to-define">This is the definition of the word.</T>{' '}
        that needs defining.
      </T>
    )
  },
  // {
  //   title: 'Rule',
  //   input:
  //     `<T rule title="Positive/Negative Rules"><E block>{'(\\red -)(\\red -) = \\green + \\\\ (\\red -)(\\green +) = \\red - \\\\ (\\green +)(\\green +) = \\green +'}</E>` +
  //     ` In other words, <T bold> only an odd number of negatives is negative.</T></T>`,
  //   output: (
  //     <T rule title="Positive/Negative Rules">
  //       <E block>
  //         {
  //           '(\\red -)(\\red -) = \\green + \\\\ (\\red -)(\\green +) = \\red - \\\\ (\\green +)(\\green +) = \\green +'
  //         }
  //       </E>{' '}
  //       In other words, <T bold>only an odd number of negatives is negative.</T>
  //     </T>
  //   )
  // },
  {
    title: 'Trap',
    input:
      '<T curriculum trap title="This is a title">This is a trap alert curriculum section.</T>',
    output: (
      <T curriculum trap title="This is a title">
        This is a trap alert curriculum section.
      </T>
    )
  },
  {
    title: 'Ivy',
    input:
      '<T curriculum ivy title="This is a title">This is a tip for very competitive students.</T>',
    output: (
      <T curriculum ivy title="This is a title">
        This is a tip for very competitive students.
      </T>
    )
  },
  {
    title: 'Strat',
    input: '<T curriculum strat title="This is a title">This is an overall SAT strategy.</T>',
    output: (
      <T curriculum strat title="This is a title">
        This is an overall SAT strategy.
      </T>
    )
  },
  {
    title: 'Skill Builder',
    input: '<T curriculum build title="This is a title">This is an overall SAT strategy.</T>',
    output: (
      <T curriculum build title="This is a title">
        This is foundational skill/knowledge builder curriculum section.
      </T>
    )
  },
  {
    title: 'Curriculum Expand',
    input:
      '<T curriculum ivy expand title="This is a title">This is an ivy league curriculum section with more than a couple lines a text. You should add the expand prop to make the information more digestible.</T>',
    output: (
      <T curriculum ivy expand title="This is a title">
        This is an ivy league curriculum section with a lot of text. More lines of text here. More
        lines of text here. You should add the expand prop to make this information more digestible.
        More lines of text here. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT.
        MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE
        TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE
        TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE
        TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE
        TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT. MORE TEXT.
      </T>
    )
  }
];

// const equationCommands = [
//   {
//     title: 'Block',
//     input: `<E block>{'x + (x + 1) + (x + 2) = 30'}</E>`,
//     output: <E block>{'x + (x + 1) + (x + 2) = 30'}</E>
//   },
//   {
//     title: 'Inline',
//     input: `<T>Any 2 consecutive integers can be expressed as <E>{'x'}</E> and <E>{'x + 1'}</E></E>.</T>`,
//     output: (
//       <T>
//         Any 2 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E> .
//       </T>
//     )
//   },
//   {
//     title: 'Color',
//     input: `Example of Color: <E block>{'\\\\red{x + (x + 1)} + (x + 2) = \\\\blue 30'}</E>`,
//     output: <E block>{'\\red{x + (x + 1)} + (x + 2) = \\blue 30'}</E>
//   },
//   {
//     title: 'Boxed',
//     input: `<T>We can finally see that <E>{'\\boxed{71 }'}</E> is the only positive number in the set.</T>`,
//     output: (
//       <T>
//         We can finally see that <E>{'\\boxed{71 }'}</E> is the only positive number in the set.
//       </T>
//     )
//   },
//   {
//     title: 'Aligned Environment (auto align equal signs)',
//     input: `<E block>{'\\\\begin{aligned} 3x + 3  - 3} & = 30 - 3 \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>`,
//     output: <E block>{'\\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\ 3x & = 27 \\end{aligned}'}</E>
//   },
//   {
//     title: 'Hphantom (manually align equal signs)',
//     input: `<E block>{'\\\\hphantom{.............................} \\\\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>`,
//     output: (
//       <E block>
//         {
//           '\\hphantom{.............................} \\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\ 3x & = 27 \\end{aligned}'
//         }
//       </E>
//     )
//   }
// ];

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

const Testing = props => {
  // State
  const [inputTextArea, setInputTextArea] = useState({});
  const [inputTextSelected, setInputTextSelected] = useState(false);
  const [textFormat, setTextFormat] = useState(true);
  const [text, setText] = useState('');

  // Refs
  const textInputRef = useRef();
  const buttonContainerRef = useRef();

  // const testing2 = useSelector(state => state);

  // let myElement = document.getElementsByClassName('jsx-parser');
  // if (myElement[0]) {
  //   console.log('myElement', myElement[0].innerText);
  // }

  // console.log('testing2', testing2);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('dispatch', dispatch(updateText(text)));
  // }, [text]);

  useEffect(() => {
    setInputTextArea(document.getElementById('outlined-multiline-static-input'));
  }, []);

  const handleTextFormat = () => {
    setTextFormat(!textFormat);
  };

  const handleClick = e => {
    console.log('textInputRef', textInputRef);

    if (
      (textInputRef.current && textInputRef.current.contains(e.target)) ||
      (buttonContainerRef.current.contains(e.target) && inputTextSelected === true)
    ) {
      setInputTextSelected(true);
    } else {
      setInputTextSelected(false);
    }
  };

  console.log('inputTextSelected', inputTextSelected);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const findSelectionRange = (openingTag, closingTag) => {
    if (inputTextSelected) {
      var tagLength = openingTag.length + closingTag.length;
      var start = inputTextArea.selectionStart;
      var end = inputTextArea.selectionEnd;
      var sel = inputTextArea.value.substring(start, end);
      var finText =
        inputTextArea.value.substring(0, start) +
        openingTag +
        sel +
        closingTag +
        inputTextArea.value.substring(end);
      console.log('finText', finText);

      document.execCommand('insertText', false /*no UI*/, openingTag + sel + closingTag);
      setText(finText);

      inputTextArea.selectionEnd = end + tagLength;
    }
  };

  const addText = () => {
    findSelectionRange('<T>', '</T>');
  };

  const addEquation = () => {
    findSelectionRange("<E>{'", "'}</E>");
  };

  const bold = () => {
    findSelectionRange('<T bold>', '</T>');
  };

  const handleChange = e => {
    console.log('e.target.value', e.target.value);
    setText(e.target.value);
  };

  const { classes } = props;
  return (
    <React.Fragment>
      <Grid item container spacing={16}>
        {/* <ButtonCustom onClick={handleTextFormat}>
          {textFormat ? 'Compiled Output Text' : 'Raw Input Text'}
        </ButtonCustom> */}
        <ButtonCustom onClick={addEquation}>Equation</ButtonCustom>
        <ButtonCustom onClick={addText}>Text</ButtonCustom>
        <IconButton className={classes.button} aria-label="Bold" onClick={bold}>
          <FormatBoldIcon fontSize="small" />
        </IconButton>
      </Grid>

      <Grid container justify="space-between" spacing={32}>
        {/* <DrawerCustom> */}
        <Grid item xs={12} sm={12} md={6}>
          <CardCustom
            padding
            title="Raw Input Text"
            borderBottom
            className={classes.textInputContainerTop}
          >
            <RootRef rootRef={textInputRef}>
              <TextField
                id="outlined-multiline-static-input"
                label="Input Here"
                multiline
                rows="20"
                margin="normal"
                fullWidth
                defaultValue={text}
                variant="outlined"
                onChange={handleChange}
              />
            </RootRef>
          </CardCustom>
        </Grid>
        {/* </DrawerCustom> */}
        {/* <Editable
          editable={!textFormat}
          text={textOutput}
          placeholder="Write a task name"
          type="textarea"
        >
          <TextField
            id="outlined-multiline-static-input"
            label="Input Here"
            multiline
            margin="normal"
            fullWidth
            value={textOutput}
            variant="outlined"
            onChange={handleChange}
          />
        </Editable> */}
        <Grid item xs={12} sm={12} md={6} className={classes.textOutputWrapper}>
          <CardCustom
            padding
            title="Compiled Output Text"
            borderBottom
            className={classes.textOutputContainerTop}
          >
            <Typography key={text} variant="body2" component="div">
              <JsxParser
                disableFragments={true}
                components={{ Grid, Typography, E, T }}
                jsx={text}
              />
            </Typography>
          </CardCustom>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h3" align="center" className={classes.mainTitle}>
          Updates
        </Typography>
        <Grid item className={classes.updateContainer}>
          <Typography variant="h4" className={classes.updateDate}>
            <u>2/01/19</u>
          </Typography>
          <Grid item className={classes.updateContent}>
            <Typography variant="body2" paragraph>
              {`1) New SKILL BUILDER Curriculum Section Added (purple one). Put important foundational knowledge in here that doesn't fit in either rules or define. Ex. Formulas vs. Equations, The Elimination Method Exposed!, etc. 
          2) A new 'multi' field has been added to questions. If several questions use the same info (like a chart, or formula), then put this info inside the "multi" cell for each question (Questions 12 and 13 in the Math part serve as examples).  
          `}
            </Typography>
            <Typography variant="body2" className={classes.breaking}>
              Breaking Changes!
            </Typography>
            <Typography variant="body2" paragraph color="error">
              {`1) You must now add a curriculem prop to any curriculum section (trap, ivy, etc.) Sorry, but the if statements on the backend we're getting ridiculous (if ivy || trap || ...)
          2) "Define" syntax has been reversed to allow you to access all text properties inside a defintion.
          `}
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.updateContainer}>
          <Typography variant="h4" className={classes.updateDate}>
            <u>12/21/19</u>
          </Typography>
          <Grid item className={classes.updateContent}>
            <Typography variant="body2" paragraph>
              {`1) You can underline, indent, and quote text. 
          2) You can change text size to small and large (should not use this too much).
          4) You can now set titles for curriculum boxes (ivy, trap, etc.) as well.
          5) You can now use "define" syntax to define important words for students.
          `}
            </Typography>
            <Typography variant="body2" paragraph className={classes.commandsInfo}>
              {`Note. Also, don't forget to box the correct answer and use bold anytime you mention an answer choice (<T bold>Choice A</T>).`}
            </Typography>
            <Typography variant="body2" className={classes.breaking}>
              Breaking Changes!
            </Typography>
            <Typography variant="body2" paragraph color="error">
              {`1)The way to set a rule title has been changed from <T rule='This is a title'></T> to <T rule title='This is a title'></T>`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.guideWrapper}>
        <Typography variant="h3" align="center" className={classes.mainTitle}>
          Question Writing Guide
        </Typography>
        <Typography variant="h4" className={classes.subTitle}>
          General
        </Typography>
        <Typography>
          {`Use the question above and the first 10 math questions in the app as a reference for formatting. Make sure to enter the # of hints and question difficulty (easy, medium, or hard) and whether the student can use a calculator.  Don't worry about the selected, completed, or subject columns. You can include extra info in the second column for your purpose.`}
        </Typography>
        <Grid item className={classes.subSectionWrapper}>
          <Typography variant="h5" className={classes.smallTitle}>
            Text
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo} paragraph>
            {`All non-equation text must be wrapped in <T></T> (expect for answer choices or if it doesn't need any formatting (even a bottom margin).`}
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo}>
            {`Wrap with a new <T></T> whenever you need a new paragraph. We don't want large paragraphs, so you should break up text frequently with it. Typically, you should break up a text that is longer than 3 lines`}
          </Typography>
          <Typography variant="h5" className={classes.smallTitle}>
            Equation
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo} paragraph>
            We're using Katex (slightly modified Latex) to make equations.
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo} paragraph>
            Here is a list of most of the supported Katex functions (remember to add double the
            number of escape characters '\\', as javascipt will remove half). <br />
            https://katex.org/docs/supported.html
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo}>
            Here's the Katex Github page (not sure if you'll need this, but I'll include it anyway
            as it contains some interesting infomation) . <br />
            https://github.com/MatejBransky/react-katex
          </Typography>
          <Typography variant="body2" className={classes.smallerTitle}>
            Aligning Equal Signs
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo} paragraph>
            This is by far the most annoying formatting issue. I tried finding other solutions, but
            sadly nothing else worked. You have to put the equations in an aligned environment (make
            sure to put '&' before any equal signs) and then use \\hphantom to add invisible space
            to the beginning of the smaller equation/s like this (example in latex not katex):{' '}
          </Typography>
        </Grid>
        <Typography variant="h4" className={classes.subTitle}>
          Main Solution Main Steps
        </Typography>
        <Typography>
          {`Every practice question should be structured into 3 main steps:
1) Identify Question Type
2) Predict Answer  
3) Compare Prediction`}
        </Typography>
        <Typography variant="h4" className={classes.subTitle}>
          Main Solution Sub-Steps
        </Typography>
        <Typography>
          {`You'll notice in the excel doc that the each question's solution is broken up into multiple cells. Each cell corresponds to a solution main step/sub-step on the app in the following way: 

Solution/0/0 corresponds to the first part/hint of "Identify Question Type"
Solution/0/1 corresponds to the second part/hint of "Identify Question Type"  Solution1/0 corresponds to the first part/hint of "Predict Answer"
Solution1/1 corresponds to the second part/hint of "Predict Answer"
....
Solution 2/0 corresponds to the first part/hint of "Compare Prediction"`}
        </Typography>
        <Typography variant="h4" className={classes.subTitle}>
          Alternate Solution
        </Typography>
        <Typography>
          {`Make sure to include an alternate solution for some math questions if you feel students will benefit from it. You don't need to divide up the alternate solution into main steps or sub-steps as it will completely replace the text in the "Predict Answer" step.`}
        </Typography>
        <Typography variant="h4" className={classes.subTitle}>
          Things to Keep in Mind
        </Typography>
        <Typography>
          {`1) Don't wrap answer choices in <T></T>
2) Don't get the impression that every solution needs to have comedy in it. Being straightforward and clear is far more important. 
3) Don't include subtitles/step titles like "Identify Question Type" as these will be automatically added once each solution has been broken down into its steps. 
4) Typically, students shouldn't review answer choices before they have attempted to solve the question themselves. 
5) Make sure not to use "smart quotes" in any E or T tag. 
6) Make sure explanations are not too wordy. 
7) Dont use //textcolor{blue}{1} , use //blue 1 or //blue{1 + 10} 
8) Add the question Id (this is equal to its task Id. All task Ids are listed in "tasks official excel file") Make sure to keep the questions organized by their question Id as well.
9) Avoid inconstancies, such as, the word "passengers" being used in the question, but suing word "people" in the solution, or using the word "info" in one sentence and then "information" in the next. 
10) Make sure lists have half spacing and use "1)" instead of "1."`}
        </Typography>
        <Typography variant="h5" className={classes.smallTitle}>
          Math Only
        </Typography>
        <Typography>
          {`1) You don't need to show why each answer choice is wrong. 
2) Use parentheses notation for multiplication and horizontal bar for division. 
3) Put a box around the correct answer in the "Predict Answer" step.
4) Make sure to put the correct answer choice again in the "Compare Prediction" step like so, "<T inline bold>Choice ?</T> is correct.".
5) Put recurring math rules (like PEMDAS) in <T rules></T> 
6) Operations should show how the equation starts, and what the equation looks like after the operation.`}
        </Typography>
      </Grid>
      <Grid xs={12} className={classes.commandsWrapper}>
        <Typography variant="h3" align="center" className={classes.mainTitle}>
          Text Commands
        </Typography>
        <Typography variant="h5" component="div" paragraph>
          {<u>All Commands</u>}
        </Typography>
        {textCommands.map(textCommand => (
          <Grid container justify="space-between" className={classes.commandWrapper}>
            <Grid item xs={12} sm={12} md={5}>
              <CardCustom padding borderBottom className={classes.textInputContainer}>
                <Typography variant="body2" align="center" className={classes.commandInputTitle}>
                  {textCommand.title}
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Input Here"
                  multiline
                  rows="5"
                  InputProps={{ classes: { input: classes.darkenText } }}
                  disabled
                  margin="normal"
                  defaultValue={textCommand.input}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </CardCustom>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.textOutputWrapper}>
              <Typography
                variant="body2"
                component="div"
                align="center"
                className={classes.commandOutputTitle}
              >
                Compiled Output Text
              </Typography>
              <Typography key={text} variant="body2" component="div">
                {textCommand.output}
              </Typography>
            </Grid>
          </Grid>
        ))}
        <Grid className={classes.commandsTopText}>
          <Typography variant="h3" align="center" className={classes.mainTitle}>
            Equation Commands
          </Typography>
        </Grid>
        <Typography variant="h5" component="div" paragraph>
          {<u>Some Commands</u>}
        </Typography>
        {/* {equationCommands.map(equationCommand => (
          <Grid container justify="space-between" className={classes.commandWrapper}>
            <Grid item xs={12} sm={12} md={5}>
              <CardCustom padding borderBottom className={classes.textInputContainer}>
                <Typography variant="body2" align="center" className={classes.commandInputTitle}>
                  {equationCommand.title}
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  label="Input Here"
                  multiline
                  rows="5"
                  InputProps={{ classes: { input: classes.darkenText } }}
                  margin="normal"
                  defaultValue={equationCommand.input}
                  fullWidth
                  disabled="true"
                  variant="outlined"
                />
              </CardCustom>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.textOutputWrapper}>
              <Typography
                variant="body2"
                component="div"
                align="center"
                className={classes.commandOutputTitle}
              >
                Compiled Output Equation
              </Typography>
              <Typography key={textOutput} variant="body2" component="div">
                {equationCommand.output}
              </Typography>
            </Grid>
          </Grid>
        ))} */}
      </Grid>
    </React.Fragment>
  );
};

Testing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Testing);
