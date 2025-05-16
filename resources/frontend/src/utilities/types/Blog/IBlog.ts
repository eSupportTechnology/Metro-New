export interface BlogPost {
    id: string;
    title: string;
    category: string;
    image: string | null;
    writer: string;
    date: string;
    description: string;
    content?: string;
    readTime?: number;
    featured?: boolean;
    views?: number;
    likes?: number;
    tags?: string[];
}

export interface BlogFormData {
    title: string;
    category: string;
    writer: string;
    date: string;
    description: string;
    image?: File | null;
}

export interface ApiResponse<T = any> {
    status: string | number;
    message?: string;
    data: T;
}
