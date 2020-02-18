// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Local Components
import CardCustom from '../assets/jss/components/CardCustom';
import AccordionReview from '../components/AccordionReview';
import LinkCustom from '../assets/jss/components/LinkCustom';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Local Assets

// Actions
import { setAssignment } from '../actions/profileActions';

// Style Overrides
const styles = theme => ({
  root: {},
  bottomCardContainer: {
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    padding: 5,
    backgroundColor: 'white',
    borderTop: 'solid 1px lightgrey'
  },
  topCardContainer: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px'
  },
  title: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
    paddingBottom: '10px'
  },
  bottomText: {
    color: `${theme.palette.text.lightGrey}`
  },
  bottomContainer: {
    marginTop: '40px'
  }
});

const Review = props => {
  const { classes, profile } = props;
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={10} md={8}>
          <CardCustom
            padding
            title="Completed Tasks"
            borderBottom
            className={classes.topCardContainer}
          >
            <Grid container justify="center" className={classes.topCardInner}>
              <AccordionReview profile={profile} />
            </Grid>

            <Grid container item justify="flex-end" className={classes.bottomContainer}>
              <LinkCustom to="/review">
                <ButtonCustom hasArrowRight>Start Task</ButtonCustom>
              </LinkCustom>
            </Grid>
          </CardCustom>
          <div className={classes.bottomCardContainer}>
            <Grid container align="center" direction="column">
              <Typography variant="subtitle2" className={classes.bottomText}>
                Review questions you've previously attempted (feature UNDER CONSTRUCTION).
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStatetoProps, { setAssignment })(Review)
);
