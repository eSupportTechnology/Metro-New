export const NIC_VERIFICATION_CONSTANTS = {
    ITEMS_PER_PAGE: 10,
    STATUSES: {
        PENDING: 0,
        APPROVED: 1,
        REJECTED: 2,
    },
    STATUS_LABELS: {
        0: 'PENDING',
        1: 'APPROVED',
        2: 'REJECTED',
    },
    STATUS_COLORS: {
        0: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
        1: { bgColor: 'bg-green-100', textColor: 'text-green-800' },
        2: { bgColor: 'bg-red-100', textColor: 'text-red-800' },
    },
};

export const SORT_OPTIONS = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'nic_number', label: 'NIC Number' },
    { value: 'is_verified', label: 'Status' },
];
