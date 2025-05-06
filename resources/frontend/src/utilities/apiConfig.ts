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
            list: `${baseURL}/matrimony-list`,
            detail: (id) => `${baseURL}/matrimony/${id}`,
            update: (id) => `${baseURL}/matrimony/${id}/update`,
            delete: (id) => `${baseURL}/matrimony/${id}/delete`,
        },
    },
};

export default apiConfig;
