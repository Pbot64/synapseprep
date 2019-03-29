import SideMenuDrill from './DrillView';
import Link from './Link';
import SubMenu from './SubMenu';
import Navigation from '../core/navigation';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})

SideMenuDrill.Link = Link;
SideMenuDrill.SubMenu = SubMenu;
SideMenuDrill.Navigation = Navigation;

export default withStyles(styles)(SideMenuDrill);

