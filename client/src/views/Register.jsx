import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import FormHelperText from '@material-ui/core/FormHelperText';

import classnames from 'classnames';


import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions'



const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: '#FFFFFF',
    background:
    'url(../assets/images/wavePattern.png), linear-gradient(45deg, #2980ba 10%, #238E9B 40%, #17ab5d 100%)',
    backgroundBlendMode: 'color-burn'
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
  }
}

componentDidMount() {
  if(this.props.auth.isAuthenticated) {
    this.props.history.push('./dashboard');
  }
}

handleChange(e) {
  this.setState({[e.target.name]: e.target.value});
}

handleSubmit(e) {
  e.preventDefault();

  const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
  };

this.props.registerUser(newUser, this.props.history);

}

render() {
  const { errors } = this.state;
  const { classes } = this.props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit = {this.handleSubmit} className={classes.form}>
          <FormControl error = {errors.name} margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              value = {this.state.name}
              onChange = {this.handleChange} />
            <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
          </FormControl>
          <FormControl error = {errors.email} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value = {this.state.email}
              onChange = {this.handleChange} />
            <FormHelperText id="component-error-text">{errors.email}</FormHelperText>
          </FormControl>
          <FormControl error = {errors.password} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {this.state.password}
              onChange = {this.handleChange} />
            <FormHelperText id="component-error-text">{errors.password}</FormHelperText>
          </FormControl>
          <FormControl error = {errors.password2} margin="normal" required fullWidth>
          <InputLabel htmlFor="password2">Repeat Password</InputLabel>
          <Input
            id="password2"
            type="password"
            name="password2"
            autoComplete="password2"
            value = {this.state.password2}
            onChange = {this.handleChange} />
          <FormHelperText id="component-error-text">{errors.password2}</FormHelperText>
        </FormControl>
          <FormControlLabel
            control={<Checkbox
            value="remember"
            color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign up
          </Button>

        </form>
      </Paper>
    </main>
  );
}
}


Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(
  connect(mapStatetoProps, { registerUser })(withRouter(Register))
);
