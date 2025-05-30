import { ApiConfig } from './types/api/api';

const baseURL = 'http://127.0.0.1:8000/api';

const apiConfig: ApiConfig = {
    baseURL,
    endpoints: {
        matrimony: {
            create: `${baseURL}/matrimony-create`,
            list: `${baseURL}/get-matrimony`,
            listActive: `${baseURL}/get-active-matrimony`,
            detail: (id) => `${baseURL}/matrimony/${id}`,
            update: (id) => `${baseURL}/matrimony/${id}/update`,
            delete: (id) => `${baseURL}/matrimony/${id}/delete`,
            updateBootPost: (id) => `${baseURL}/matrimony/${id}/update-boot-post`,
            updateActiveStatus: (id) => `${baseURL}/matrimony/${id}/update-active-status`,
            updatePackageNumber: (id) => `${baseURL}/matrimony/${id}/update-package-number`,
        },
        blog: {
            create: `${baseURL}/blog-create`,
            update: (id) => `${baseURL}/blog-update/${id}`,
            list: `${baseURL}/get-all-blogs`,
            delete: (id) => `${baseURL}/blog-delete/${id}`,
            detail: (id) => `${baseURL}/blog-detail/${id}`,
        },
        profile: {
            get: (id) => `${baseURL}/get-profile/${id}`,
        },
        nic: {
            list: `${baseURL}/nic-details`,
            verify: (nicNumber: string) => `${baseURL}/nic-verification/${nicNumber}/verify`,
            reject: (nicNumber: string) => `${baseURL}/nic-verification/${nicNumber}/reject`,
            detail: (nicNumber: string) => `${baseURL}/nic-verification/${nicNumber}`,
        },
        matrimonyLogs: {
            list: `${baseURL}/matrimony-logs`,
        },
        dashboard: {
            stats: `${baseURL}/dashboard/stats`,
            monthlyStats: `${baseURL}/dashboard/monthly-stats`,
        },
        homepageProfiles: `${baseURL}/get-homepage-profiles`,
        signIn: `${baseURL}/sign-in`,
        logout: `${baseURL}/logout`,
        phone: {
            sendOtp: `${baseURL}/phone/send-otp`,
            verifyOtp: `${baseURL}/phone/verify-otp`,
            register: `${baseURL}/phone/register`,
        },
        forgotPassword: {
            sendOtp: `${baseURL}/forgot-password/send-otp`,
            verifyOtp: `${baseURL}/forgot-password/verify-otp`,
            reset: `${baseURL}/forgot-password/reset`,
        },
        contacts: {
            list: `${baseURL}/contacts`,
            update: (id: string) => `${baseURL}/contact-update/${id}`,
        },
        socials: {
            list: `${baseURL}/socials`,
            update: (id: string) => `${baseURL}/social-update/${id}`,
        },
    },
};

export default apiConfig;
