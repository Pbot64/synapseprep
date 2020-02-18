// Node Modules
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import JsxParser from 'react-jsx-parser';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local Components
import T from './Text/@Text';
import E from './Equation/@Equation';

// Local Assets

//  Style Overrides
const styles = theme => ({
  choiceButtonRoot: {
    marginLeft: '5px',
    marginRight: '20px',
    minWidth: 'inherit',
    borderRadius: '1000px',
    height: '45px',
    width: '45px',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(0px)',
      backgroundColor: theme.palette.blue
    }
  },
  choiceContainer: {
    cursor: 'pointer',
    padding: '10px 0px',
    '&:hover': {
      backgroundColor: theme.palette.lighterBlue,
      '& $notSelected': {
        backgroundColor: theme.palette.blue,
        transform: 'scale(1.1)',
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    },
    '&:not(:last-child)': {
      borderBottom: '0.5px solid lightgrey'
    }
  },
  choiceContainerSelected: {
    cursor: 'pointer',
    borderBottom: '0.5px solid lightgrey',
    padding: '10px 0px',
    backgroundColor: theme.palette.lighterBlue,
    '&:hover': {
      '& $notSelected': {
        backgroundColor: theme.palette.blue,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    },
    '&:last-child': {
      borderBottom: '0'
    }
  },
  selected: {
    backgroundColor: theme.palette.blue,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    color: 'white',
    border: '1px solid white'
  },
  notSelected: {
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  correct: {
    transition: 'transform 0.3s',
    backgroundColor: theme.palette.lightGreen
  },
  incorrect: {
    transition: 'transform 0.3s',
    backgroundColor: '#ffe6e6'
  },
  correctChoiceButton: {
    backgroundColor: theme.palette.green,
    '&:hover': {
      backgroundColor: theme.palette.green,
      transform: 'translateY(0px)'
    }
  },
  incorrectChoiceButton: {
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'red',
      transform: 'translateY(0px)'
    }
  },
  disabled: {
    backgroundColor: 'white',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'white',
      '& $notSelected': {
        backgroundColor: 'white',
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        transform: 'scale(1)'
      }
    }
  },
  disabledButton: {
    marginRight: '20px',
    minWidth: 'inherit',
    borderRadius: '1000px',
    padding: '8px 16px',
    transition: 'transform 0.3s',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.0)',
      boxShadow: '0px 5px 10px rgba(0,0,0,0)'
    }
  },
  choiceText: {
    width: '0px',
    flexGrow: '1'
  }
});

const Choice = props => {
  const { classes, selected, setSelected, correct, answered, choiceContent, letter } = props;

  return (
    <Grid
      item
      container
      alignItems="center"
      className={classNames(
        selected === letter ? classes.choiceContainerSelected : classes.choiceContainer,
        {
          [classes.correct]: selected === letter && answered && correct,
          [classes.incorrect]: selected === letter && answered && !correct,
          [classes.disabled]: selected !== letter && answered
        }
      )}
      onClick={() => {
        !answered && setSelected(letter);
      }}
    >
      <ButtonCustom
        disabled={selected !== letter && answered}
        className={classNames(
          classes.choiceButtonRoot,
          selected === letter ? classes.selected : classes.notSelected,
          {
            [classes.correctChoiceButton]: selected === letter && answered && correct,
            [classes.incorrectChoiceButton]: selected === letter && answered && !correct,
            [classes.disabledButton]: selected !== letter && answered
          }
        )}
      >
        {letter}
      </ButtonCustom>
      <Typography variant="body2" component="div" className={classes.choiceText}>
        <JsxParser
          disableFragments={true}
          components={{ Grid, Typography, T, E }}
          jsx={choiceContent}
        />
      </Typography>
    </Grid>
  );
};

Choice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Choice);
