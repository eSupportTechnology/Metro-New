export interface ApiConfig {
    baseURL: string;
    endpoints: {
        matrimony: {
            create: string;
            list: string;
            detail: (id: number | string) => string;
            update: (id: number | string) => string;
            delete: (id: number | string) => string;
        };
        profile: {
            get: (id: number | string) => string;
        };
    };
}
