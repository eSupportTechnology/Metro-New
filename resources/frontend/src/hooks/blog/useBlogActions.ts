import { useState } from 'react';
import { toast } from 'react-toastify';
import { BlogPost, BlogFormData } from '../../utilities/types/Blog/IBlog';
import blogService from '../../services/blog/blogService';

export const useBlogActions = (blogs: BlogPost[], setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>) => {
    const [isActionLoading, setIsActionLoading] = useState<Record<string, boolean>>({});

    const deleteBlog = async (blogId: string) => {
        setIsActionLoading((prev) => ({ ...prev, [`delete_${blogId}`]: true }));
        try {
            await blogService.deleteBlog(blogId);

            setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blogId));
            toast.success('Blog deleted successfully');
        } catch (err) {
            toast.error('Failed to delete blog');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`delete_${blogId}`]: false }));
        }
    };

    const createBlog = async (formData: BlogFormData) => {
        try {
            const newBlog = await blogService.createBlog(formData);

            setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
            toast.success('Blog created successfully');
        } catch (err) {
            toast.error('Failed to create blog');
            throw err;
        }
    };

    const updateBlog = async (blogId: string, formData: BlogFormData) => {
        try {
            const updatedBlog = await blogService.updateBlog(blogId, formData);

            setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === blogId ? updatedBlog : b)));
            toast.success('Blog updated successfully');
        } catch (err) {
            toast.error('Failed to update blog');
            throw err;
        }
    };

    return {
        isActionLoading,
        deleteBlog,
        createBlog,
        updateBlog,
    };
};
