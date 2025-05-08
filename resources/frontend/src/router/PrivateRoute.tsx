import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    requiredRole: number;
    redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, requiredRole, redirectPath }) => {
    const auth = useSelector((state: IRootState) => state.auth);

    if (!auth.isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }

    if (auth.userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Component />;
};

export default PrivateRoute;
