// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile } from '../actions/profileActions';
import { clearCurrentProfile } from '../actions/profileActions';
import { logoutUser } from '../actions/authActions'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { changePassword, clearErrors } from '../actions/authActions'
import axios from 'axios';
import { GET_ERRORS } from '../actions/types'

// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom'
import * as colors from '../assets/jss/components/colors'
import CardCustom from '../assets/jss/components/CardCustom'
import LinkCustom from '../assets/jss/components/LinkCustom'



// Material UI Components
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


// Local Assets
import wavePattern from '../assets/images/wavePattern.png'


//  Style Overrides 
const styles = theme => ({
  progress: {
    color: 'grey',
  },
  textField: {
  },
  label: {
    color: 'grey',
  },
  root: {
    color: 'grey',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  progressContainer: {
    height: '-webkit-fill-available',
  },
  buttonContainer: {
    marginTop: '5px',
    marginBottom: '15px',
  },
  cardInner: {
    padding: 20,
  },
  password: {
    marginBottom: '15px',
  },
  billing: {
    marginTop: '40px'
  },
});


class Profile extends Component {
  state = {
    password: '',
    name: '',
    password2: '',
    errors: {},
    showPassword: false,
    updated: false
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const passwordData = {
      password: this.state.password,
      password2: this.state.password2
    }
    axios
      .post('/api/users/changepass', passwordData)
      .then(() => {
        this.setState({
          updated: true,
        });
        this.props.clearErrors()
      })
      .catch(err =>
        this.props.getErrors(err)
      );
  }

  render() {
    console.log('hello')
    const { classes } = this.props;
    const { errors, updated } = this.state;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = (
        <Grid container justify="center" alignItems='center' className={classes.progressContainer}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        profileContent = <h4>TODO Display Profile</h4>
      } else {
        // User is logged in but has no profile
        profileContent = (
          <React.Fragment>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={5}>
                <CardCustom title='Change Password' borderBottom>
                  <Grid container justify='center' className={classes.cardInner}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                      <Grid container direction='column'>
                        <TextField
                          error={Boolean(errors.password)}
                          id="outlined-adornment-password"
                          className={classes.password}
                          variant="outlined"
                          type={this.state.showPassword ? 'text' : 'password'}
                          label="New Password"
                          helperText={errors.password}
                          value={this.state.password}
                          onChange={this.handleChange('password')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          error={Boolean(errors.password2)}
                          id="outlined-adornment-password2"
                          classes={{ root: classes.root }}
                          className={classNames(classes.margin, classes.textField)}
                          variant="outlined"
                          type={this.state.showPassword ? 'text' : 'password'}
                          label="Confirm New Password"
                          value={this.state.password2}
                          helperText={errors.password2}
                          onChange={this.handleChange('password2')}

                        />
                      </Grid>
                      <Grid container justify="center" className={classes.buttonContainer} >
                        <Grid item>
                            <ButtonCustom
                              type="submit"
                              fullWidth
                              variant="contained"
                              className={classes.submit}
                            >
                              Save Changes
                            </ButtonCustom>
                        
                        </Grid>
                      </Grid>
                      {updated && (
                            <Typography variant='body1' align='center' color="textPrimary">
                              Your password has been changed.
                            </Typography>
                          )}
                    </form>
                  </Grid>
                </CardCustom>
              </Grid>


              <Grid item xs={12} sm={4}>
                <CardCustom title='Profile' borderBottom>
                  <CardContent>
                    <p>Welcome {user.name}</p>
                    <p> You haven't set up a profile</p>
                    <LinkCustom to='./createProfile'>
                      <ButtonCustom hasArrow>
                        Create a Profile
              </ButtonCustom>
                    </LinkCustom>
                  </CardContent>
                </CardCustom>
              </Grid>
            </Grid>

            <Grid>

              <CardCustom title='Billing' borderBottom className={classes.billing}>
                <CardContent>
                  <Typography component="h1" variant="body1">
                    Subscription Status
          </Typography>
                </CardContent>
              </CardCustom>
            </Grid>
          </React.Fragment>
        )
      }
    }
    return (
      <React.Fragment>
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
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  getErrors:
    (err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    },
  clearErrors:
    () => {
      dispatch(clearErrors())
    },
  getCurrentProfile:
    () => {
      dispatch(getCurrentProfile())
    },
})

export default withStyles(styles)(
  connect(mapStatetoProps, mapDispatchToProps)(Profile));



