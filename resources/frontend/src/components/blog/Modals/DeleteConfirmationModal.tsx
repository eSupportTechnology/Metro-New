import React from 'react';
import { Trash2, Loader } from 'lucide-react';
import { BlogPost } from '../../../utilities/types/Blog/IBlog';

interface DeleteConfirmationModalProps {
    blog: BlogPost;
    isDeleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ blog, isDeleting, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center mb-4">
                    <Trash2 className="h-8 w-8 text-red-500 mr-3" />
                    <h3 className="text-lg font-medium text-gray-900">Delete Blog Post</h3>
                </div>

                <p className="text-gray-500 mb-6">Are you sure you want to delete "{blog.title}"? This action cannot be undone.</p>

                <div className="flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onClick={onConfirm} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
                        {isDeleting ? (
                            <span className="flex items-center">
                                <Loader size={16} className="animate-spin mr-2" />
                                Deleting...
                            </span>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
