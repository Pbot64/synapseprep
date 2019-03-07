// Node Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Local Components
import SideMenuDrill from 'wix-style-react/SideMenuDrill';
import SideMenu from 'wix-style-react/SideMenu';
// Material UI Components

// Local Assets

//  Style Overrides (to this component only)
const styles = theme => ({
    main: {
      width: 200,
      height: 1000,
      color: '#ff0000',
    },
});

const MenuTest = (props) => {

    const { classes } = props;
  return (
    <div className = {classes.main}>
      <SideMenuDrill >
  <SideMenu.Header >
    <h2>My Application</h2>
  </SideMenu.Header>
  <SideMenuDrill.Link><a>Link #1</a></SideMenuDrill.Link>
  <SideMenuDrill.Link><a href="/dashboard">Link #2</a></SideMenuDrill.Link>
  <SideMenuDrill.SubMenu menuKey="SUB_MENU_1" title="Sub Menu #1">
    <SideMenu.Header>
      <h2>My Internal Application</h2>
    </SideMenu.Header>
    <SideMenuDrill.Navigation>
      <SideMenuDrill.Link><a>Link #3</a></SideMenuDrill.Link>
      <SideMenuDrill.Link><a href="//wix.com">Link #4</a></SideMenuDrill.Link>
    </SideMenuDrill.Navigation>
  </SideMenuDrill.SubMenu>
  <SideMenuDrill.SubMenu menuKey="SUB_MENU_2" title="Sub Menu #2">
    <SideMenuDrill.Navigation>
      <SideMenuDrill.Link><a>Link #5</a></SideMenuDrill.Link>
      <SideMenuDrill.Link><a href="//wix.com">Link #6</a></SideMenuDrill.Link>
      <SideMenuDrill.SubMenu menuKey="SUB_MENU_3" title="Sub Menu #3">
        <SideMenuDrill.Navigation>
          <SideMenuDrill.Link><a>Link #7</a></SideMenuDrill.Link>
          <SideMenuDrill.Link><a href="//wix.com">Link #8</a></SideMenuDrill.Link>
        </SideMenuDrill.Navigation>
      </SideMenuDrill.SubMenu>
    </SideMenuDrill.Navigation>
  </SideMenuDrill.SubMenu>
</SideMenuDrill>
    </div>
  )
}

export default withStyles(styles)(MenuTest);