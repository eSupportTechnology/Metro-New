import { useState } from 'react';
import { toast } from 'react-toastify';
import { MatrimonyProfile } from '../../utilities/types/Matrimony/IAdminMatrimonyView';
import matrimonyService from '../../services/matrimony/matrimonyService';
import { packageDetails } from '../../constants/matrimony/matrimonyConstants';

export const useProfileActions = (
    profiles: MatrimonyProfile[],
    setProfiles: React.Dispatch<React.SetStateAction<MatrimonyProfile[]>>,
    selectedProfile: MatrimonyProfile | null,
    setSelectedProfile: React.Dispatch<React.SetStateAction<MatrimonyProfile | null>>,
) => {
    const [isActionLoading, setIsActionLoading] = useState<Record<string, boolean>>({});

    const updateBootPost = async (matrimonyId: string, bootPost: boolean) => {
        setIsActionLoading((prev) => ({ ...prev, [`boot_${matrimonyId}`]: true }));
        try {
            await matrimonyService.updateBootPost(matrimonyId, bootPost);

            setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, boot_post: bootPost ? 1 : 0 } : profile)));
            toast.success(`Profile ${bootPost ? 'featured' : 'unfeatured'} successfully`);
        } catch (err) {
            console.error('Error updating boot post:', err);
            toast.error('Failed to update featured status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`boot_${matrimonyId}`]: false }));
        }
    };

    const updateActiveStatus = async (matrimonyId: string, isActive: boolean) => {
        setIsActionLoading((prev) => ({ ...prev, [`active_${matrimonyId}`]: true }));
        try {
            await matrimonyService.updateActiveStatus(matrimonyId, isActive);

            setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, is_active: isActive } : profile)));

            if (selectedProfile && selectedProfile.user_id === matrimonyId) {
                setSelectedProfile((prev) => (prev ? { ...prev, is_active: isActive } : null));
            }
            toast.success(`Profile ${isActive ? 'activated' : 'deactivated'} successfully`);
        } catch (err) {
            console.error('Error updating active status:', err);
            toast.error('Failed to update active status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`active_${matrimonyId}`]: false }));
        }
    };

    const updatePackageNumber = async (matrimonyId: string, packageNumber: number) => {
        setIsActionLoading((prev) => ({ ...prev, [`package_${matrimonyId}`]: true }));
        try {
            await matrimonyService.updatePackageNumber(matrimonyId, packageNumber);

            setProfiles((prevProfiles) => prevProfiles.map((profile) => (profile.user_id === matrimonyId ? { ...profile, package_number: packageNumber } : profile)));

            if (selectedProfile && selectedProfile.user_id === matrimonyId) {
                setSelectedProfile((prev) => (prev ? { ...prev, package_number: packageNumber } : null));
            }

            const packageName = packageDetails[packageNumber as keyof typeof packageDetails]?.name || 'Unknown';
            toast.success(`Package updated to ${packageName} successfully`);
        } catch (err) {
            console.error('Error updating package:', err);
            toast.error('Failed to update package');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`package_${matrimonyId}`]: false }));
        }
    };

    return {
        isActionLoading,
        updateBootPost,
        updateActiveStatus,
        updatePackageNumber,
    };
};
