import React from 'react';
import { Eye, Clock, User, AlertTriangle } from 'lucide-react';
import { MatrimonyLogTableRowProps } from '../../../utilities/types/Matrimony/IMatrimonyLogs';
import { formatLogDate, formatLogDateRelative, getActionTypeFromDescription, getActionColor, getActionIcon, getActionSeverity, extractPackageInfo } from '../../../utils/matrimonyLogsUtils';

const MatrimonyLogTableRow: React.FC<MatrimonyLogTableRowProps> = ({ logData, onViewDetails }) => {
    const actionType = getActionTypeFromDescription(logData.description);
    const actionColorClass = getActionColor(logData.description);
    const actionIcon = getActionIcon(logData.description);
    const severity = getActionSeverity(logData.description);
    const packageInfo = extractPackageInfo(logData.description);

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <User size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{logData.matrimony_display_name}</div>
                        <div className="text-xs text-gray-500 font-mono">ID: {logData.matrimony_id.substring(0, 8)}...</div>
                        {packageInfo.packageNumber && <div className="text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded mt-1 inline-block">Package {packageInfo.packageNumber}</div>}
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-md">
                    <div className="line-clamp-2">{logData.description}</div>
                    {(severity === 'high' || severity === 'critical') && (
                        <div className="flex items-center mt-1">
                            <AlertTriangle size={12} className={`mr-1 ${severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                            <span className={`text-xs font-medium ${severity === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>{severity === 'critical' ? 'Critical' : 'High Priority'}</span>
                        </div>
                    )}
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <span className="mr-2 text-sm">{actionIcon}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${actionColorClass}`}>{actionType}</span>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                    <Clock size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                    <div>
                        <div className="font-medium">{formatLogDate(logData.created_at)}</div>
                        <div className="text-xs text-gray-500">{formatLogDateRelative(logData.created_at)}</div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => onViewDetails(logData)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors duration-150"
                >
                    <Eye size={16} className="mr-1" />
                    View
                </button>
            </td>
        </tr>
    );
};

export default MatrimonyLogTableRow;
