import SideMenuDrill from './index';
import React, { Children } from 'react';
import Navigation from '../core/navigation';
import PropTypes from 'prop-types';
import NavigationLink from '../core/navigation/Link';
import NavigationBackLink from '../core/navigation/BackLink';
import NavigationCategory from '../core/navigation/Category';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  subMenu: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  openSubMenu: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

const SubMenu = ({
  children,
  title,
  isOpen,
  isActive,
  onSelectHandler,
  onBackHandler,
  backLabel,
  showCategory,
  badge,
  linkDataHook,
  disabled,
  classes
}) => {
  if (!isOpen) {
    return (
      <NavigationLink
        isActive={isActive}
        onClick={onSelectHandler}
        badge={badge}
        withArrow={!badge}
        data-hook={linkDataHook}
        disabled={disabled}
      >
        {title}
      </NavigationLink>
    );
  }

  const wrappedNavigation = Children.map(children, child => {
    if (child.type === SideMenuDrill.Navigation) {
      return (
        <div className={classes.openSubMenu}>
          <NavigationBackLink onBackHandler={onBackHandler}>
            {backLabel}
          </NavigationBackLink>
          {showCategory && <NavigationCategory>{title}</NavigationCategory>}
          <Navigation>{child.props.children}</Navigation>
        </div>
      );
    }

    return child;
  });

  return (
    <div className={classes.subMenu} data-hook="menu-drill-sub-menu">
      {wrappedNavigation}
    </div>
  );
};

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false,
  onSelectHandler: () => {},
  onBackHandler: () => {},
  backLabel: 'Back',
  showCategory: true,
  linkDataHook: 'menu-drill-sub-menu-link',
  disabled: false,
};

SubMenu.propTypes = {
  menuKey: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  isOpen: PropTypes.bool,
  onSelectHandler: PropTypes.func,
  onBackHandler: PropTypes.func,
  backLabel: PropTypes.node,
  showCategory: PropTypes.bool,
  badge: PropTypes.node,
  linkDataHook: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(SubMenu);
