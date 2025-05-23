import React from 'react';
import { Loader, RefreshCw } from 'lucide-react';

const LoadingState: React.FC = () => {
    return (
        <div className="flex justify-center items-center p-12">
            <div className="flex flex-col items-center">
                <Loader className="animate-spin text-yellow-500 h-8 w-8 mb-3" />
                <span className="text-gray-600">Loading NIC data...</span>
            </div>
        </div>
    );
};

export default LoadingState;
