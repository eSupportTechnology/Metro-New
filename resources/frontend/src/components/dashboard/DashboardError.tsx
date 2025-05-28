import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface DashboardErrorProps {
    error: string;
    onRetry: () => void;
    isRetrying?: boolean;
}

export const DashboardError: React.FC<DashboardErrorProps> = ({ error, onRetry, isRetrying = false }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-start">
                    <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div className="flex-1">
                        <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={onRetry}
                            disabled={isRetrying}
                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw size={16} className={`mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                            {isRetrying ? 'Retrying...' : 'Try Again'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
