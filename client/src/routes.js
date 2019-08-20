import React from 'react';

import IndexPage from 'pages/Index';
import ProfilePage from 'pages/Profile';

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <IndexPage />
    },
    {
        path: '/profile',
        component: () => <ProfilePage />,
        isPrivate: true
    }
];

export default routes;
