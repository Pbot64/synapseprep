import SideMenu from './core/SideMenu';

import Header from './core/Header';
import Navigation from './core/navigation';
import NavigationLink from './core/navigation/Link';
import NavigationLinkLayout from './core/navigation/LinkLayout';
import NavigationBackLink from './core/navigation/BackLink';
import NavigationSeparator from './core/navigation/Separator';
import NavigationCategory from './core/navigation/Category';
import NavigationBadge from './core/navigation/Badge';
import Promotion from './core/Promotion';
import Footer from './core/footer';
import FooterLink from './core/footer/Link';


SideMenu.Logo = Header;
SideMenu.Header = Header;
SideMenu.Navigation = Navigation;
SideMenu.NavigationLink = NavigationLink;
SideMenu.NavigationLinkLayout = NavigationLinkLayout;
SideMenu.NavigationBackLink = NavigationBackLink;
SideMenu.NavigationSeparator = NavigationSeparator;
SideMenu.NavigationCategory = NavigationCategory;
SideMenu.NavigationBadge = NavigationBadge;
SideMenu.Promotion = Promotion;
SideMenu.Footer = Footer;
SideMenu.FooterLink = FooterLink;


export default SideMenu;
