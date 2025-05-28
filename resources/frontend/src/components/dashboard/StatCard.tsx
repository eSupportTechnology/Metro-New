import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    iconColor: string;
    borderColor: string;
    trend?: 'up' | 'down' | 'neutral';
    loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, iconColor, borderColor, trend, loading = false }) => {
    if (loading) {
        return (
            <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderColor} animate-pulse`}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const getTrendColor = () => {
        switch (trend) {
            case 'up':
                return 'text-green-600';
            case 'down':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderColor} hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                    {subtitle && <p className={`text-sm mt-1 ${getTrendColor()}`}>{subtitle}</p>}
                </div>
                <Icon className={iconColor} size={48} />
            </div>
        </div>
    );
};
