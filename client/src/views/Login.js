// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//Actions
import { loginUser } from '../actions/authActions';

// Local Components
import LinkCustom from '../assets/jss/components/LinkCustom';

// Material UI Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CardCustom from '../assets/jss/components/CardCustom';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Local Assets
import * as colors from '../assets/jss/components/colors';

//  Style Overrides
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    margin: '20px 0px',
    color: '#FFFFFF',
    ...colors.blueToGreen
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

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    console.log('hello');
    return (
      <main className={classes.main}>
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
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            <Button type="submit" fullWidth className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkCustom to="/passwordResetEmail">
                  <Typography component="p" variant="body2">
                    Forgot password?
                  </Typography>
                </LinkCustom>
              </Grid>
              <Grid item>
                <LinkCustom to="/register">
                  <Typography component="p" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </LinkCustom>
              </Grid>
            </Grid>
          </form>
        </CardCustom>
      </main>
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
