import React from 'react';

interface StatusFilterProps {
    statusFilter: string;
    onStatusChange: (value: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, onStatusChange }) => {
    return (
        <div className="w-full md:w-48">
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
                <option value="all">All Status</option>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Rejected</option>
            </select>
        </div>
    );
};

export default StatusFilter;
