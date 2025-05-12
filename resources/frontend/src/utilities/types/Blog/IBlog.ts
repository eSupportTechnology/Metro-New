export interface BlogPost {
    id: string;
    title: string;
    category: string;
    image: string | null;
    writer: string;
    date: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export interface BlogFormData {
    title: string;
    category: string;
    image: File | null;
    writer: string;
    date: string;
    description: string;
}

export interface ApiResponse {
    status: string | number;
    message?: string;
    data?: BlogPost[];
}
