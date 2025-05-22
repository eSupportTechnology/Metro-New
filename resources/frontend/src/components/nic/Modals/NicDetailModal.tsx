import React from 'react';
import { Shield, CheckCircle, XCircle, X, User, CreditCard, ImageIcon } from 'lucide-react';
import { NicDetailModalProps } from '../../../utilities/types/NIC/INicVerification';
import { getStatusInfo } from '../../../utils/nicUtils';

const NicDetailModal: React.FC<NicDetailModalProps> = ({ nicData, onClose, onVerify, onReject, isActionLoading }) => {
    const statusInfo = getStatusInfo(nicData.is_verified);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-screen overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <div className="flex items-center">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">NIC Verification Details</h2>
                                <p className="text-sm text-gray-600 mt-1">Review and verify identity documents</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg border">
                                <div className="flex items-center mb-4">
                                    <User className="text-gray-600 mr-2" size={20} />
                                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-700">Full Name:</span>
                                        <span className="text-gray-900">
                                            {nicData.first_name} {nicData.last_name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-700">Email:</span>
                                        <span className="text-gray-900">{nicData.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-700">NIC Number:</span>
                                        <span className="text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">{nicData.nic_number}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="font-medium text-gray-700">Verification Status:</span>
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>{statusInfo.text}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                <div className="flex items-center mb-4">
                                    <Shield className="text-blue-600 mr-2" size={20} />
                                    <h3 className="text-lg font-semibold text-gray-800">Verification Actions</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">Review the NIC images carefully before making a decision. Ensure all details match and images are clear.</p>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => onVerify(nicData.nic_number)}
                                        disabled={isActionLoading || nicData.is_verified === 1}
                                        className={`flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                                            nicData.is_verified === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        <CheckCircle size={18} className="mr-2" />
                                        {isActionLoading ? 'Processing...' : 'Approve NIC'}
                                    </button>

                                    <button
                                        onClick={() => onReject(nicData.nic_number)}
                                        disabled={isActionLoading || nicData.is_verified === 2}
                                        className={`flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                                            nicData.is_verified === 2 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        <XCircle size={18} className="mr-2" />
                                        {isActionLoading ? 'Processing...' : 'Reject NIC'}
                                    </button>
                                </div>

                                {nicData.is_verified === 1 && (
                                    <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-md">
                                        <div className="flex items-center">
                                            <CheckCircle className="text-green-600 mr-2" size={16} />
                                            <span className="text-sm font-medium text-green-800">This NIC has been approved and verified.</span>
                                        </div>
                                    </div>
                                )}

                                {nicData.is_verified === 2 && (
                                    <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-md">
                                        <div className="flex items-center">
                                            <XCircle className="text-red-600 mr-2" size={16} />
                                            <span className="text-sm font-medium text-red-800">This NIC has been rejected during verification.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg border">
                                <div className="flex items-center mb-4">
                                    <ImageIcon className="text-gray-600 mr-2" size={20} />
                                    <h3 className="text-lg font-semibold text-gray-800">NIC Document Images</h3>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                        <CreditCard className="mr-2" size={16} />
                                        Front Side
                                    </h4>
                                    {nicData.nic_front_image_url || nicData.nic_front_image_data ? (
                                        <div className="relative group">
                                            <img
                                                src={nicData.nic_front_image_url || nicData.nic_front_image_data || ''}
                                                alt="NIC Front"
                                                className="w-full h-56 object-contain bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                onClick={() => {
                                                    window.open(nicData.nic_front_image_url || nicData.nic_front_image_data || '', '_blank');
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                                                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to view full size</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-56 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                                                <span className="text-gray-500 font-medium">No front image available</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                        <CreditCard className="mr-2" size={16} />
                                        Back Side
                                    </h4>
                                    {nicData.nic_back_image_url || nicData.nic_back_image_data ? (
                                        <div className="relative group">
                                            <img
                                                src={nicData.nic_back_image_url || nicData.nic_back_image_data || ''}
                                                alt="NIC Back"
                                                className="w-full h-56 object-contain bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                onClick={() => {
                                                    window.open(nicData.nic_back_image_url || nicData.nic_back_image_data || '', '_blank');
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                                                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to view full size</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-56 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                                                <span className="text-gray-500 font-medium">No back image available</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-md transition duration-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NicDetailModal;
