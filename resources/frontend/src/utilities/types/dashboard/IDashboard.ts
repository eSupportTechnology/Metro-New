export interface UserStatistics {
    total_users: number;
    new_users_this_month: number;
    new_users_today: number;
}

export interface MatrimonyStatistics {
    total_profiles: number;
    active_profiles: number;
    inactive_profiles: number;
    new_profiles_this_month: number;
    gender_distribution: {
        male: number;
        female: number;
    };
}

export interface NicVerificationStatistics {
    total_submissions: number;
    verified: number;
    pending: number;
    verification_rate: number;
}

export interface BlogStatistics {
    total_blogs: number;
    blogs_this_month: number;
}

export interface PackageDistribution {
    package_number: string;
    count: number;
}

export interface RecentUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
}

export interface RecentProfile {
    id: string;
    display_name: string;
    gender: string;
    is_active: boolean;
    created_at: string;
}

export interface RecentLog {
    id: string;
    matrimony_id: string;
    description: string;
    created_at: string;
    matrimony?: {
        display_name: string;
    };
}

export interface RecentActivity {
    recent_users: RecentUser[];
    recent_profiles: RecentProfile[];
    recent_logs: RecentLog[];
}

export interface DashboardStats {
    user_statistics: UserStatistics;
    matrimony_statistics: MatrimonyStatistics;
    nic_verification_statistics: NicVerificationStatistics;
    blog_statistics: BlogStatistics;
    package_distribution: PackageDistribution[];
    recent_activity: RecentActivity;
}

export interface MonthlyData {
    month: string;
    users: number;
    profiles: number;
}

export interface MonthlyStats {
    year: number;
    monthly_data: MonthlyData[];
}

export interface DashboardResponse {
    status: string;
    data: DashboardStats;
}

export interface MonthlyStatsResponse {
    status: string;
    data: MonthlyStats;
}
