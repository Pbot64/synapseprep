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
import E from './Equation/@Equation';
import T from './Text/@Text';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local assets

//  Style overrides
const styles = theme => ({
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
    marginBottom: '15px',
    display: 'block',
    [theme.breakpoints.up(360)]: {
      display: 'flex'
    }
  },
  stepTitle: {
    borderBottom: '1px solid black',
    display: 'inline'
  },
  approchContainer: {
    marginTop: '15px',
    marginLeft: '0px',
    flexWrap: 'nowrap',
    [theme.breakpoints.up(360)]: {
      marginTop: '0px',
      marginLeft: '25px'
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '45px'
    }
  },
  approchButton: {
    marginRight: '10px',
    fontSize: '0.625rem',
    opacity: '0.8',
    [theme.breakpoints.up('sm')]: {
      marginRight: '20px',
      fontSize: '0.75rem'
    }
  },
  approchButtonSelected: {
    marginRight: '10px',
    fontSize: '0.625rem',
    color: 'white',
    ...theme.palette.blueToGreen,
    '&:hover': {
      ...theme.palette.blueToGreen
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: '20px',
      fontSize: '0.75rem'
    }
  }
});

const QuestionSolution = props => {
  const { solutions, alternate, classes, answered, pageNumber, hintStep } = props;
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
        {(hintStep >= 1 || answered) && (
          <Grid item className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Identify Question Type
              </Typography>
            </Grid>
            {solutions[0].map((solution, i) => {
              return (
                (hintStep > i || answered) && (
                  <Typography key={i} variant="body2" component="div">
                    <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={solution} />
                  </Typography>
                )
              );
            })}
          </Grid>
        )}
        {(hintStep > solutions[0].length || answered) && (
          <Grid item className={classes.stepContainer}>
            <Grid item container alignItems="center" className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Predict Answer
              </Typography>
              {alternate && answered && (
                <Grid item xs container className={classes.approchContainer}>
                  <ButtonCustom
                    onClick={() => {
                      setAltSolution(altSolution ? !altSolution : altSolution);
                    }}
                    size="small"
                    className={altSolution ? classes.approchButton : classes.approchButtonSelected}
                  >
                    Main
                  </ButtonCustom>
                  <ButtonCustom
                    onClick={() => {
                      setAltSolution(altSolution ? altSolution : !altSolution);
                    }}
                    size="small"
                    className={!altSolution ? classes.approchButton : classes.approchButtonSelected}
                  >
                    Alternate
                  </ButtonCustom>
                </Grid>
              )}
            </Grid>

            {altSolution && alternate && answered && (
              <Typography variant="body2" component="div">
                <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={alternate} />
              </Typography>
            )}
            {!altSolution &&
              solutions[1].map((solution, i) => {
                return (
                  (hintStep > i + solutions[0].length || answered) && (
                    <Typography key={i} variant="body2" component="div">
                      <JsxParser components={{ TeX, Grid, Typography, E, T }} jsx={solution} />
                    </Typography>
                  )
                );
              })}
          </Grid>
        )}
        {(hintStep > solutions[0].length + solutions[1].length || answered) && (
          <Grid item className={classes.stepContainer}>
            <Grid container className={classes.stepTitleContainer}>
              <Typography variant="h5" className={classes.stepTitle}>
                Compare Prediction
              </Typography>
            </Grid>
            {solutions[2].map((solution, i) => {
              return (
                (hintStep > i + solutions[0].length + solutions[1].length || answered) && (
                  <Typography key={i} variant="body2" component="div">
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
