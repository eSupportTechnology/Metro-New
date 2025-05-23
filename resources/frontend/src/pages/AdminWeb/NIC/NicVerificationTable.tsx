import React, { useState } from 'react';
import { RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NicData } from '../../../utilities/types/NIC/INicVerification';
import { useNicData } from '../../../hooks/nic/useNicData';
import { useNicActions } from '../../../hooks/nic/useNicActions';
import { useNicFilters } from '../../../hooks/nic/useNicFilters';
import { useNicSort } from '../../../hooks/nic/useNicSort';
import { NIC_VERIFICATION_CONSTANTS } from '../../../constants/nic/nicVerificationConstants';
import NicTableRow from '../../../components/nic/Table/NicTableRow';
import LoadingState from '../../../components/nic/Common/LoadingState';
import EmptyState from '../../../components/nic/Common/EmptyState';
import Pagination from '../../../components/nic/Common/Pagination';
import SearchFilter from '../../../components/nic/Filters/SearchFilter';
import StatusFilter from '../../../components/nic/Filters/StatusFilter';
import ActiveFilters from '../../../components/nic/Filters/ActiveFilters';
import NicDetailModal from '../../../components/nic/Modals/NicDetailModal';

const NicVerificationTable: React.FC = () => {
    const [selectedNic, setSelectedNic] = useState<NicData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { nicData, setNicData, isLoading, error, fetchNicData } = useNicData();
    const { isActionLoading, handleVerify, handleReject } = useNicActions(nicData, setNicData, selectedNic, setSelectedNic);
    const { searchFilter, setSearchFilter, statusFilter, setStatusFilter, filteredNicData, clearAllFilters, getActiveFiltersCount } = useNicFilters(nicData);
    const { sortField, sortDirection, handleSort, sortedNicData } = useNicSort(filteredNicData);
    const indexOfLastItem = currentPage * NIC_VERIFICATION_CONSTANTS.ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - NIC_VERIFICATION_CONSTANTS.ITEMS_PER_PAGE;
    const currentItems = sortedNicData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedNicData.length / NIC_VERIFICATION_CONSTANTS.ITEMS_PER_PAGE);
    const handleViewDetails = (nic: NicData) => {
        setSelectedNic(nic);
        setShowModal(true);
    };
    const refreshData = async () => {
        await fetchNicData();
    };
    const renderSortIcon = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={16} className="text-yellow-600" /> : <ChevronDown size={16} className="text-blue-600" />;
    };

    return (
        <div className="container mx-auto font-sans">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">NIC Verification Management</h1>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={refreshData}
                                className="flex items-center text-sm px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-yellow-600' : 'text-gray-600'}`} />
                                Refresh
                            </button>

                            <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                                {sortedNicData.length} {sortedNicData.length === 1 ? 'record' : 'records'} found
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row gap-3">
                            <SearchFilter
                                searchFilter={searchFilter}
                                onSearchChange={(value) => {
                                    setSearchFilter(value);
                                    setCurrentPage(1);
                                }}
                            />

                            <StatusFilter
                                statusFilter={statusFilter}
                                onStatusChange={(value) => {
                                    setStatusFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <ActiveFilters
                            searchFilter={searchFilter}
                            statusFilter={statusFilter}
                            onClearSearchFilter={() => setSearchFilter('')}
                            onClearStatusFilter={() => setStatusFilter('all')}
                            onClearAllFilters={clearAllFilters}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <LoadingState />
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        onClick={() => handleSort('first_name')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">User Details {renderSortIcon('first_name')}</div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('nic_number')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">NIC Number {renderSortIcon('nic_number')}</div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('is_verified')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Status {renderSortIcon('is_verified')}</div>
                                    </th>
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
                                        onReject={handleReject}
                                        isActionLoading={isActionLoading}
                                    />
                                ))}

                                {currentItems.length === 0 && !isLoading && <EmptyState hasFilters={searchFilter !== '' || getActiveFiltersCount() > 0} onClearFilters={clearAllFilters} />}
                            </tbody>
                        </table>
                    </div>
                )}

                {!isLoading && !error && sortedNicData.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedNicData.length}
                        itemsPerPage={NIC_VERIFICATION_CONSTANTS.ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {showModal && selectedNic && <NicDetailModal nicData={selectedNic} onClose={() => setShowModal(false)} onVerify={handleVerify} onReject={handleReject} isActionLoading={isActionLoading} />}
        </div>
    );
};

export default NicVerificationTable;
