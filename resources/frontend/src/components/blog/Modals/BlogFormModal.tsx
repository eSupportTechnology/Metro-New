import React from 'react';
import { X, FileText } from 'lucide-react';
import { BlogFormData } from '../../../utilities/types/Blog/IBlog';
import { blogCategories } from '../../../constants/blog/blogConstants';
import RichTextEditor from '../Common/RichTextEditor';

interface BlogFormModalProps {
    isEditMode: boolean;
    formData: BlogFormData;
    imagePreview: string | null;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    onFormChange: (data: Partial<BlogFormData>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onImageRemove: () => void;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ isEditMode, formData, imagePreview, onSubmit, onClose, onFormChange, onImageUpload, onImageRemove }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => onFormChange({ title: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => onFormChange({ category: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                >
                                    {blogCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Writer <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.writer}
                                    onChange={(e) => onFormChange({ writer: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => onFormChange({ date: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-full object-cover rounded-md" />
                                                <button type="button" onClick={onImageRemove} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                                                    <X size={16} />
                                                </button>
                                                {imagePreview && !formData.image && (
                                                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">Current Image</div>
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500">
                                                        <span>Upload a file</span>
                                                        <input type="file" className="sr-only" accept="image/*" onChange={onImageUpload} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <RichTextEditor value={formData.description} onChange={(value) => onFormChange({ description: value })} placeholder="Enter blog content..." />
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t">
                            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                                {isEditMode ? 'Update' : 'Create'} Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogFormModal;
