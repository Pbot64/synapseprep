// Node Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import JsxParser from 'react-jsx-parser';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

// Local Components
import E from '../components/Equation';
import T from '../components/Text';
import CardCustom from '../assets/jss/components/CardCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
  textInputContainer: {
    minHeight: '450px'
  },
  textOutputContainer: {
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
  }
});

const textCommands = [
  { input: '<T></T>', output: <T>This is regular text</T> },
  { input: '<T bold></T>', output: <T bold>This is bold text</T> },
  { input: '<T italic></T>', output: <T italic>This is italic text</T> },
  {
    input: '<T>This<T inline> is inline</T> text</T>',
    output: (
      <T>
        This<T inline> is inline</T> text
      </T>
    )
  },
  {
    input: '<T half></T>',
    output: (
      <T>
        <T half>This is grouped text</T>
        <T half>This is grouped text</T>
      </T>
    )
  },
  {
    input: '<T rule></T>',
    output: (
      <T rule="Positive/Negative Rules">
        <E block>
          {
            '(\\red -)(\\red -) = \\green + \\\\ (\\red -)(\\green +) = \\red - \\\\ (\\green +)(\\green +) = \\green +'
          }
        </E>{' '}
        In other words,{' '}
        <T inline bold>
          only an odd number of negatives is negative.
        </T>
      </T>
    )
  },
  { input: '<T trap></T>', output: <T trap>This is a trap alert text section.</T> },
  { input: '<T ivy></T>', output: <T ivy>This is a tip for very competitive students.</T> },
  { input: '<T strat></T>', output: <T strat>This is an overall SAT strategy.</T> }
];

const equationCommands = [
  {
    input: `Example of Block: <E block>{'x + (x + 1) + (x + 2) = 30'}</E>`,
    output: <E block>{'x + (x + 1) + (x + 2) = 30'}</E>
  },
  {
    input: `Example of Inline: <T>Any 2 consecutive integers can be expressed as <E>{'x'}</E> and <E>{'x + 1'}</E></E>.</T>`,
    output: (
      <T>
        Any 2 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E> .
      </T>
    )
  },
  {
    input: `Example of Color: <E block>{'\\\\red{x + (x + 1)} + (x + 2) = \\\\blue 30'}</E>`,
    output: <E block>{'\\red{x + (x + 1)} + (x + 2) = \\blue 30'}</E>
  },
  {
    input: `Example of Aligned: <E block>{'\\\\begin{aligned} 3x + 3  - 3} & = 30 - 3 \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>`,
    output: <E block>{'\\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\ 3x & = 27 \\end{aligned}'}</E>
  },
  {
    input: `Example of Aligned with hphantom: <E block>{'\\\\hphantom{x + (x + 1) + (} \\\\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>`,
    output: (
      <E block>
        {
          '\\hphantom{x + (x + 1) + (} \\begin{aligned} 3x + 3 - 3 & = 30 - 3 \\\\ 3x & = 27 \\end{aligned}'
        }
      </E>
    )
  }
];

const Testing = props => {
  const [
    textOutput,
    setTextOutput
  ] = useState(`<T>Use algebra to translate and solve!</T><T>Any 3 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E>, and <E>{'x + 2'}</E>.</T>  
              
  <T>In this case, we’re told the sum of the 3 integers is 30, so we can write,</T>  
  
  <E block>{'x + (x + 1) + (x + 2) = 30'}</E>  
  
  <T>Translated! Now let's solve it.</T> 
  
  <T>First, combine like terms.</T>  
  
  <E block>{'\\\\begin{aligned} \\\\blue x + (\\\\blue x \\\\green{+ 1}) + (\\\\blue x  \\\\green{+ 2}) & = 30 \\\\\\\\ \\\\blue{3x} \\\\green{+ 3} & = 30 \\\\end{aligned}'}</E>
  
  <T>Then subtract 3 from each side.</T>   
  
  <E block>{'\\\\hphantom{x + (x + 1) + (} \\\\begin{aligned} 3x + 3 \\\\red{ - 3} & = 30 \\\\red{ - 3} \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>   
  
  <T>Finally, divide each side by 3.</T>   
  
  <E block>{'\\\\begin{aligned} \\\\hphantom{x + (x + 1) + (x + 3} \\\\dfrac{3x}{\\\\red 3} & = \\\\dfrac{27}{\\\\red 3} \\\\\\\\[10pt] x & = 9 \\\\end{aligned}'}</E>
  
  <T>Thus, if <E>{'x'}</E> is 9, then the greatest integer, <E>{'x + 2'}</E>, is <E>{'\\\\boxed{11}'}</E></T>`);

  const handleChange = e => {
    setTextOutput(e.target.value);
  };

  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container className={classes.root} justify="space-between">
        <Grid item xs={12} sm={12} md={5}>
          <CardCustom
            padding
            title="Raw Input Text"
            borderBottom
            className={classes.textInputContainer}
          >
            <TextField
              id="outlined-multiline-static"
              label="Input Here"
              multiline
              rows="20"
              margin="normal"
              defaultValue={`<T>Use algebra to translate and solve!</T><T>Any 3 consecutive integers can be expressed as <E>{'x'}</E>, <E>{'x + 1'}</E>, and <E>{'x + 2'}</E>.</T>  
              
              <T>In this case, we’re told the sum of the 3 integers is 30, so we can write,</T>  
              
              <E block>{'x + (x + 1) + (x + 2) = 30'}</E>  
              
              <T>Translated! Now let's solve it.</T> 
              
              <T>First, combine like terms.</T>  
              
              <E block>{'\\\\begin{aligned} \\\\blue x + (\\\\blue x \\\\green{+ 1}) + (\\\\blue x  \\\\green{+ 2}) & = 30 \\\\\\\\ \\\\blue{3x} \\\\green{+ 3} & = 30 \\\\end{aligned}'}</E>
              
              <T>Then subtract 3 from each side.</T>   
              
              <E block>{'\\\\hphantom{x + (x + 1) + (} \\\\begin{aligned} 3x + 3 \\\\red{ - 3} & = 30 \\\\red{ - 3} \\\\\\\\ 3x & = 27 \\\\end{aligned}'}</E>   
              
              <T>Finally, divide each side by 3.</T>   
              
              <E block>{'\\\\begin{aligned} \\\\hphantom{x + (x + 1) + (x + 3} \\\\dfrac{3x}{\\\\red 3} & = \\\\dfrac{27}{\\\\red 3} \\\\\\\\[10pt] x & = 9 \\\\end{aligned}'}</E>
              
              <T>Thus, if <E>{'x'}</E> is 9, then the greatest integer, <E>{'x + 2'}</E>, is <E>{'\\\\boxed{11}'}</E></T>`}
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </CardCustom>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.textOutputWrapper}>
          <CardCustom
            padding
            title="Compiled Output Text"
            borderBottom
            className={classes.textOutputContainer}
          >
            <Typography key={textOutput} variant="body2" component="div">
              <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={textOutput} />
            </Typography>
          </CardCustom>
        </Grid>
      </Grid>
      <Grid xs={12} className={classes.commandsWrapper}>
        <Grid className={classes.commandsTopText}>
          <Typography variant="h4" component="div" align="center" className={classes.commandsTitle}>
            Text
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo} paragraph>
            {`All non-equation text must be wrapped in <T></T> unless it doesn't need any formatting
          (that includes the bottom margin).`}
          </Typography>
          <Typography variant="body2" component="div" className={classes.commandsInfo}>
            {`Wrap with a new <T></T> whenever you need a new paragraph. We don't want large paragraphs,
          so you should break up text frequently with it.`}
          </Typography>
        </Grid>
        <Typography variant="h5" component="div" paragraph>
          {<u>All Commands</u>}
        </Typography>
        {textCommands.map(textCommand => (
          <Grid>
            <Typography variant="body2" component="div" className={classes.commandText}>
              {textCommand.input}
            </Typography>
            <Typography variant="body2" component="div" className={classes.commandText}>
              {textCommand.output}
            </Typography>
          </Grid>
        ))}
        <Grid className={classes.commandsTopText}>
          <Typography variant="h4" component="div" align="center" className={classes.commandsTitle}>
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
        </Grid>
        <Typography variant="h5" component="div" paragraph>
          {<u>Some Commands</u>}
        </Typography>
        {equationCommands.map(equationCommand => (
          <Grid className={classes.equationContainer}>
            <Typography variant="body2" component="div" className={classes.commandText}>
              {equationCommand.input}
            </Typography>
            <Typography variant="body2" component="div" className={classes.commandText}>
              {equationCommand.output}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

Testing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Testing);
