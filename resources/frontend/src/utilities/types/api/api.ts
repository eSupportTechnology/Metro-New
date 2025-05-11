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
        profile: {
            get: (id: number | string) => string;
        };
        homepageProfiles: string;
        signIn: string;
        logout: string;
    };
}
