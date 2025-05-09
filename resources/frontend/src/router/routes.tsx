import { lazy } from 'react';
import { useSelector } from 'react-redux';
import Home from '../pages/MainWeb/Home';
import SignIn from '../pages/MainWeb/Auth/SignIn';
import MatrimonyCreate from '../pages/Matrimony/MatrimonyCreate';
import SearchResults from '../pages/Matrimony/SearchResults';
import ProfileDetailsPage from '../pages/Matrimony/ProfileDetailsPage';
import AllAdd from '../pages/AdminWeb/AllAdd';
import { IRootState } from '../store';
import PrivateRoute from './PrivateRoute';
import MatrimonyProfilesTable from '../pages/AdminWeb/MatrimonyProfilesTable';
const Index = lazy(() => import('../pages/Index'));

const useAuth = () => useSelector((state: IRootState) => state.auth);

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
        element: <PrivateRoute requiredRole={2} redirectPath="/signin" component={MatrimonyCreate} />,
        layout: 'blank',
    },
    {
        path: '/view-add',
        element: <SearchResults />,
        layout: 'blank',
    },
    {
        path: '/profile/:profileId',
        element: <PrivateRoute requiredRole={2} redirectPath="/signin" component={ProfileDetailsPage} />,
        layout: 'blank',
    },
    {
        path: '/admin',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={Index} />,
        layout: 'default',
    },
    {
        path: '/admin/all-add',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={MatrimonyProfilesTable} />,
        layout: 'default',
    },
];

export { routes };
