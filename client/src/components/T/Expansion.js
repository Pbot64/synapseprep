// Node modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '30px'
    },
    '&:last-child': {
      marginBottom: '30px'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.8125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    }
  },
  wrongChoiceContent: {
    padding: '0px'
  },
  heading: {
    fontWeight: 500
  },
  expansionRoot: {
    boxShadow: 'none'
  },
  expansionContainer: {
    maxWidth: '350px'
  },
  wrongChoiceContainer: {
    maxWidth: '100%'
  },
  expansionSummary: {},
  wrongChoiceSummary: {
    borderBottom: '1px solid lightgrey',
    minHeight: '36px',
    padding: '0px',
    marginBottom: '20px'
  },
  wrongChoicePanel: {
    backgroundColor: 'transparent'
  },
  wrongChoiceIcon: {
    right: '0px'
  }
});

function Expansion(props) {
  const { classes, children, top, wrongChoice } = props;
  return (
    <div className={classes.root}>
      <Grid
        item
        className={wrongChoice ? classes.wrongChoiceContainer : classes.expansionContainer}
      >
        <ExpansionPanel
          className={wrongChoice && classes.wrongChoicePanel}
          classes={{ root: classes.expansionRoot }}
        >
          <ExpansionPanelSummary
            classes={wrongChoice && { expandIcon: classes.wrongChoiceIcon }}
            expandIcon={<ExpandMoreIcon />}
            className={classNames(
              classes.expansionSummary,
              wrongChoice && classes.wrongChoiceSummary
            )}
          >
            <Typography variant="body2" className={classes.heading}>
              {top}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={wrongChoice && classes.wrongChoiceContent}
            classes={{ root: classes.content }}
          >
            {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
}

Expansion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Expansion);
