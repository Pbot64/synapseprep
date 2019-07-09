import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import LinkCustom from "../assets/jss/components/LinkCustom";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  avatar: {
    width: "25px",
    height: "25px"
  }
});

class MenuTest extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = e => {
    if (this.anchorEl.contains(e.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.handleClose(e);
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { user } = this.props.auth;

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          buttonRef={node => {
            this.anchorEl = node;
          }}
          className={classes.iconButton}
          color="inherit"
          onClick={this.handleToggle}
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
            alt={user.name}
            title="You must have a gravatar connected to your email to display an image"
          />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <LinkCustom to="/profile">
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </LinkCustom>
                    <MenuItem onClick={this.handleClose}>
                      Get Paid to Rep
                    </MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

MenuTest.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { logoutUser, clearCurrentProfile }
  )(MenuTest)
);
