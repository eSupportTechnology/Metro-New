import { ApiConfig } from './types/api/api';

const isDevelopment = process.env.NODE_ENV === 'development' || true;
const isStaging = process.env.NODE_ENV === 'staging';
const isProduction = process.env.NODE_ENV === 'production';

let baseURL = 'http://127.0.0.1:8000/api';

// if (isStaging) {
//     baseURL = 'https://staging-api.yourdomain.com/api';
// } else if (isProduction) {
//     baseURL = 'https://api.yourdomain.com/api';
// }

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
        homepageProfiles: `${baseURL}/get-homepage-profiles`,
        signIn: `${baseURL}/sign-in`,
        logout: `${baseURL}/logout`,
    },
};

export default apiConfig;
