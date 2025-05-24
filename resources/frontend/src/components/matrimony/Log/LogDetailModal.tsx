import React from 'react';
import { X, Clock, User, FileText } from 'lucide-react';
import { MatrimonyLogData } from '../../../utilities/types/Matrimony/IMatrimonyLogs';
import { formatLogDate, getActionTypeFromDescription, getActionColor } from '../../../utils/matrimonyLogsUtils';

interface LogDetailModalProps {
    logData: MatrimonyLogData;
    onClose: () => void;
}

const LogDetailModal: React.FC<LogDetailModalProps> = ({ logData, onClose }) => {
    const actionType = getActionTypeFromDescription(logData.description);
    const actionColorClass = getActionColor(logData.description);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <div className="flex items-center justify-between pb-3 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <User size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Profile Information</span>
                        </div>
                        <div className="ml-6">
                            <p className="text-sm text-gray-900 font-medium">{logData.matrimony_display_name}</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">Matrimony ID: {logData.matrimony_id}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FileText size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Action Details</span>
                        </div>
                        <div className="ml-6">
                            <div className="flex items-center mb-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${actionColorClass}`}>{actionType}</span>
                            </div>
                            <p className="text-sm text-gray-900">{logData.description}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Clock size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Timestamp</span>
                        </div>
                        <div className="ml-6">
                            <p className="text-sm text-gray-900">{formatLogDate(logData.created_at)}</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">Log ID: {logData.id}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogDetailModal;
