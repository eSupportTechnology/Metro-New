import React from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { NicTableRowProps } from '../../../utilities/types/NIC/INicVerification';
import { getStatusInfo } from '../../../utils/nicUtils';

const NicTableRow: React.FC<NicTableRowProps> = ({ nicData, onViewDetails, onVerify, onReject, isActionLoading }) => {
    const statusInfo = getStatusInfo(nicData.is_verified);

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {nicData.first_name} {nicData.last_name}
                </div>
                <div className="text-sm text-gray-500">{nicData.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-mono">{nicData.nic_number}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>{statusInfo.text}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                    <button onClick={() => onViewDetails(nicData)} className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Eye size={16} className="mr-1" />
                        View
                    </button>

                    {nicData.is_verified !== 1 ? (
                        <button onClick={() => onVerify(nicData.nic_number)} disabled={isActionLoading} className="text-green-600 hover:text-green-900 flex items-center disabled:opacity-50">
                            <CheckCircle size={16} className="mr-1" />
                            Approve
                        </button>
                    ) : (
                        <span className="text-green-600 flex items-center">
                            <CheckCircle size={16} className="mr-1" />
                            Approved
                        </span>
                    )}

                    {nicData.is_verified !== 2 && (
                        <button onClick={() => onReject(nicData.nic_number)} disabled={isActionLoading} className="text-red-600 hover:text-red-900 flex items-center disabled:opacity-50">
                            <XCircle size={16} className="mr-1" />
                            Reject
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default NicTableRow;
