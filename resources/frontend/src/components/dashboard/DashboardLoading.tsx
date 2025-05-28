import React from 'react';
import { RefreshCw } from 'lucide-react';

export const DashboardLoading: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center">
                    <RefreshCw className="animate-spin text-yellow-600 mb-4" size={48} />
                    <p className="text-gray-600 text-lg">Loading dashboard data...</p>
                    <div className="mt-4 flex space-x-2">
                        <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
