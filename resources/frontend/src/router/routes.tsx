import { lazy } from 'react';
import Home from '../pages/MainWeb/Home';
import SignIn from '../pages/MainWeb/Auth/SignIn';
import MatrimonyCreate from '../pages/Matrimony/MatrimonyCreate';
import SearchResults from '../pages/Matrimony/SearchResults';
import ProfileDetailsPage from '../pages/Matrimony/ProfileDetailsPage';
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
        path: '/view-add',
        element: <SearchResults />,
        layout: 'blank',
    },
    {
        path: '/profile/:profileId',
        element: <ProfileDetailsPage />,
        layout: 'blank',
    },
    {
        path: '/admin',
        element: <Index />,
        layout: 'default',
    },
];

export { routes };
