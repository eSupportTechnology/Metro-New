import React from 'react';
import { Filter } from 'lucide-react';

interface ActionFilterProps {
    actionFilter: string;
    onActionChange: (value: string) => void;
}

const ActionFilter: React.FC<ActionFilterProps> = ({ actionFilter, onActionChange }) => {
    const actionOptions = [
        { value: 'all', label: 'All Actions' },
        { value: 'Profile Boosted', label: '🚀 Profile Boosted' },
        { value: 'Auto Deactivation', label: '❌ Auto Deactivation' },
    ];

    return (
        <div className="w-full md:w-56">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                    value={actionFilter}
                    onChange={(e) => onActionChange(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm bg-white"
                >
                    {actionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ActionFilter;
