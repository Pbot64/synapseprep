// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import LinkCustom from '../assets/jss/components/LinkCustom';

import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  Avatar,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    width: '25px',
    height: '25px'
  },
  icon: {
    marginRight: '0px'
  }
});

class MenuCustom extends React.Component {
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

  render() {
    const { classes, menuItems, user } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          buttonRef={node => {
            this.anchorEl = node;
          }}
          className={classes.iconButton}
          color='inherit'
          onClick={this.handleToggle}
        >
          {user && (
            <Avatar
              className={classes.avatar}
              src={user.avatar}
              alt={user.name}
              title='You must have a gravatar connected to your email to display an image'
            />
          )}
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='menu-list-grow'
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    {menuItems.map(menuItem =>
                      menuItem.to ? (
                        <LinkCustom key={menuItem.name} to={menuItem.to}>
                          <MenuItem
                            onClick={e => {
                              this.handleClose(e);
                            }}
                          >
                            <ListItemIcon classes={{ root: classes.icon }}>
                              {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              classes={{ primary: classes.primary }}
                              primary={menuItem.name}
                            />
                          </MenuItem>
                        </LinkCustom>
                      ) : (
                        <MenuItem
                          key={menuItem.name}
                          onClick={menuItem.eventHandler ? menuItem.eventHandler : () => null}
                        >
                          <ListItemIcon classes={{ root: classes.icon }}>
                            {menuItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.primary }}
                            primary={menuItem.name}
                          />
                        </MenuItem>
                      )
                    )}
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

MenuCustom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuCustom);
