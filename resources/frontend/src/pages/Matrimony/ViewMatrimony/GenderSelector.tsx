import React from 'react';
import { User } from 'lucide-react';

interface GenderSelectorProps {
    selectedGender: string;
    setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ selectedGender, setSelectedGender }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">I'm looking for</h3>
            <div className="flex justify-center space-x-4 mb-6">
                <div className="flex flex-col items-center">
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${selectedGender === 'Male' ? 'border-blue-500 bg-blue-100' : 'border-white bg-gray-100'} shadow-md cursor-pointer`}
                        onClick={() => setSelectedGender('Male')}
                    >
                        <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="mt-1 text-sm text-gray-600">Male</span>
                </div>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${selectedGender === 'Female' ? 'border-pink-500 bg-pink-100' : 'border-white bg-gray-100'} shadow-md cursor-pointer`}
                        onClick={() => setSelectedGender('Female')}
                    >
                        <User className="h-8 w-8 text-pink-600" />
                    </div>
                    <span className="mt-1 text-sm text-gray-600">Female</span>
                </div>
            </div>
        </div>
    );
};

export default GenderSelector;
