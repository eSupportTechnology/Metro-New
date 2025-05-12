import React from 'react';
import { Package } from 'lucide-react';
import { packageDetails } from '../../../constants/matrimony/matrimonyConstants';

interface PackageBadgeProps {
    packageNumber: number;
}

const PackageBadge: React.FC<PackageBadgeProps> = ({ packageNumber = 1 }) => {
    const packageInfo = packageDetails[packageNumber as keyof typeof packageDetails] || packageDetails[1];

    return (
        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${packageInfo.color}`}>
            <Package size={12} className="mr-1" />
            {packageInfo.name}
        </div>
    );
};

export default PackageBadge;
