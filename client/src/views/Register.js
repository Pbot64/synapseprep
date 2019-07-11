// Node Modules
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import { registerUser } from "../actions/authActions";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardCustom from "../assets/jss/components/CardCustom";
import TextField from "@material-ui/core/TextField";

// Local Components
import LinkCustom from "../assets/jss/components/LinkCustom";
import ButtonCustom from "../assets/jss/components/ButtonCustom";

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    display: "block", // Fix IE 11 issue.
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 400
  },
  paper: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 5
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    border: "none",
    color: "#FFFFFF",
    ...theme.palette.blueToGreen
  },
  link: {
    textDecoration: "underline",
    color: "#2980ba"
  },
  checkbox: {
    marginTop: "15px"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      <div className={classes.root}>
        <CardCustom className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={this.handleSubmit}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  value={this.state.name || ""}
                  onChange={this.handleChange}
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  value={this.state.email || ""}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  value={this.state.password || ""}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(errors.password2)}
                  helperText={errors.password2}
                  value={this.state.password2 || ""}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                  id="password2"
                  type="password"
                  label="Repeat Password"
                  name="password2"
                />
                <Grid item xs={12} className={classes.checkbox}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Send me tips, updates, freebies, and offers."
                  />
                </Grid>
              </Grid>
            </Grid>
            <ButtonCustom type="submit" fullWidth className={classes.submit}>
              Sign Up
            </ButtonCustom>
            <Grid container justify="flex-end">
              <Grid item>
                <LinkCustom to="/login">
                  <Typography
                    className={classes.link}
                    component="p"
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Typography>
                </LinkCustom>
              </Grid>
            </Grid>
          </form>
        </CardCustom>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
    { registerUser }
  )(withRouter(Register))
);
