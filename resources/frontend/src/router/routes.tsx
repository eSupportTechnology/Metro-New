import { lazy } from 'react';
import Home from '../pages/MainWeb/Home';
import SignIn from '../pages/MainWeb/Auth/SignIn';
import MatrimonyRegistration from '../pages/Matrimony/MatrimonyRegistration';
import MatrimonyCreate from '../pages/Matrimony/MatrimonyCreate';
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
        path: '/create-add',
        element: <MatrimonyCreate />,
        layout: 'blank',
    },
    {
        path: '/admin',
        element: <Index />,
        layout: 'default',
    },
];

export { routes };
