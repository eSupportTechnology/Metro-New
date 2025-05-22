export interface NicData {
    first_name: string;
    last_name: string;
    email: string;
    nic_number: string;
    nic_front_image: string;
    nic_back_image: string;
    is_verified: number;
    nic_front_image_url: string | null;
    nic_back_image_url: string | null;
    nic_front_image_data: string | null;
    nic_back_image_data: string | null;
    verification_status?: 'not_started' | 'incomplete' | 'pending_verification' | 'verified';
}

export interface NicDetailModalProps {
    nicData: NicData;
    onClose: () => void;
    onVerify: (nicNumber: string) => void;
    onReject: (nicNumber: string) => void;
    isActionLoading: boolean;
}

export interface NicTableRowProps {
    nicData: NicData;
    onViewDetails: (nicData: NicData) => void;
    onVerify: (nicNumber: string) => void;
    onReject: (nicNumber: string) => void;
    isActionLoading: boolean;
}

export interface NicApiResponse {
    status: number;
    message: string;
    data: NicData[];
}

export interface NicActionResponse {
    status: number;
    message: string;
    data?: any;
}
