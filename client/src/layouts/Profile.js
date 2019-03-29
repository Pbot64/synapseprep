// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile } from '../actions/profileActions';
import { clearCurrentProfile } from '../actions/profileActions';
import { logoutUser } from '../actions/authActions'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'

// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom'

// Material UI Components
import Typography from '@material-ui/core/Typography';


// Local Assets

//  Style Overrides 
const styles = theme => ({
  progress: {
    color: 'blue',
  },
});


class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { profile, loading} = this.props.profile;

    let profileContent;

    if(profile === null || loading) {
      profileContent = <CircularProgress className={classes.progress} />
 
    } else {
      //Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        profileContent = <h4>TODO Display Profile</h4>
      } else {
        // User is logged in but has no profile
        profileContent = (
          <div>
            <p>Welcome {user.name}</p>
            <p> You haven't set up a profile</p>
            <Link to='./createProfile' className = {classes.link}>
                <ButtonCustom hasArrow>
                  Go to Lesson
                </ButtonCustom>
                </Link>
          </div>
        )
      }
    }
    return (
      <React.Fragment>
        <Typography variant="h5" color="textPrimary" className={classes.title}>
            Profile 
          </Typography>
          {profileContent}
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});


export default withStyles(styles)(
  connect(mapStatetoProps, { getCurrentProfile })(Profile));



