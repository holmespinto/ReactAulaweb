// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// actions
import { showRightSidebar } from '../redux/actions';

// components
import LanguageDropdown from '../components/LanguageDropdown';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';
import SearchDropdown from '../components/SearchDropdown';
import TopbarSearch from '../components/TopbarSearch';
import AppsDropdown from '../components/AppsDropdown/';

import profilePic from '../assets/images/users/avatar-1.jpg';
import logoSmDark from '../assets/images/logo_sm_dark.png';
import logoSmLight from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';

//constants
import * as layoutConstants from '../constants/layout';

// get the notifications
const Notifications = [
    {
        id: 1,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 2,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 4,
        text: 'Caleb Flakelar commented on Admin',
        subText: '4 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
    {
        id: 5,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 7,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'info',
    },
];

// get the profilemenu
const ProfileMenus = [
    {
        label: 'Mi cuenta',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/',
    },
    {
        label: 'Configuración',
        icon: 'mdi mdi-account-edit',
        redirectTo: '/',
    },
    {
        label: 'Soporte',
        icon: 'mdi mdi-lifebuoy',
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: 'mdi mdi-lock-outline',
        // redirectTo: '/account/lock-screen',
    },
    {
        label: 'Salir de la Plataforma',
        icon: 'mdi mdi-logout',
        redirectTo: '/account/logout',
    },
];
// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '/',
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '/',
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '/',
    },
];
type TopbarProps = {
    hideLogo?: boolean,
    navCssClasses?: string,
    openLeftMenuCallBack?: () => void,
    topbarDark?: boolean,
    username?: string,
};

const Topbar = ({
    hideLogo,
    navCssClasses,
    openLeftMenuCallBack,
    topbarDark,
    username,
}: TopbarProps): React$Element<any> => {
    const dispatch = useDispatch();
    const [isopen, setIsopen] = useState(false);
    const [nombres, setNombre] = useState(null);
    const [Role, setRole] = useState(null);

    const { nombre, roles, loadasig } = useSelector((state) => ({
        user: state.Auth.user,
        userLoggedIn: state.Auth.userLoggedIn,
        error: state.Auth.error,
        loadasig: state.Auth.loading,
        id_pernatural: state.Auth.user.id_persona,
        nombre: state.Auth.user.Nombre,
        roles: state.Auth.user.role,
    }));

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    const { layoutType } = useSelector((state) => ({
        layoutType: state.Layout.layoutType,
    }));

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen((prevState) => !prevState);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    useEffect(() => {
        if (!loadasig && roles) {
            setNombre(nombre);
            setRole(roles);
        }
    }, [roles, nombre, loadasig]);

    return (
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={logo} alt="logo" height="16" />
                            </span>
                            <span className="topnav-logo-sm">
                                <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="16" />
                            </span>
                        </Link>
                    )}

                    <ul className="list-unstyled topbar-menu float-end mb-0">
                        <li className="notification-list topbar-dropdown d-xl-none">
                            <SearchDropdown />
                        </li>
                        <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                            <LanguageDropdown />
                        </li>
                        <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li>
                        <li className="dropdown notification-list d-none d-sm-inline-block">
                            <AppsDropdown />
                        </li>
                        <li className="notification-list">
                            <button
                                className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleRightSideBar}>
                                <i className="dripicons-gear noti-icon"></i>
                            </button>
                        </li>
                        <li className="dropdown notification-list">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={nombres}
                                userTitle={Role}
                            />
                        </li>
                    </ul>
                    {/* toggle for vertical layout */}
                    {layoutType === layoutConstants.LAYOUT_VERTICAL && (
                        <button className="button-menu-mobile open-left disable-btn" onClick={handleLeftMenuCallBack}>
                            <i className="mdi mdi-menu" />
                        </button>
                    )}

                    {/* toggle for horizontal layout */}
                    {layoutType === layoutConstants.LAYOUT_HORIZONTAL && (
                        <Link
                            to="#"
                            className={classNames('navbar-toggle', { open: isopen })}
                            onClick={handleLeftMenuCallBack}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    )}

                    {/* toggle for detached layout */}
                    {layoutType === layoutConstants.LAYOUT_DETACHED && (
                        <Link to="#" className="button-menu-mobile disable-btn" onClick={handleLeftMenuCallBack}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    )}
                    <TopbarSearch items={SearchResults} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
