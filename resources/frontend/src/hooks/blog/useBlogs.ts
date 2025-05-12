import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BlogPost } from '../../utilities/types/Blog/IBlog';
import blogService from '../../services/blog/blogService';

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchBlogs = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await blogService.fetchBlogs();
            setBlogs(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blogs';
            setError(errorMessage);
            toast.error('Failed to load blogs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        blogs,
        setBlogs,
        isLoading,
        error,
        fetchBlogs,
    };
};
