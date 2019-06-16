/* eslint-disable no-console */
import React, { Component } from 'react';
import SideMenuDrill from './SideMenuDrill/index.js';
import SideMenu from './SideMenu/index.js';
import Heading from 'wix-style-react/Heading';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Button from 'wix-style-react/Button';

const styles = theme => ({
  mobileOpen: {
    display: 'flex',
    width: 200,
    height: '100%',
    '&:focus': {
      outlineStyle: 'none'
    }
  },
  mobileClosed: {
    width: 0
  },
  desktopMenu: {
    display: 'flex',
    height: '100%',
    marginTop: '50px',
    position: 'fixed',
    left: '-200px',
    '&:focus': {
      outlineStyle: 'none'
    },
    [theme.breakpoints.up('lg')]: {
      transition: 'left .3s',
      width: '200px',
      left: '0px'
    }
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '200px'
    }
  }
});

const duration = 500;
const counter = 3;

const initialItems = [
  {
    type: 'link',
    to: '/dashboard',
    title: 'Dashboard'
  },
  {
    type: 'menu',
    title: 'Lessons',
    items: [
      {
        type: 'menu',
        title: 'Intro',
        items: [
          { type: 'link', to: '/intro', title: 'Welcome!' },
          { type: 'link', to: '/intro:1', title: 'What is the SAT?' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_3' }
        ]
      },
      {
        type: 'menu',
        title: 'Reading',
        items: [
          { type: 'link', to: '//wix.com', title: 'link #2-3_1' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_2' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_3' }
        ]
      },
      {
        type: 'menu',
        title: 'Writing',
        items: [
          { type: 'link', to: '//wix.com', title: 'link #2-3_1' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_2' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_3' }
        ]
      },
      {
        type: 'menu',
        title: 'Math',
        items: [
          { type: 'link', to: '//wix.com', title: 'link #2-3_1' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_2' },
          { type: 'link', to: '//wix.com', title: 'link #2-3_3' }
        ]
      },
      { type: 'link', to: '//wix.com', title: 'Essay' }
    ]
  },
  {
    type: 'menu',
    title: 'Review',
    items: [
      { type: 'link', to: '//wix.com', title: 'link #3_1' },
      { type: 'link', to: '//wix.com', title: 'link #3_2' },
      { type: 'link', to: '//wix.com', title: 'link #3_3' }
    ]
  },
  {
    type: 'menu',
    title: 'Full Tests',
    items: [
      { type: 'link', to: '//wix.com', title: 'link #3_1' },
      { type: 'link', to: '//wix.com', title: 'link #3_2' },
      { type: 'link', to: '//wix.com', title: 'link #3_3' }
    ]
  },
  {
    type: 'menu',
    title: 'Settings',
    items: [
      { type: 'link', to: '//wix.com', title: 'link #4_1' },
      { type: 'link', to: '//wix.com', title: 'link #4_2' },
      { type: 'link', to: '//wix.com', title: 'link #4_3' }
    ]
  },
  {
    type: 'link',
    to: '/support',
    title: 'Support'
  }
];

class SideMenuCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: initialItems,
      open: false,
      itemSelected: null
    };
  }

  selectMenu(items, link) {
    items.forEach(item => {
      item.isActive = item === link;
      if (item.items) {
        this.selectMenu(item.items, link);
      }
    });
  }

  onMenuSelected(link) {
    const items = [...this.state.items];
    this.selectMenu(items, link);
    this.setState({ items: items });
  }

  renderLink(link) {
    return (
      <SideMenuDrill.Link isActive={link.isActive} key={link.title}>
        <Link to={link.to} onClick={() => this.onMenuSelected(link)}>
          {link.title}
        </Link>
      </SideMenuDrill.Link>
    );
  }

  renderMenu(menu) {
    return (
      <SideMenuDrill.SubMenu
        key={menu.title}
        menuKey={menu.title}
        title={menu.title}
        disabled={menu.disabled}
      >
        <SideMenuDrill.Navigation>{this.renderNavigation(menu.items)}</SideMenuDrill.Navigation>
      </SideMenuDrill.SubMenu>
    );
  }

  renderNavigation(items) {
    return items.map(item => {
      if (item.type === 'link') {
        return this.renderLink(item);
      }

      if (item.type === 'menu') {
        return this.renderMenu(item);
      }
      return null;
    });
  }

  renderHeader() {
    const title = 'Synapse Prep';
    return (
      <SideMenu.Header>
        <div
          style={{
            padding: '26px 30px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <div>
            <Heading appearance="H3" light ellipsis>
              {title}
            </Heading>
          </div>
        </div>
      </SideMenu.Header>
    );
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { items } = this.state;
    const { classes } = this.props;

    const mySideMenuDrill = (
      <div className={this.props.mobileOpen ? classes.mobileOpen : classes.mobileClosed}>
        <SideMenuDrill inFlex dataHook="side-menu" onClose={this.props.handleDrawerToggle}>
          {this.renderHeader()}
          <SideMenu.NavigationSeparator />
          {this.renderNavigation(items)}
        </SideMenuDrill>
      </div>
    );
    const slidingSideMenuDrill = (
      <Slide in={this.props.mobileOpen} timeout={duration} direction={'right'}>
        {mySideMenuDrill}
      </Slide>
    );

    return (
      <React.Fragment>
        <Modal open={this.props.mobileOpen} onClose={this.props.handleDrawerToggle}>
          {slidingSideMenuDrill}
        </Modal>
        <div className={classes.container}>
          <div className={classes.desktopMenu}>
            <SideMenuDrill inFlex dataHook="side-menu">
              <SideMenu.NavigationSeparator />

              {this.renderNavigation(items)}
            </SideMenuDrill>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SideMenuCustom.defaultProps = {};

export default withStyles(styles)(SideMenuCustom);
