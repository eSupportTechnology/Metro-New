import { lazy } from 'react';
import Home from "../pages/MainWeb/Home";
const Index = lazy(() => import('../pages/Index'));

const routes = [
    {
        path: '/',
        element: <Home />,
        layout: 'blank',
    },
    {
        path: '/admin',
        element: <Index />,
        layout: 'default',
    },

];

export { routes };
