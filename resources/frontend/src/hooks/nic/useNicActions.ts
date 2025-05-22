import { useState } from 'react';
import { toast } from 'react-toastify';
import { NicData } from '../../utilities/types/NIC/INicVerification';
import { nicApiService } from '../../services/nic/nicApiService';

export const useNicActions = (
    nicData: NicData[],
    setNicData: React.Dispatch<React.SetStateAction<NicData[]>>,
    selectedNic: NicData | null,
    setSelectedNic: React.Dispatch<React.SetStateAction<NicData | null>>,
) => {
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

    const handleVerify = async (nicNumber: string) => {
        setIsActionLoading(true);
        try {
            await nicApiService.verifyNic(nicNumber);
            toast.success('NIC approved successfully');

            setNicData((prevData) => prevData.map((nic) => (nic.nic_number === nicNumber ? { ...nic, is_verified: 1 } : nic)));

            if (selectedNic && selectedNic.nic_number === nicNumber) {
                setSelectedNic({ ...selectedNic, is_verified: 1 });
            }
        } catch (error) {
            console.error('Error verifying NIC:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to verify NIC';
            toast.error(errorMessage);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleReject = async (nicNumber: string) => {
        setIsActionLoading(true);
        try {
            await nicApiService.rejectNic(nicNumber);
            toast.success('NIC rejected successfully');
            setNicData((prevData) => prevData.map((nic) => (nic.nic_number === nicNumber ? { ...nic, is_verified: 2 } : nic)));

            if (selectedNic && selectedNic.nic_number === nicNumber) {
                setSelectedNic({ ...selectedNic, is_verified: 2 });
            }
        } catch (error) {
            console.error('Error rejecting NIC:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to reject NIC';
            toast.error(errorMessage);
        } finally {
            setIsActionLoading(false);
        }
    };

    return {
        isActionLoading,
        handleVerify,
        handleReject,
    };
};
