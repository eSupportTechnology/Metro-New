import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
    title: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    loading?: boolean;
    className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, icon: Icon, children, loading = false, className = '' }) => {
    if (loading) {
        return (
            <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
                <div className="flex items-center mb-4">
                    {Icon && <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>}
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-[300px] bg-gray-100 rounded animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                {Icon && <Icon className="mr-2 text-yellow-600" size={20} />}
                {title}
            </h3>
            {children}
        </div>
    );
};
