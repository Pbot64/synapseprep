// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_ERRORS } from '../actions/types';

// Local Components
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import * as colors from '../assets/jss/components/colors';
import CardCustom from '../assets/jss/components/CardCustom';
import LinkCustom from '../assets/jss/components/LinkCustom';
import { resetPassword } from '../actions/authActions';
import Button from '@material-ui/core/Button';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

//  Style Overrides
const styles = theme => ({
  progress: {
    color: 'grey'
  },
  textField: {},
  label: {
    color: 'grey'
  },
  root: {
    color: 'grey'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: '#FFFFFF',
    ...colors.blueToGreen
  },
  progressContainer: {
    height: '-webkit-fill-available'
  },
  buttonContainer: {
    marginTop: '15px'
  },
  cardInner: {
    padding: 20
  },
  password: {
    marginBottom: '20px'
  },
  billing: {
    marginTop: '40px'
  }
});

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      password2: '',
      updated: false,
      isLoading: true,
      message: '',
      errors: {},
      showPassword: false
    };
  }

  componentDidMount() {
    axios
      .get('/api/users/resetpassword', {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      })
      .then(res => {
        if (res.data.message === 'password reset link a-ok') {
          this.setState({
            message: 'authenticated'
          });
        }
      })
      .catch(err => {
        this.setState({
          message: 'error'
        });
        this.props.getErrors(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put('/api/users/updatePasswordViaEmail', {
        password: this.state.password,
        password2: this.state.password2,
        resetPasswordToken: this.props.match.params.token
      })
      .then(res => {
        if (res.data.message === 'password updated') {
          this.setState({
            message: 'updated'
          });
        }
      })
      .catch(err => {
        this.setState({
          message: 'error'
        });
        this.props.getErrors(err);
      });
  };

  render() {
    const { errors, message } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        {message === 'error' && (
          <div>
            <h4>Problem resetting password. Please send another reset link.</h4>
          </div>
        )}

        {message === 'authenticated' && (
          <Grid container justify="space-between">
            <Grid item xs={12} sm={5}>
              <CardCustom title="Change Password" borderBottom>
                <Grid container justify="center" className={classes.cardInner}>
                  <form onSubmit={this.updatePassword} className={classes.form}>
                    <Grid container direction="column">
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
                          )
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
                    <Grid container justify="center" className={classes.buttonContainer}>
                      <Grid item>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          className={classes.submit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </CardCustom>
            </Grid>
          </Grid>
        )}

        {message === 'updated' && (
          <div>
            <p>Your password has been successfully reset, please try logging in again.</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getErrors: err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    mapDispatchToProps
  )(ResetPassword)
);
