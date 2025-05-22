import React, { useState, useEffect } from 'react';
import { RefreshCw, ChevronUp, ChevronDown, Shield, CheckCircle, XCircle, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import apiConfig from '../../../utilities/apiConfig';

// Types for NIC data
interface NicData {
    first_name: string;
    last_name: string;
    email: string;
    nic_number: string;
    nic_front_image: string;
    nic_back_image: string;
    is_verified: number; // 0=pending, 1=approved, 2=rejected
    nic_front_image_url: string | null;
    nic_back_image_url: string | null;
    nic_front_image_data: string | null;
    nic_back_image_data: string | null;
    verification_status?: 'not_started' | 'incomplete' | 'pending_verification' | 'verified';
}

interface NicDetailModalProps {
    nicData: NicData;
    onClose: () => void;
    onVerify: (nicNumber: string) => void;
    onUnverify: (nicNumber: string) => void;
    isActionLoading: boolean;
}

// Helper function to get status info
const getStatusInfo = (isVerified: number) => {
    switch (isVerified) {
        case 0:
            return { text: 'PENDING', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
        case 1:
            return { text: 'APPROVED', bgColor: 'bg-green-100', textColor: 'text-green-800' };
        case 2:
            return { text: 'REJECTED', bgColor: 'bg-red-100', textColor: 'text-red-800' };
        default:
            return { text: 'UNKNOWN', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
};
axios.defaults.baseURL = apiConfig.baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for authentication if needed
axios.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add response interceptor for error handling
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

// NIC Detail Modal Component
const NicDetailModal: React.FC<NicDetailModalProps> = ({ nicData, onClose, onVerify, onUnverify, isActionLoading }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <div className="flex items-center">
                            <Shield className="text-blue-600 mr-2" size={24} />
                            <h2 className="text-2xl font-semibold text-gray-800">NIC Verification Details</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                            <XCircle size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* User Information */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">User Information</h3>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium">Name:</span> {nicData.first_name} {nicData.last_name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email:</span> {nicData.email}
                                    </div>
                                    <div>
                                        <span className="font-medium">NIC Number:</span> {nicData.nic_number}
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">Status:</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusInfo(nicData.is_verified).bgColor} ${getStatusInfo(nicData.is_verified).textColor}`}>
                                            {getStatusInfo(nicData.is_verified).text}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Verification Actions</h3>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => onVerify(nicData.nic_number)}
                                        disabled={isActionLoading || nicData.is_verified === 1}
                                        className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                                            nicData.is_verified === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
                                        }`}
                                    >
                                        <CheckCircle size={16} className="mr-2" />
                                        {isActionLoading ? 'Processing...' : 'Approve'}
                                    </button>

                                    <button
                                        onClick={() => onUnverify(nicData.nic_number)}
                                        disabled={isActionLoading || nicData.is_verified === 2}
                                        className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                                            nicData.is_verified === 2 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
                                        }`}
                                    >
                                        <XCircle size={16} className="mr-2" />
                                        {isActionLoading ? 'Processing...' : 'Reject'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* NIC Images */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">NIC Images</h3>

                                {/* Front Image */}
                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Front Image</h4>
                                    {nicData.nic_front_image_url || nicData.nic_front_image_data ? (
                                        <img src={nicData.nic_front_image_url || nicData.nic_front_image_data || ''} alt="NIC Front" className="w-full h-48 object-contain bg-white border rounded" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 border rounded flex items-center justify-center">
                                            <span className="text-gray-500">No front image available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Back Image */}
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Back Image</h4>
                                    {nicData.nic_back_image_url || nicData.nic_back_image_data ? (
                                        <img src={nicData.nic_back_image_url || nicData.nic_back_image_data || ''} alt="NIC Back" className="w-full h-48 object-contain bg-white border rounded" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 border rounded flex items-center justify-center">
                                            <span className="text-gray-500">No back image available</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition duration-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// NIC Table Row Component
const NicTableRow: React.FC<{
    nicData: NicData;
    onViewDetails: (nicData: NicData) => void;
    onVerify: (nicNumber: string) => void;
    onUnverify: (nicNumber: string) => void;
    isActionLoading: boolean;
}> = ({ nicData, onViewDetails, onVerify, onUnverify, isActionLoading }) => {
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
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusInfo(nicData.is_verified).bgColor} ${getStatusInfo(nicData.is_verified).textColor}`}>
                    {getStatusInfo(nicData.is_verified).text}
                </span>
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
                        <button onClick={() => onUnverify(nicData.nic_number)} disabled={isActionLoading} className="text-red-600 hover:text-red-900 flex items-center disabled:opacity-50">
                            <XCircle size={16} className="mr-1" />
                            Reject
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

// Main NIC Verification Table Component
const NicVerificationTable: React.FC = () => {
    const [nicData, setNicData] = useState<NicData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNic, setSelectedNic] = useState<NicData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const ITEMS_PER_PAGE = 10;

    // Fetch NIC data using axios and API config
    const fetchNicData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(apiConfig.endpoints.nic.list);
            console.log('API Response:', response.data); // Debug log
            setNicData(response.data.data || response.data || []);
        } catch (error) {
            console.error('Error fetching NIC data:', error);
            toast.error('Failed to fetch NIC data');
        } finally {
            setIsLoading(false);
        }
    };

    // Verify NIC using axios and API config
    const handleVerify = async (nicNumber: string) => {
        setIsActionLoading(true);
        try {
            const response = await axios.post(apiConfig.endpoints.nic.verify(nicNumber));

            if (response.status === 200) {
                toast.success('NIC approved successfully');
                fetchNicData(); // Refresh data
                if (selectedNic && selectedNic.nic_number === nicNumber) {
                    setSelectedNic({ ...selectedNic, is_verified: 1 });
                }
            }
        } catch (error) {
            console.error('Error verifying NIC:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Failed to verify NIC';
                toast.error(errorMessage);
            } else {
                toast.error('Failed to verify NIC');
            }
        } finally {
            setIsActionLoading(false);
        }
    };

    // Unverify NIC using axios and API config
    const handleUnverify = async (nicNumber: string) => {
        setIsActionLoading(true);
        try {
            const response = await axios.post(apiConfig.endpoints.nic.reject(nicNumber));

            if (response.status === 200) {
                toast.success('NIC rejected successfully');
                fetchNicData(); // Refresh data
                if (selectedNic && selectedNic.nic_number === nicNumber) {
                    setSelectedNic({ ...selectedNic, is_verified: 2 });
                }
            }
        } catch (error) {
            console.error('Error unverifying NIC:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Failed to unverify NIC';
                toast.error(errorMessage);
            } else {
                toast.error('Failed to unverify NIC');
            }
        } finally {
            setIsActionLoading(false);
        }
    };

    // View NIC details
    const handleViewDetails = (nic: NicData) => {
        setSelectedNic(nic);
        setShowModal(true);
    };

    // Filter data
    const filteredNicData = nicData.filter((nic) => {
        const matchesSearch =
            searchFilter === '' ||
            nic.first_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            nic.last_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            nic.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
            nic.nic_number.toLowerCase().includes(searchFilter.toLowerCase());

        const matchesStatus = statusFilter === 'all' || nic.is_verified.toString() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredNicData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNicData.length / ITEMS_PER_PAGE);

    useEffect(() => {
        fetchNicData();
    }, []);

    return (
        <div className="container mx-auto font-sans">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0 flex items-center">
                            <Shield className="mr-2 text-blue-600" size={28} />
                            NIC Verification Management
                        </h1>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={fetchNicData}
                                className="flex items-center text-sm px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-blue-600' : 'text-gray-600'}`} />
                                Refresh
                            </button>

                            <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                                {filteredNicData.length} {filteredNicData.length === 1 ? 'record' : 'records'} found
                            </span>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by name, email, or NIC number..."
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="0">Pending</option>
                                <option value="1">Approved</option>
                                <option value="2">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <RefreshCw className="animate-spin text-blue-600" size={24} />
                        <span className="ml-2 text-gray-600">Loading NIC data...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((nic, index) => (
                                    <NicTableRow
                                        key={`${nic.nic_number}-${index}`}
                                        nicData={nic}
                                        onViewDetails={handleViewDetails}
                                        onVerify={handleVerify}
                                        onUnverify={handleUnverify}
                                        isActionLoading={isActionLoading}
                                    />
                                ))}

                                {currentItems.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No NIC records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Simple Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2 text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {showModal && selectedNic && (
                <NicDetailModal nicData={selectedNic} onClose={() => setShowModal(false)} onVerify={handleVerify} onUnverify={handleUnverify} isActionLoading={isActionLoading} />
            )}
        </div>
    );
};

export default NicVerificationTable;
