import axios from 'axios';
import apiConfig from '../../utilities/apiConfig';
import { BlogPost, BlogFormData, ApiResponse } from '../../utilities/types/Blog/IBlog';

class BlogService {
    async fetchBlogs(): Promise<BlogPost[]> {
        try {
            const response = await axios.get<ApiResponse>(apiConfig.endpoints.blog.list);

            if (response.data.status === 'success' && response.data.data) {
                return response.data.data;
            }

            throw new Error(response.data.message || 'Failed to fetch blogs');
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw error;
        }
    }

    async createBlog(formData: BlogFormData): Promise<BlogPost> {
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('writer', formData.writer);
            data.append('date', formData.date);
            data.append('description', formData.description);

            if (formData.image) {
                data.append('image', formData.image);
            }

            const response = await axios.post(apiConfig.endpoints.blog.create, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                return response.data.data;
            }

            throw new Error(response.data.message || 'Failed to create blog');
        } catch (error) {
            console.error('Error creating blog:', error);
            throw error;
        }
    }

    async updateBlog(id: string, formData: BlogFormData): Promise<BlogPost> {
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('writer', formData.writer);
            data.append('date', formData.date);
            data.append('description', formData.description);

            if (formData.image) {
                data.append('image', formData.image);
            }

            data.append('_method', 'PUT');

            const response = await axios.post(apiConfig.endpoints.blog.update(id), data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                return response.data.data;
            }

            throw new Error(response.data.message || 'Failed to update blog');
        } catch (error) {
            console.error('Error updating blog:', error);
            throw error;
        }
    }

    async deleteBlog(id: string): Promise<void> {
        try {
            const response = await axios.delete(apiConfig.endpoints.blog.delete(id));

            if (response.data.status !== 'success') {
                throw new Error(response.data.message || 'Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }
}

export default new BlogService();
