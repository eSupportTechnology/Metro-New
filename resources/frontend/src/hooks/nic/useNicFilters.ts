import { useState, useMemo } from 'react';
import { NicData } from '../../utilities/types/NIC/INicVerification';

export const useNicFilters = (nicData: NicData[]) => {
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredNicData = useMemo(() => {
        return nicData.filter((nic) => {
            const matchesSearch =
                searchFilter === '' ||
                nic.first_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                nic.last_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                nic.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
                nic.nic_number.toLowerCase().includes(searchFilter.toLowerCase());

            const matchesStatus = statusFilter === 'all' || nic.is_verified.toString() === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [nicData, searchFilter, statusFilter]);

    const clearAllFilters = () => {
        setSearchFilter('');
        setStatusFilter('all');
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (searchFilter !== '') count++;
        if (statusFilter !== 'all') count++;
        return count;
    };

    return {
        searchFilter,
        setSearchFilter,
        statusFilter,
        setStatusFilter,
        filteredNicData,
        clearAllFilters,
        getActiveFiltersCount,
    };
};
