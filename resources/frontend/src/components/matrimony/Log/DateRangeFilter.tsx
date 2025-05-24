import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
    dateFromFilter: string;
    dateToFilter: string;
    onDateFromChange: (value: string) => void;
    onDateToChange: (value: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ dateFromFilter, dateToFilter, onDateFromChange, onDateToChange }) => {
    const getTodayDateString = (): string => {
        return new Date().toISOString().split('T')[0];
    };

    const getDateString = (daysAgo: number): string => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    };

    const handleQuickFilter = (type: 'today' | 'week' | 'month') => {
        const today = getTodayDateString();

        switch (type) {
            case 'today':
                onDateFromChange(today);
                onDateToChange(today);
                break;
            case 'week':
                onDateFromChange(getDateString(7));
                onDateToChange(today);
                break;
            case 'month':
                onDateFromChange(getDateString(30));
                onDateToChange(today);
                break;
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full md:w-auto">
            {/* Date Range Inputs */}
            <div className="flex flex-col md:flex-row gap-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="date"
                        placeholder="From Date"
                        value={dateFromFilter}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        className="pl-10 w-full md:w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                    />
                </div>

                <span className="hidden md:flex items-center text-gray-400 text-sm">to</span>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="date"
                        placeholder="To Date"
                        value={dateToFilter}
                        onChange={(e) => onDateToChange(e.target.value)}
                        className="pl-10 w-full md:w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                <button onClick={() => handleQuickFilter('today')} className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Today
                </button>
                <button onClick={() => handleQuickFilter('week')} className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Last 7 days
                </button>
                <button onClick={() => handleQuickFilter('month')} className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Last 30 days
                </button>
                {(dateFromFilter || dateToFilter) && (
                    <button
                        onClick={() => {
                            onDateFromChange('');
                            onDateToChange('');
                        }}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                        Clear dates
                    </button>
                )}
            </div>
        </div>
    );
};

export default DateRangeFilter;
