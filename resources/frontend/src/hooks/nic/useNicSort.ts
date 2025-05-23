import { useState, useMemo } from 'react';
import { NicData } from '../../utilities/types/NIC/INicVerification';

type SortField = 'first_name' | 'last_name' | 'email' | 'nic_number' | 'is_verified';
type SortDirection = 'asc' | 'desc';

export const useNicSort = (filteredNicData: NicData[]) => {
    const [sortField, setSortField] = useState<SortField>('first_name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedNicData = useMemo(() => {
        return [...filteredNicData].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortField) {
                case 'first_name':
                    aValue = a.first_name?.toLowerCase() || '';
                    bValue = b.first_name?.toLowerCase() || '';
                    break;
                case 'last_name':
                    aValue = a.last_name?.toLowerCase() || '';
                    bValue = b.last_name?.toLowerCase() || '';
                    break;
                case 'email':
                    aValue = a.email?.toLowerCase() || '';
                    bValue = b.email?.toLowerCase() || '';
                    break;
                case 'nic_number':
                    aValue = a.nic_number?.toLowerCase() || '';
                    bValue = b.nic_number?.toLowerCase() || '';
                    break;
                case 'is_verified':
                    aValue = a.is_verified;
                    bValue = b.is_verified;
                    break;
                default:
                    aValue = '';
                    bValue = '';
            }

            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredNicData, sortField, sortDirection]);

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedNicData,
    };
};
