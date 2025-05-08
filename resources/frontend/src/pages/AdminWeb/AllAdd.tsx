import React from 'react';
import { Search, Filter, ArrowLeft, AlertTriangle, ChevronDown } from 'lucide-react';
import Header from '../MainWeb/NavBar/Header';
import Footer from '../MainWeb/Footer/Footer';
import useMatrimonySearch from '../../utilities/types/Matrimony/useMatrimonySearch';
import AppliedFilters from '../Matrimony/ViewMatrimony/AppliedFilters';
import GenderSelector from '../Matrimony/ViewMatrimony/GenderSelector';
import FilterSection from '../Matrimony/ViewMatrimony/FilterSection';
import Spinner from '../../components/Loader/Spinner';
import ProfileCard from '../Matrimony/ViewMatrimony/ProfileCard';
import { Pagination } from '@mantine/core';
const AllAdd: React.FC = () => {
    const {
        isLoading,
        error,
        sortBy,
        setSortBy,
        preferredSearch,
        setPreferredSearch,
        currentPage,
        setCurrentPage,
        selectedGender,
        setSelectedGender,
        isSortDropdownOpen,
        setIsSortDropdownOpen,
        filterOptions,
        activeFilters,
        setActiveFilters,
        sortOptions,
        appliedFilters,
        filteredProfiles,
        removeFilter,
        clearAllFilters,
        totalPages,
        startIndex,
        endIndex,
        currentProfiles,
    } = useMatrimonySearch();

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto mt-14 pt-6 px-4">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <h2 className="text-xl font-semibold text-gray-800 mr-2">Search Results</h2>
                            <span className="text-sm text-gray-600">
                                {filteredProfiles.length > 0 ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProfiles.length)} of ${filteredProfiles.length} profiles` : 'No profiles found'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-700 mr-2">Preferred Search</span>
                                <button
                                    onClick={() => setPreferredSearch(!preferredSearch)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferredSearch ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferredSearch ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="relative">
                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer" onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}>
                                    <span className="text-sm text-gray-700 mr-2">Sort By: {sortBy}</span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </div>

                                {isSortDropdownOpen && (
                                    <div className="absolute right-0 top-10 z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setSortBy(option);
                                                        setIsSortDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${sortBy === option ? 'bg-yellow-100 text-yellow-900' : 'text-gray-700'} hover:bg-yellow-50`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <AppliedFilters appliedFilters={appliedFilters} removeFilter={removeFilter} clearAllFilters={clearAllFilters} />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <GenderSelector selectedGender={selectedGender} setSelectedGender={setSelectedGender} />

                            {filterOptions.length > 0 ? (
                                filterOptions.map((filter) => <FilterSection key={filter.name} filter={filter} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />)
                            ) : (
                                <div className="text-center py-8">
                                    <Spinner size="md" color="yellow-500" text="Loading filters..." />
                                </div>
                            )}

                            <div className="mt-6">
                                <div className="text-sm text-gray-700 mb-3">Save this search as your preferred search criteria?</div>
                                <button className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                                    <Search className="h-4 w-4 mr-2" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner size="lg" color="yellow-500" text="Loading profiles..." />
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 p-6 rounded-lg text-red-800 flex flex-col items-center">
                                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                                <p className="text-center">Error: {error}</p>
                                <button className="mt-4 px-6 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center" onClick={() => window.location.reload()}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Try Again
                                </button>
                            </div>
                        ) : filteredProfiles.length === 0 ? (
                            <div className="bg-yellow-50 p-6 rounded-lg text-yellow-800 flex flex-col items-center">
                                <Search className="h-12 w-12 text-yellow-500 mb-4" />
                                <p className="text-center">No profiles match your search criteria.</p>
                                <button className="mt-4 px-6 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 flex items-center" onClick={clearAllFilters}>
                                    <Filter className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            currentProfiles.map((profile, index) => <ProfileCard key={profile.user_id || index} profile={profile} index={index} />)
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllAdd;
