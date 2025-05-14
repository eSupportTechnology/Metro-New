import axios from 'axios';
import apiConfig from '../../utilities/apiConfig';

export interface MatrimonyProfile {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    matrimony: {
        display_name: string;
        account_created_by: string;
        birthdate: string;
        gender: string;
        ethnicity: string;
        religion: string;
        caste: string;
        height: string;
        civil_status: string;
        country_of_residence: string;
        state_district: string;
        city: string;
        visa_type: string;
        education_level: string;
        profession: string;
        drinking: string;
        food_preference: string;
        smoking: string;
        created_at: string;
        boot_post: boolean;
        package_number: number;
        is_active: boolean;
    };
    father: {
        ethnicity: string;
        religion: string;
        caste: string;
        country_of_residence: string;
        profession: string;
        additional_info: string;
    };
    mother: {
        ethnicity: string;
        religion: string;
        caste: string;
        country_of_residence: string;
        profession: string;
        additional_info: string;
    };
    horoscope: {
        birthdate: string;
        birth_country: string;
        horoscope_matching_required: boolean;
        birth_city: string;
        birth_time: string;
    };
    profile_picture: string | null;
    is_active: boolean;
}

interface ApiResponse {
    status: string | number;
    message?: string;
    data?: MatrimonyProfile;
}

class ProfileService {
    private getAuthHeaders() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    async getProfileByUserId(userId: string): Promise<MatrimonyProfile> {
        try {
            // The backend endpoint accepts both matrimony ID and user ID
            const response = await axios.get<ApiResponse>(apiConfig.endpoints.profile.get(userId), {
                headers: this.getAuthHeaders(),
            });

            if (response.data && (response.data.status === 'success' || response.data.status === 200) && response.data.data) {
                return response.data.data;
            }

            throw new Error(response.data?.message || 'Failed to fetch profile');
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }
}

export default new ProfileService();
