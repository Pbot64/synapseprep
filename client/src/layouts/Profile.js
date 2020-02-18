// Node modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ReactFilestack from 'filestack-react';
import { connect } from 'react-redux';
import axios from 'axios';

// Redux actions
import { GET_ERRORS } from '../actions/types';
// import { getCurrentProfile } from '../actions/profileActions';
import { clearErrors, deleteAccount, updateAccount } from '../actions/authActions';

// Local components
import ButtonCustom from '../assets/jss/components/ButtonCustom';
import CardCustom from '../assets/jss/components/CardCustom';

// Material UI components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// Local assets

//  Style overrides
const styles = theme => ({
  progress: {
    color: 'grey'
  },
  textField: {},
  label: {
    color: 'grey'
  },
  textFieldRoot: {
    color: 'grey',
    maxWidth: '300px'
  },
  submit: {},
  saveChangesButton: {
    marginTop: '24px'
  },
  progressContainer: {
    height: '-webkit-fill-available'
  },
  topTextFeild: {
    marginBottom: '15px'
  },
  billingContainer: {
    marginTop: '50px'
  },
  profileTextBottom: {
    marginBottom: '50px'
  },
  profileCardContainer: {
    maxWidth: '450px',
    minWidth: '0px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '380px'
    }
  },
  changePassCardContainer: {
    maxWidth: '450px',
    minWidth: '0px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '380px'
    }
  },
  avatar: {
    borderRadius: '200px',
    width: '100px',
    height: '100px'
  },
  profileName: {
    backgroundImage: 'linear-gradient(224deg, #209cff 0%, #68e0cf 100%)',
    color: 'transparent',
    '-webkit-background-clip': 'text',
    backgroundClip: 'text'
  },
  welcomeContainer: {
    marginLeft: '20px'
  },
  accountInfoContainer: {
    marginTop: '20px'
  },
  deleteButton: {
    fontSize: '0.8rem',
    marginTop: '40px',
    color: 'red',
    opacity: '0.5'
  },
  changeAvatarButton: {
    fontSize: '0.6rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.8rem'
    }
  }
});

class Profile extends Component {
  state = {
    password: '',
    id: this.props.auth.user.id,
    name: this.props.auth.user.name,
    password2: '',
    errors: {},
    avatar: this.props.auth.user.avatar,
    email: this.props.auth.user.email,
    showPassword: false,
    updated: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  };

  onSuccess = result => {
    const newAvatar = result.filesUploaded[0].url;
    this.setState({
      avatar: newAvatar
    });
    const updatedUser = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      avatar: newAvatar
    };
    this.props.updateAccount(updatedUser);
    console.log('updatedUser', updatedUser);
  };

  handleUpdateAccount = () => {
    const updatedUser = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar
    };
    this.props.updateAccount(updatedUser);
    console.log('updatedUser', updatedUser);
  };

  onError = error => {
    console.error('error', error);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const passwordData = {
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post('/api/users/changepass', passwordData)
      .then(() => {
        this.setState({
          updated: true
        });
        this.props.clearErrors();
      })
      .catch(err => this.props.getErrors(err));
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { errors, updated, name, email, avatar } = this.state;
    const { user, loading } = this.props.auth;

    let profileContent;

    if (user === null || loading) {
      profileContent = (
        <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
          <CircularProgress className={classes.progress} />
        </Grid>
      );
    } else {
      // User is logged in but has no profile
      profileContent = (
        <React.Fragment>
          <Grid container spacing={24} justify="space-around">
            <Grid className={classes.changePassCardContainer} item xs={12} sm={6} md={5}>
              <CardCustom padding title="Change Password" borderBottom>
                <Grid container justify="center">
                  <form onSubmit={this.handleSubmit} className={classes.form}>
                    <Grid container direction="column">
                      <TextField
                        error={Boolean(errors.password)}
                        id="outlined-adornment-password"
                        className={classes.topTextFeild}
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
                    <Grid container justify="center" className={classes.saveChangesButton}>
                      {!updated && (
                        <Grid item>
                          <ButtonCustom type="submit" fullWidth className={classes.submit}>
                            Save Changes
                          </ButtonCustom>
                        </Grid>
                      )}
                    </Grid>
                    {updated && (
                      <Typography variant="body1" align="center" color="textPrimary">
                        Your password has been changed.
                      </Typography>
                    )}
                  </form>
                </Grid>
              </CardCustom>
            </Grid>

            <Grid item xs={12} sm={6} md={5} className={classes.profileCardContainer}>
              <CardCustom padding title="Profile" borderBottom>
                <Grid container alignItems="center">
                  <Grid item>
                    <Grid container alignItems="center" direction="column">
                      <img src={avatar} alt="User avatar" className={classes.avatar} />
                      <Button className={classes.changeAvatarButton}>
                        <ReactFilestack
                          apikey={'AovPr36fbS4W9jPnBUTosz'}
                          componentDisplayMode={{
                            type: 'link',
                            customText: 'Change Avatar',
                            customClass: 'some-custom-class'
                          }}
                          actionOptions={{ transformations: { force: true } }}
                          buttonText="Upload Photo"
                          buttonClass="ui medium button gray"
                          // options={basicOptions}
                          onSuccess={this.onSuccess}
                          onError={this.onError}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.welcomeContainer}>
                    <Typography component="p" variant="subtitle1">
                      Welcome!
                    </Typography>
                    <Typography
                      className={classes.profileName}
                      component="p"
                      variant="h5"
                      gutterBottom
                    >
                      {name}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container justify="center" className={classes.accountInfoContainer}>
                  <TextField
                    error={Boolean(errors.email)}
                    id="outlined-email"
                    classes={{ root: classes.textFieldRoot }}
                    className={classes.topTextFeild}
                    variant="outlined"
                    type={'email'}
                    label="Email"
                    value={email}
                    helperText={errors.email}
                    fullWidth={true}
                    onChange={this.handleChange('email')}
                  />
                  <TextField
                    error={Boolean(errors.name)}
                    id="outlined-name"
                    classes={{ root: classes.textFieldRoot }}
                    variant="outlined"
                    type="name"
                    label="Name"
                    value={name}
                    helperText={errors.name}
                    fullWidth={true}
                    onChange={this.handleChange('name')}
                  />
                  <ButtonCustom
                    className={classes.saveChangesButton}
                    onClick={this.handleUpdateAccount}
                  >
                    Save Changes
                  </ButtonCustom>
                </Grid>
                <Grid container justify="flex-end">
                  <Button onClick={this.onDeleteClick} className={classes.deleteButton}>
                    Delete My Account
                  </Button>
                </Grid>
              </CardCustom>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={10} className={classes.billingContainer}>
            <CardCustom padding title="Billing" borderBottom className={classes.billing}>
              <Typography component="h1" variant="body1">
                Subscription Status: Free
              </Typography>
            </CardCustom>
          </Grid>
        </React.Fragment>
      );
    }
    return <React.Fragment>{profileContent}</React.Fragment>;
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
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
  },
  clearErrors: () => {
    dispatch(clearErrors());
  },
  deleteAccount: () => {
    dispatch(deleteAccount());
  },
  updateAccount: updatedAccount => {
    dispatch(updateAccount(updatedAccount));
  }
});

export default withStyles(styles)(connect(mapStatetoProps, mapDispatchToProps)(Profile));
