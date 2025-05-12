import axios from 'axios';
import apiConfig from '../../utilities/apiConfig';
import { ApiResponse, MatrimonyProfile } from '../../utilities/types/Matrimony/IAdminMatrimonyView';

class MatrimonyService {
    async fetchProfiles(): Promise<MatrimonyProfile[]> {
        try {
            const response = await axios.get<ApiResponse>(apiConfig.endpoints.matrimony.list);
            let profileData: MatrimonyProfile[] = [];

            if (response.data && (response.data.status === 200 || response.data.status === 'success')) {
                if (response.data['Matrimony profiles retrieved successfully']) {
                    profileData = response.data['Matrimony profiles retrieved successfully'];
                } else if (response.data.data) {
                    profileData = response.data.data;
                } else {
                    throw new Error('Unexpected response format');
                }

                return profileData.map((profile) => {
                    const normalizeIsActive = (value: any): boolean => {
                        if (typeof value === 'boolean') return value;
                        if (typeof value === 'string') {
                            return value.toLowerCase() === 'true' || value === '1';
                        }
                        if (typeof value === 'number') return value === 1;
                        return value === undefined || value === null ? true : !!value;
                    };

                    if (profile.matrimony) {
                        return {
                            ...profile,
                            ...profile.matrimony,
                            picture: profile.profile_picture ? { image_path: profile.profile_picture } : undefined,
                            is_active: normalizeIsActive(profile.is_active),
                        } as unknown as MatrimonyProfile;
                    }
                    return {
                        ...profile,
                        is_active: normalizeIsActive(profile.is_active),
                    };
                });
            }

            throw new Error('Failed to fetch profiles');
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    }

    async updateBootPost(matrimonyId: string, bootPost: boolean): Promise<void> {
        try {
            const response = await axios.post(apiConfig.endpoints.matrimony.updateBootPost(matrimonyId), {
                boot_post: bootPost ? 1 : 0,
            });

            if (!response.data || (response.data.status !== 200 && response.data.status !== 'success')) {
                throw new Error(response.data?.message || 'Failed to update boot post status');
            }
        } catch (error) {
            console.error('Error updating boot post:', error);
            throw error;
        }
    }

    async updateActiveStatus(matrimonyId: string, isActive: boolean): Promise<void> {
        try {
            await axios.post(apiConfig.endpoints.matrimony.updateActiveStatus(matrimonyId), {
                is_active: isActive,
            });
        } catch (error) {
            console.error('Error updating active status:', error);
            throw error;
        }
    }

    async updatePackageNumber(matrimonyId: string, packageNumber: number): Promise<void> {
        try {
            const response = await axios.post(apiConfig.endpoints.matrimony.updatePackageNumber(matrimonyId), {
                package_number: packageNumber,
            });

            if (!response.data || (response.data.status !== 200 && response.data.status !== 'success')) {
                throw new Error(response.data?.message || 'Failed to update package');
            }
        } catch (error) {
            console.error('Error updating package:', error);
            throw error;
        }
    }
}

export default new MatrimonyService();
