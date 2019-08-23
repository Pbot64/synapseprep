// Node modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import JsxParser from 'react-jsx-parser';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local assets

//  Style overrides
const styles = theme => ({
  '@global': {
    '.katex': {},
    '.katexStep': {
      fontStyle: 'italic',
      marginBottom: '30px'
    }
  },
  root: {
    marginTop: '60px',
    width: '100%'
  },
  solutionStepContainer: {
    width: '100%'
  },
  solutionTitleContainer: {
    padding: '15px',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '10px',
    maxWidth: '500px',
    marginTop: '30px',
    marginBottom: '40px',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    boxShadow: '0 18px 56px -18px rgba(22,45,61,.18)'
  },
  solutionTitle: {
    borderBottom: '1px solid #00BF6F',
    fontWeight: '600',
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    transform: 'skewY(-4deg)',
    backgroundImage: 'linear-gradient(45deg, #2980ba 0%, #238E9B 50%, #00BF6F 100%)',
    color: 'transparent',
    '-webkit-background-clip': 'text',
    backgroundClip: 'text'
  },
  stepContainer: {
    marginBottom: '50px'
  },
  stepTitleContainer: {
    marginBottom: '10px'
  },
  stepTitle: {
    borderBottom: '1px solid black'
  }
});

const QuestionSolution = props => {
  console.log('solutionProps', props);
  const { solutions, classes, completed, solutionStep } = props;
  // const testStr = `
  //   <Typography variant="body2">See the <span style='text-decoration: underline;'> equa</span>l sign? That means we're dealing with an <span style = 'text-decoration: underline;'> equa</span>tion.</Typography>
  //   <Typography variant="body2">And since none of the variables have visible exponents, it has to be a <span style = 'font-weight: 600;'> linear equation.</span></Typography>

  //   <Grid item>
  //   <Typography variant="body2" class = "katexStep">Manipulate the equation to isolate the y variable:</Typography>
  //     <TeX block>{'2x + y = 10'}</TeX>
  //     <TeX block>{'2x \\ {\\color{Red} -2x} + y = 10 \\ {\\color{Red} -2x}'}</TeX>
  //     <TeX block>{'y = -2x + 10'}</TeX>
  //     <Typography variant="body2"  class = "katexStep">Plug in 3 for x and simplify:</Typography>
  //     <TeX block>{'y = {\\color{Red} -2(3)} + 10'}</TeX>
  //     <TeX block>{'y = -6 + 10'}</TeX>
  //     <TeX block>{'\\boxed{y = 4}'}</TeX>
  //   </Grid>

  // <Typography variant="body2" style = 'font-weight: 600;'>Answer Choice A is correct</Typography>
  // `;

  return (
    <React.Fragment>
      <Grid className={classes.root}>
        {(solutionStep > 0 || completed) && (
          <Grid item container className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Identify Question Type
              </Typography>
            </Grid>
            <JsxParser components={{ TeX, Grid, Typography }} jsx={solutions[0]} />
          </Grid>
        )}
        {(solutionStep > 1 || completed) && (
          <Grid item container className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Predict Answer
              </Typography>
            </Grid>
            <Grid item xs>
              <JsxParser components={{ TeX, Grid, Typography }} jsx={solutions[1]} />
            </Grid>
          </Grid>
        )}
        {(solutionStep > 2 || completed) && (
          <Grid item container className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Compare Prediction
              </Typography>
            </Grid>
            <JsxParser components={{ TeX, Grid, Typography }} jsx={solutions[2]} />
          </Grid>
        )}
        {/* <JsxParser components={{ TeX, Grid, Typography }} jsx={testStr} /> */}
      </Grid>
    </React.Fragment>
  );
};

QuestionSolution.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionSolution);
