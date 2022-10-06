import BoxLogin from 'component/Form/BoxLogin/BoxLogin';

export const publicRoutes = [
    {
        path: '/',
        component: BoxLogin,
        login: true,
    },
    {
        path: '/register',
        component: BoxLogin,
        login: false,
    },
];

export const priviteRoute = [];
