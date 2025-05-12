import React from 'react';
import { Eye, Edit2, Trash2, Calendar, User, FileText } from 'lucide-react';
import { BlogPost } from '../../../utilities/types/Blog/IBlog';

interface BlogTableRowProps {
    blog: BlogPost;
    onViewBlog: (blog: BlogPost) => void;
    onEditBlog: (blog: BlogPost) => void;
    onDeleteBlog: (blog: BlogPost) => void;
    isActionLoading: Record<string, boolean>;
}

const BlogTableRow: React.FC<BlogTableRowProps> = ({ blog, onViewBlog, onEditBlog, onDeleteBlog, isActionLoading }) => {
    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const getPreviewText = (html: string, maxLength: number = 100) => {
        const text = stripHtml(html);
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="h-10 w-10 rounded-md object-cover mr-3" />
                    ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center mr-3">
                            <FileText size={20} className="text-gray-400" />
                        </div>
                    )}
                    <div>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{blog.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{getPreviewText(blog.description)}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{blog.category}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{blog.writer}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    {new Date(blog.date).toLocaleDateString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onViewBlog(blog)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye size={18} />
                </button>
                <button onClick={() => onEditBlog(blog)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                    <Edit2 size={18} />
                </button>
                <button onClick={() => onDeleteBlog(blog)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );
};

export default BlogTableRow;
