import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));
// dashboard
const AulawebDashboard = React.lazy(() => import('../pages/dashboard/Aulaweb'));

const ServerError = React.lazy(() => import('../pages/error/ServerError'));
// - other
const Landing = React.lazy(() => import('../pages/landing/'));
// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/Aulaweb" />,
    route: PrivateRoute,
};
// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/aulaweb',
            name: 'Aulaweb',
            badge: {
                variant: 'success',
                text: '1',
            },
            component: AulawebDashboard,
            route: PrivateRoute,
        },
    ],
};

const otherPublicRoutes = [
    {
        path: '/landing',
        name: 'landing',
        component: Landing,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: ServerError,
        route: Route,
    },
    {
        path: '/account/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
];

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
