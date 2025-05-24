import React, { useState } from 'react';
import { RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MatrimonyLogData } from '../../../utilities/types/Matrimony/IMatrimonyLogs';
import { useMatrimonyLogsData } from '../../../hooks/matrimony/useMatrimonyLogsData';
import { useMatrimonyLogsFilters } from '../../../hooks/matrimony/useMatrimonyLogsFilters';
import { useMatrimonyLogsSort } from '../../../hooks/matrimony/useMatrimonyLogsSort';
import { MATRIMONY_LOGS_CONSTANTS } from '../../../constants/matrimony/matrimonyLogsConstants';
import MatrimonyLogTableRow from '../../../components/matrimony/Log/MatrimonyLogTableRow';
import LogDetailModal from '../../../components/matrimony/Log/LogDetailModal';
import DateRangeFilter from '../../../components/matrimony/Log/DateRangeFilter';
import LoadingState from '../../../components/nic/Common/LoadingState';
import EmptyState from '../../../components/nic/Common/EmptyState';
import Pagination from '../../../components/nic/Common/Pagination';
import ActionFilter from '../../../components/matrimony/Log/ActionFilter';

const MatrimonyLogsTable: React.FC = () => {
    const [selectedLog, setSelectedLog] = useState<MatrimonyLogData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { logsData, isLoading, error, fetchLogsData } = useMatrimonyLogsData();
    const { searchFilter, setSearchFilter, dateFromFilter, setDateFromFilter, dateToFilter, setDateToFilter, actionFilter, setActionFilter, filteredLogsData, clearAllFilters, getActiveFiltersCount } =
        useMatrimonyLogsFilters(logsData);
    const { sortField, sortDirection, handleSort, sortedLogsData } = useMatrimonyLogsSort(filteredLogsData);

    const indexOfLastItem = currentPage * MATRIMONY_LOGS_CONSTANTS.ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - MATRIMONY_LOGS_CONSTANTS.ITEMS_PER_PAGE;
    const currentItems = sortedLogsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedLogsData.length / MATRIMONY_LOGS_CONSTANTS.ITEMS_PER_PAGE);

    const handleViewDetails = (log: MatrimonyLogData) => {
        setSelectedLog(log);
        setShowModal(true);
    };

    const refreshData = async () => {
        await fetchLogsData();
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
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">Matrimony Activity Logs</h1>

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
                                {sortedLogsData.length} {sortedLogsData.length === 1 ? 'log' : 'logs'} found
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row gap-3">
                            <ActionFilter
                                actionFilter={actionFilter}
                                onActionChange={(value) => {
                                    setActionFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                            <DateRangeFilter
                                dateFromFilter={dateFromFilter}
                                dateToFilter={dateToFilter}
                                onDateFromChange={(value) => {
                                    setDateFromFilter(value);
                                    setCurrentPage(1);
                                }}
                                onDateToChange={(value) => {
                                    setDateToFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {getActiveFiltersCount() > 0 && (
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-600">Active filters:</span>
                                {searchFilter && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        Search: "{searchFilter}"
                                        <button onClick={() => setSearchFilter('')} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200">
                                            ×
                                        </button>
                                    </span>
                                )}
                                {actionFilter !== 'all' && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        Action: {actionFilter}
                                        <button onClick={() => setActionFilter('all')} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200">
                                            ×
                                        </button>
                                    </span>
                                )}
                                {dateFromFilter && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        From: {dateFromFilter}
                                        <button onClick={() => setDateFromFilter('')} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200">
                                            ×
                                        </button>
                                    </span>
                                )}
                                {dateToFilter && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        To: {dateToFilter}
                                        <button onClick={() => setDateToFilter('')} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200">
                                            ×
                                        </button>
                                    </span>
                                )}
                                <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-gray-700 underline">
                                    Clear all
                                </button>
                            </div>
                        )}
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
                                        onClick={() => handleSort('matrimony_display_name')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Profile {renderSortIcon('matrimony_display_name')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Type</th>
                                    <th
                                        onClick={() => handleSort('created_at')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Timestamp {renderSortIcon('created_at')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((log, index) => (
                                    <MatrimonyLogTableRow key={`${log.id}-${index}`} logData={log} onViewDetails={handleViewDetails} />
                                ))}

                                {currentItems.length === 0 && !isLoading && <EmptyState hasFilters={getActiveFiltersCount() > 0} onClearFilters={clearAllFilters} />}
                            </tbody>
                        </table>
                    </div>
                )}

                {!isLoading && !error && sortedLogsData.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={sortedLogsData.length}
                        itemsPerPage={MATRIMONY_LOGS_CONSTANTS.ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {showModal && selectedLog && <LogDetailModal logData={selectedLog} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default MatrimonyLogsTable;
