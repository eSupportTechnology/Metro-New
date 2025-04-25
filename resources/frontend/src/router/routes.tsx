import { lazy } from 'react';
import Home from '../pages/MainWeb/Home';
import SignIn from '../pages/MainWeb/Auth/SignIn';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    {
        path: '/',
        element: <Home />,
        layout: 'blank',
    },
    {
        path: '/signin',
        element: <SignIn />,
        layout: 'blank',
    },
    {
        path: '/admin',
        element: <Index />,
        layout: 'default',
    },
];

export { routes };
