import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'yellow-500', text }) => {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-4',
    };

    return (
        <div className="flex flex-col items-center">
            <div className={`animate-spin ${sizeClasses[size]} border-${color} rounded-full border-t-transparent`}></div>
            {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
    );
};

export default Spinner;
