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
import CardCustom from '../assets/jss/components/CardCustom';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Local Assets

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
    marginTop: theme.spacing.unit * 2
  },
  progressContainer: {
    height: '-webkit-fill-available'
  },
  buttonContainer: {
    marginBottom: '20px'
  },
  cardInner: {
    padding: 20
  },
  password: {
    marginBottom: '20px'
  },
  billing: {
    marginTop: '40px'
  },
  form: {
    marginTop: '20px'
  }
});

class PasswordResetEmail extends Component {
  state = {
    email: '',
    errors: {},
    submitted: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const emailData = {
      email: this.state.email
    };
    const resetPassword = emailData => {
      axios
        .post('/api/users/emailResetToken', emailData)
        .then(this.setState({ submitted: true, errors: {} }))
        .catch(err => this.props.getErrors(err));
    };
    resetPassword(emailData);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { errors, submitted } = this.state;
    return (
      <React.Fragment>
        <Grid item xs={12} sm={8} md={5}>
          <CardCustom title="Change Password" borderBottom>
            <Grid container justify="center" direction="column" className={classes.cardInner}>
              <Typography variant="body1" color="inherit">
                Enter your email address below and we'll send you an email with instructions to
                reset your password.
              </Typography>
              <form onSubmit={this.handleSubmit} className={classes.form}>
                <Grid container direction="column">
                  <TextField
                    error={Boolean(errors.email)}
                    id="outlined-adornment-email"
                    classes={{ root: classes.root }}
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type="email"
                    label="Enter Email"
                    value={this.state.email}
                    helperText={errors.email}
                    onChange={this.handleChange('email')}
                  />

                  <Grid
                    container
                    justify="space-between"
                    align="center"
                    direction="column"
                    className={classes.buttonContainer}
                  >
                    {!submitted && (
                      <Grid item>
                        <ButtonCustom
                          type="submit"
                          fullWidth
                          variant="contained"
                          className={classes.submit}
                        >
                          Send Email
                        </ButtonCustom>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </form>
              {submitted && (
                <Typography variant="body1" color="inherit" align="center">
                  Password Recovery Email Sent
                </Typography>
              )}
            </Grid>
          </CardCustom>
        </Grid>
      </React.Fragment>
    );
  }
}

PasswordResetEmail.propTypes = {
  classes: PropTypes.object.isRequired
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

export default withStyles(styles)(connect(mapStatetoProps, mapDispatchToProps)(PasswordResetEmail));
