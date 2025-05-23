import { NIC_VERIFICATION_CONSTANTS } from '../constants/nic/nicVerificationConstants';

export const getStatusInfo = (isVerified: number) => {
    const status = NIC_VERIFICATION_CONSTANTS.STATUS_COLORS[isVerified as keyof typeof NIC_VERIFICATION_CONSTANTS.STATUS_COLORS];
    const label = NIC_VERIFICATION_CONSTANTS.STATUS_LABELS[isVerified as keyof typeof NIC_VERIFICATION_CONSTANTS.STATUS_LABELS];

    return {
        text: label || 'UNKNOWN',
        bgColor: status?.bgColor || 'bg-gray-100',
        textColor: status?.textColor || 'text-gray-800',
    };
};
