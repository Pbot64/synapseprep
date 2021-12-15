// Node Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import School from '@material-ui/icons/School';
import Builder from '@material-ui/icons/FitnessCenter';
import Key from '@material-ui/icons/VpnKey';

// Local Components
import TextBase from './TextBase';

import { Grid, IconButton, Typography, Collapse } from '@material-ui/core';

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    paddingTop: '10px',
    marginBottom: '40px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '20px',
      marginBottom: '50px'
    }
  },
  ivy: {
    fontStyle: 'italic',
    fontSize: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem'
    }
  },
  titleContainer: {
    marginBottom: '15px'
  },
  title: {
    display: 'inline-block',
    fontWeight: '500',
    fontSize: '0.8125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9375rem'
    }
  },
  titleLineContainer: {
    padding: '0px 10px',
    flex: '1 1 auto'
  },
  titleLine: {
    display: 'block',
    borderTop: '1px solid'
  },
  iconBase: {
    width: '30px',
    height: '40px'
  },
  iconTrap: {
    extend: 'iconBase',
    color: theme.palette.red
  },
  iconIvy: {
    extend: 'iconBase',
    color: theme.palette.blue
  },
  iconStrat: {
    extend: 'iconBase',
    color: theme.palette.green
  },
  iconBuild: {
    extend: 'iconBase',
    color: theme.palette.purple
  },
  contentWrapper: {},
  contentContainer: {
    maxWidth: '400px',
    minWidth: 'initial',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'initial',
      minWidth: '500px'
    }
  },
  headerInnerBase: {
    'background-color': 'white',
    padding: '10px',
    position: 'relative',
    'border-radius': '5px',
    'box-shadow': '0 18px 56px -18px rgba(22,45,61,.18)'
  },
  ivyHeaderInner: {
    extend: 'headerInnerBase',
    border: `1px solid ${theme.palette.blue}`
  },
  trapHeaderInner: {
    extend: 'headerInnerBase',
    border: `1px solid ${theme.palette.red}`
  },
  stratHeaderInner: {
    extend: 'headerInnerBase',
    border: `1px solid ${theme.palette.green}`
  },
  builderHeaderInner: {
    extend: 'headerInnerBase',
    border: `1px solid ${theme.palette.purple}`
  },
  expandIconContainer: {
    borderTop: '1px solid lightgrey',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', 0.15),
    '&:hover': {
      // Disable the hover effect for the IconButton,
      // because a hover effect should apply to the entire Expand button and
      // not only to the IconButton.
      backgroundColor: 'transparent'
    },
    '&$expanded': {
      transform: 'rotate(180deg)'
    }
  },
  extraExpand: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  expanded: {},
  collapse: {
    marginTop: '-45px'
  },
  wrapperInner: {
    'border-radius': '10px',
    padding: '20px',
    'padding-top': '60px',
    'background-color': 'white'
  },
  wrapperInnerExpanded: {
    extend: 'wrapperInner',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px'
  }
});

const Curriculum = props => {
  const [expanded, setExpanded] = useState(false);
  const { classes, trap, ivy, strat, build, expand, children, title, ...rest } = props;
  return (
    <>
      <Grid item className={classes.root}>
        <Grid item container justify='center'>
          <Grid
            item
            className={
              trap
                ? classes.trapHeaderInner
                : ivy
                ? classes.ivyHeaderInner
                : strat
                ? classes.stratHeaderInner
                : classes.builderHeaderInner
            }
          >
            <Grid item container direction='column' alignItems='center' justify='center'>
              {trap && <ErrorOutline className={classes.iconTrap} />}
              {ivy && <School className={classes.iconIvy} />}
              {strat && <Key className={classes.iconStrat} />}
              {build && <Builder className={classes.iconBuild} />}
              <Typography variant='h1' color='inherit'>
                {trap && 'Trap Alert'}
                {ivy && 'Ivy League'}
                {strat && 'Key Strat'}
                {build && 'Skill Builder'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify='center' className={classes.contentWrapper}>
          <Grid item xs={12} sm={10} className={classes.contentContainer}>
            <Collapse
              className={classes.collapse}
              classes={{
                wrapperInner: expand ? classes.wrapperInnerExpanded : classes.wrapperInner
              }}
              collapsedHeight={expand ? '200px' : 'auto'}
              in={expand ? expanded : true}
              timeout='auto'
            >
              {title && (
                <Grid item container alignItems='center' className={classes.titleContainer}>
                  <Grid item className={classes.titleLineContainer}>
                    <span className={classes.titleLine} />
                  </Grid>
                  <Typography className={classes.title}>{title}</Typography>
                  <Grid item className={classes.titleLineContainer}>
                    <span className={classes.titleLine} />
                  </Grid>
                </Grid>
              )}
              <TextBase extra expanded={expanded} {...rest}>
                {children}
              </TextBase>
            </Collapse>
            {expand && (
              <Grid
                container
                justify='center'
                onClick={() => {
                  setExpanded(!expanded);
                }}
                className={classes.expandIconContainer}
              >
                <IconButton
                  className={classNames(classes.expandIcon, {
                    [classes.expanded]: expanded
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Curriculum.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Curriculum);
