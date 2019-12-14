// Node modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import JsxParser from 'react-jsx-parser';

// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Components
import E from './Equation';
import T from './Text';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local assets

//  Style overrides
const styles = theme => ({
  '@global': {
    '.katex': {
      'text-indent': '1px'
    },
    '.mathdefault': {
      marginRight: '0px'
    },
    '.katex-display': {
      margin: '0px'
    },
    '.text': {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: '0.9rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.1rem'
      }
    },
    '.newline': {
      marginBottom: '0.5rem'
    },
    '.katex .fbox': {
      border: '2px solid'
    }
  },
  root: {
    marginTop: '60px',
    width: '100%'
  },
  stepContainer: {
    marginBottom: '80px',
    '& > :last-child': {
      '& > div': {
        '& > :last-child': {
          marginBottom: '0px'
        }
      }
    }
  },
  stepTitleContainer: {
    marginBottom: '15px'
  },
  stepTitle: {
    borderBottom: '1px solid black'
  },
  alternateButton: {
    marginLeft: '15px',
    fontSize: '0.5rem',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '30px',
      fontSize: '0.6875rem'
    }
  }
});

const QuestionSolution = props => {
  const { solutions, alternate, classes, completed, pageNumber, hintStep } = props;
  const [altSolution, setAltSolution] = useState(false);

  useEffect(() => {
    setAltSolution(false);
  }, [pageNumber]);

  const testStr = `
    <Typography variant="body2">See the <span style='text-decoration: underline;'> equa</span>l sign? That means we're dealing with an <span style = 'text-decoration: underline;'> equa</span>tion.</Typography>
    <Typography variant="body2">And since none of the variables have visible exponents, it has to be a <span style = 'font-weight: 600;'> linear equation.</span></Typography>

    <Grid item>
    <Typography variant="body2" class = "katexStep">Manipulate the equation to isolate the <TeX>{'y'}</Tex> variable:</Typography>
    <I>testing</I>
      <TeX block>{'2x + y = 10'}</TeX>
      <TeX block>{'2x \\ {\\color{Red} -2x} + y = 10 \\ {\\color{Red} -2x}'}</TeX>
      <TeX block>{'y = -2x + 10'}</TeX>
      <Typography variant="body2"  class = "katexStep">Plug in 3 for x and simplify:</Typography>
      <TeX block>{'y = {\\color{Red} -2(3)} + 10'}</TeX>
      <TeX block>{'y = -6 + 10'}</TeX>
      <TeX block>{'\\boxed{y = 4}'}</TeX>
    </Grid>

  <Typography variant="body2" style = 'font-weight: 600;'>Answer Choice A is correct</Typography>
  `;

  return (
    <React.Fragment>
      <Grid className={classes.root}>
        {(hintStep >= 1 || completed) && (
          <Grid item className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Identify Question Type
              </Typography>
            </Grid>
            {solutions[0].map((solution, i) => {
              return (
                (hintStep > i || completed) && (
                  <Typography key={solution} variant="body2" component="div">
                    <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={solution} />
                  </Typography>
                )
              );
            })}
          </Grid>
        )}
        {(hintStep > solutions[0].length || completed) && (
          <Grid item className={classes.stepContainer}>
            <Grid item container alignItems="center" className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Predict Answer
              </Typography>
              {alternate.length !== 0 && completed && (
                <ButtonCustom
                  onClick={() => {
                    setAltSolution(!altSolution);
                  }}
                  size="small"
                  className={classes.alternateButton}
                >
                  {altSolution ? 'Main Approach' : 'Alternate Approach'}
                </ButtonCustom>
              )}
            </Grid>

            {altSolution &&
              alternate.map(alt => {
                return (
                  completed && (
                    <Typography key={alt} variant="body2" component="div">
                      <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={alt} />
                    </Typography>
                  )
                );
              })}
            {!altSolution &&
              solutions[1].map((solution, i) => {
                return (
                  (hintStep > i + solutions[0].length || completed) && (
                    <Typography key={solution} variant="body2" component="div">
                      <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={solution} />
                    </Typography>
                  )
                );
              })}
          </Grid>
        )}
        {(hintStep > solutions[0].length + solutions[1].length || completed) && (
          <Grid item className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Compare Prediction
              </Typography>
            </Grid>
            {solutions[2].map((solution, i) => {
              return (
                (hintStep > i + solutions[0].length + solutions[1].length || completed) && (
                  <Typography key={solution} variant="body2" component="div">
                    <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={solution} />
                  </Typography>
                )
              );
            })}
          </Grid>
        )}
        <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={testStr} />
      </Grid>
    </React.Fragment>
  );
};

QuestionSolution.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionSolution);
