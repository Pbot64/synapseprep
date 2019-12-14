import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: '30px'
    }
  },
  rootDetails: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.8125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    }
  },
  heading: {
    fontWeight: 500
  },
  expansionRoot: {
    boxShadow: 'none'
  },
  expansionContainer: {
    maxWidth: '350px',
    minWidth: '300px'
  }
});

function Expansion(props) {
  const { classes, children, top } = props;
  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.expansionContainer}>
        <ExpansionPanel classes={{ root: classes.expansionRoot }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" className={classes.heading}>
              {top}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.rootDetails }}>
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
