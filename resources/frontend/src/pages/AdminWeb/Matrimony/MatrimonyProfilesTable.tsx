import React, { useState } from 'react';
import { RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MatrimonyProfile } from '../../../utilities/types/Matrimony/IAdminMatrimonyView';
import { useMatrimonyProfiles } from '../../../hooks/matrimony/useMatrimonyProfiles';
import { useProfileActions } from '../../../hooks/matrimony/useProfileActions';
import { useProfileFilters } from '../../../hooks/matrimony/useProfileFilters';
import { useProfileSort } from '../../../hooks/matrimony/useProfileSort';
import { PROFILES_PER_PAGE, sortOptions } from '../../../constants/matrimony/matrimonyConstants';
import ProfileTableRow from '../../../components/matrimony/ProfileTable/ProfileTableRow';
import ProfileDetailModal from '../../../components/matrimony/ProfileModals/ProfileDetailModal';
import LoadingState from '../../../components/matrimony/Common/LoadingState';
import EmptyState from '../../../components/matrimony/Common/EmptyState';
import Pagination from '../../../components/matrimony/Common/Pagination';
import SortDropdown from '../../../components/matrimony/Controls/SortDropdown';
import AdvancedFilterDropdown from '../../../components/matrimony/Filters/AdvancedFilterDropdown';
import SearchFilter from '../../../components/matrimony/Filters/SearchFilter';
import ActiveFilters from '../../../components/matrimony/Filters/ActiveFilters';
import QuickFilters from '../../../components/matrimony/Filters/QuickFilters';

const MatrimonyProfilesTable: React.FC = () => {
    const [selectedProfile, setSelectedProfile] = useState<MatrimonyProfile | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { profiles, setProfiles, isLoading, error, totalResults, filterOptions, fetchProfiles } = useMatrimonyProfiles();
    const { searchFilter, setSearchFilter, activeFilters, setActiveFilters, toggleFilter, clearAllFilters, getActiveFiltersCount, filteredProfiles } = useProfileFilters(profiles);
    const { sortField, sortDirection, handleSort, sortedProfiles } = useProfileSort(filteredProfiles);
    const { isActionLoading, updateBootPost, updateActiveStatus, updatePackageNumber } = useProfileActions(profiles, setProfiles, selectedProfile, setSelectedProfile);
    const indexOfLastProfile = currentPage * PROFILES_PER_PAGE;
    const indexOfFirstProfile = indexOfLastProfile - PROFILES_PER_PAGE;
    const currentProfiles = sortedProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
    const totalPages = Math.ceil(sortedProfiles.length / PROFILES_PER_PAGE);
    const handleViewProfile = (profile: MatrimonyProfile) => {
        setSelectedProfile(profile);
        setShowModal(true);
    };
    const handleQuickFilterSelect = (category: string, value: string) => {
        setActiveFilters({
            ...activeFilters,
            [category]: [value],
        });
        setCurrentPage(1);
    };

    const refreshData = async () => {
        await fetchProfiles();
    };

    const renderSortIcon = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={16} className="text-yellow-600" /> : <ChevronDown size={16} className="text-yellow-600" />;
    };

    return (
        <div className="container mx-auto  font-sans">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">Matrimony Profiles</h1>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={refreshData}
                                className="flex items-center text-sm px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-yellow-600' : 'text-gray-600'}`} />
                                Refresh
                            </button>

                            <SortDropdown sortField={sortField} sortDirection={sortDirection} sortOptions={sortOptions} onSort={handleSort} />

                            <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                                {sortedProfiles.length} {sortedProfiles.length === 1 ? 'profile' : 'profiles'} found
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

                            <AdvancedFilterDropdown
                                activeFilters={activeFilters}
                                onToggleFilter={toggleFilter}
                                onClearAllFilters={clearAllFilters}
                                getActiveFiltersCount={getActiveFiltersCount}
                                filterOptions={filterOptions}
                            />

                            <QuickFilters filterOptions={filterOptions} onQuickFilterSelect={handleQuickFilterSelect} />
                        </div>

                        <ActiveFilters
                            searchFilter={searchFilter}
                            activeFilters={activeFilters}
                            onClearSearchFilter={() => setSearchFilter('')}
                            onToggleFilter={toggleFilter}
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
                                        onClick={() => handleSort('display_name')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Name {renderSortIcon('display_name')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th
                                        onClick={() => handleSort('profession')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Profession {renderSortIcon('profession')}</div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('country_of_residence')}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">Country {renderSortIcon('country_of_residence')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentProfiles.map((profile) => (
                                    <ProfileTableRow
                                        key={profile.user_id}
                                        profile={profile}
                                        onViewProfile={handleViewProfile}
                                        onUpdateBootPost={updateBootPost}
                                        onUpdateActiveStatus={updateActiveStatus}
                                        onUpdatePackage={updatePackageNumber}
                                        isActionLoading={isActionLoading}
                                    />
                                ))}

                                {currentProfiles.length === 0 && !isLoading && <EmptyState hasFilters={searchFilter !== '' || getActiveFiltersCount() > 0} onClearFilters={clearAllFilters} />}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && !error && sortedProfiles.length > 0 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={sortedProfiles.length} itemsPerPage={PROFILES_PER_PAGE} onPageChange={setCurrentPage} />
                )}
            </div>
            {showModal && selectedProfile && (
                <ProfileDetailModal
                    profile={selectedProfile}
                    isActionLoading={isActionLoading}
                    onClose={() => setShowModal(false)}
                    onUpdateBootPost={updateBootPost}
                    onUpdateActiveStatus={updateActiveStatus}
                    onUpdatePackage={updatePackageNumber}
                />
            )}
        </div>
    );
};

export default MatrimonyProfilesTable;
