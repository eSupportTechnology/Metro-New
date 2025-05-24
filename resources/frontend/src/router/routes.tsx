import { lazy } from 'react';
import { useSelector } from 'react-redux';
import Home from '../pages/MainWeb/Home';
import SignIn from '../pages/MainWeb/Auth/SignIn';
import MatrimonyCreate from '../pages/Matrimony/MatrimonyCreate';
import SearchResults from '../pages/Matrimony/SearchResults';
import ProfileDetailsPage from '../pages/Matrimony/ProfileDetailsPage';
import { IRootState } from '../store';
import PrivateRoute from './PrivateRoute';
import MatrimonyProfilesTable from '../pages/AdminWeb/Matrimony/MatrimonyProfilesTable';
import Blog from '../pages/AdminWeb/blog/Blog';
import BlogPage from '../pages/MainWeb/Blog/BlogPage';
import BlogDetailPage from '../pages/MainWeb/Blog/BlogDetailPage';
import ProfilePage from '../pages/MainWeb/Profile/ProfilePage';
import ContactUs from '../pages/MainWeb/Component/ContactUs';
import AboutUs from '../pages/MainWeb/Component/AboutUs';
import Help from '../pages/MainWeb/Component/Help';
import PricingPage from '../pages/MainWeb/Component/PricingPage';
import NicVerificationTable from '../pages/AdminWeb/NIC/NicVerificationTable';
import MatrimonyLogsTable from '../pages/AdminWeb/Matrimony/MatrimonyLogsTable';
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
        path: '/blog',
        element: <BlogPage />,
        layout: 'blank',
    },
    {
        path: '/contact',
        element: <ContactUs />,
        layout: 'blank',
    },
    {
        path: '/about-us',
        element: <AboutUs />,
        layout: 'blank',
    },
    {
        path: '/help',
        element: <Help />,
        layout: 'blank',
    },
    {
        path: '/pricing',
        element: <PricingPage />,
        layout: 'blank',
    },
    {
        path: '/blog/detail/:id',
        element: <BlogDetailPage />,
        layout: 'blank',
    },
    {
        path: '/my-profile/:userId',
        element: <PrivateRoute requiredRole={2} redirectPath="/signin" component={ProfilePage} />,
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
        path: '/admin/profiles',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={MatrimonyProfilesTable} />,
        layout: 'default',
    },
    {
        path: '/admin/nic-verification',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={NicVerificationTable} />,
        layout: 'default',
    },
    {
        path: '/admin/matrimony-logs',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={MatrimonyLogsTable} />,
        layout: 'default',
    },
    {
        path: '/admin/all-blog',
        element: <PrivateRoute requiredRole={1} redirectPath="/signin" component={Blog} />,
        layout: 'default',
    },
];

export { routes };
