// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';

//Actions
import { loginUser } from '../actions/authActions';

// Local Components
import LinkCustom from '../assets/jss/components/LinkCustom';
import ButtonCustom from '../assets/jss/components/ButtonCustom';

// Material UI Components
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CardCustom from '../assets/jss/components/CardCustom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Local Assets
import * as colors from '../assets/jss/components/colors';

//  Style Overrides
const styles = theme => ({
  root: {
    maxWidth: '400px',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 5
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    margin: '20px 0px',
    border: 'none',
    color: '#FFFFFF',
    ...colors.blueToGreen
  },
  link: {
    textDecoration: 'underline',
    color: '#2980ba',
    paddingRight: '10px'
  },
  link2: {
    textDecoration: 'underline',
    color: '#2980ba'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleFacebook = this.handleFacebook.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('./dashboard');
    }
    axios
      .get('/api/connect')
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  // handleFacebook() {
  //   axios.get("/api/users/auth/facebook").then(res => console.log(res));
  // }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CardCustom className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <TextField
              error={Boolean(errors.email)}
              helperText={errors.email}
              value={this.state.email || ''}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              name="email"
              autoFocus
            />
            <TextField
              error={Boolean(errors.password)}
              helperText={errors.password}
              value={this.state.password || ''}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              autoComplete="current-password"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox checked value="remember" color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            <ButtonCustom type="submit" fullWidth className={classes.submit}>
              Login
            </ButtonCustom>
            <Grid container>
              <Grid item xs>
                <LinkCustom to="/passwordResetEmail">
                  <Typography className={classes.link} component="p" variant="body2">
                    Forgot password?
                  </Typography>
                </LinkCustom>
              </Grid>
              <Grid item>
                <LinkCustom to="/register">
                  <Typography className={classes.link2} component="p" variant="body2">
                    Don't have an account? Sign Up
                  </Typography>
                </LinkCustom>
              </Grid>
            </Grid>
          </form>
          {/* <p onClick={this.handleFacebook}>Login with Facebook</p>
          <div
            class="fb-login-button"
            data-width=""
            data-size="large"
            data-button-type="continue_with"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          />
          <a href="http://localhost:5005/api/users/auth/facebook">
            Facebook Button 2
          </a> */}
        </CardCustom>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { loginUser }
  )(Login)
);
