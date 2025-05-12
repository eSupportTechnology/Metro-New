import React from 'react';
import { X, User, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../../../utilities/types/Blog/IBlog';

interface BlogViewModalProps {
    blog: BlogPost;
    onClose: () => void;
    onEdit: (blog: BlogPost) => void;
}

const BlogViewModal: React.FC<BlogViewModalProps> = ({ blog, onClose, onEdit }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">View Blog Post</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />}

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <User size={16} className="mr-1" />
                                    {blog.writer}
                                </div>
                                <div className="flex items-center">
                                    <Calendar size={16} className="mr-1" />
                                    {new Date(blog.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                    <Tag size={16} className="mr-1" />
                                    {blog.category}
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blog.description }} />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={() => {
                                onClose();
                                onEdit(blog);
                            }}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                        >
                            Edit Blog
                        </button>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogViewModal;
