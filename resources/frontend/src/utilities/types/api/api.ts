export interface ApiConfig {
    baseURL: string;
    endpoints: {
        matrimony: {
            create: string;
            list: string;
            listActive: string;
            detail: (id: number | string) => string;
            update: (id: number | string) => string;
            delete: (id: number | string) => string;
            updateBootPost: (id: string) => string;
            updateActiveStatus: (id: string) => string;
            updatePackageNumber: (id: string) => string;
        };
        blog: {
            create: string;
            update: (id: number | string) => string;
            list: string;
            delete: (id: number | string) => string;
            detail: (id: number | string) => string;
        };
        profile: {
            get: (id: number | string) => string;
        };
        nic: {
            list: string;
            verify: (nicNumber: string) => string;
            reject: (nicNumber: string) => string;
            detail: (nicNumber: string) => string;
        };
        matrimonyLogs: {
            list: string;
        };
        dashboard: {
            stats: string;
            monthlyStats: string;
        };
        homepageProfiles: string;
        signIn: string;
        logout: string;
        phone: {
            sendOtp: string;
            verifyOtp: string;
            register: string;
        };
        forgotPassword: {
            sendOtp: string;
            verifyOtp: string;
            reset: string;
        };
        contacts: {
            list: string;
            update: (id: string) => string;
        };
        socials: {
            list: string;
            update: (id: string) => string;
        };
    };
}
