import React, { useState } from 'react';
import { Loader, PlusCircle, RefreshCw } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlogPost, BlogFormData } from '../../../utilities/types/Blog/IBlog';
import { useBlogs } from '../../../hooks/blog/useBlogs';
import { useBlogActions } from '../../../hooks/blog/useBlogActions';
import { useBlogFilters } from '../../../hooks/blog/useBlogFilters';
import { useBlogSort } from '../../../hooks/blog/useBlogSort';
import { BLOGS_PER_PAGE, defaultFormData, sortOptions } from '../../../constants/blog/blogConstants';
import Spinner from '../../../components/Loader/Spinner';
import Pagination from '../../../components/matrimony/Common/Pagination';
import SearchFilter from '../../../components/matrimony/Filters/SearchFilter';
import ActiveFilters from '../../../components/matrimony/Filters/ActiveFilters';
import SortDropdown from '../../../components/matrimony/Controls/SortDropdown';
import BlogTableRow from '../../../components/blog/BlogTable/BlogTableRow';
import BlogViewModal from '../../../components/blog/Modals/BlogViewModal';
import BlogFormModal from '../../../components/blog/Modals/BlogFormModal';
import DeleteConfirmationModal from '../../../components/blog/Modals/DeleteConfirmationModal';
import BlogEmptyState from '../../../components/blog/Common/BlogEmptyState';

const Blog: React.FC = () => {
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [showViewModal, setShowViewModal] = useState<boolean>(false);
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<BlogFormData>(defaultFormData);
    const { blogs, setBlogs, isLoading, error, fetchBlogs } = useBlogs();
    const { isActionLoading, deleteBlog, createBlog, updateBlog } = useBlogActions(blogs, setBlogs);
    const { searchFilter, setSearchFilter, activeFilters, toggleFilter, clearAllFilters, getActiveFiltersCount, filteredBlogs } = useBlogFilters(blogs);
    const { sortField, sortDirection, handleSort, sortedBlogs } = useBlogSort(filteredBlogs);
    const indexOfLastBlog = currentPage * BLOGS_PER_PAGE;
    const indexOfFirstBlog = indexOfLastBlog - BLOGS_PER_PAGE;
    const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(sortedBlogs.length / BLOGS_PER_PAGE);
    const handleFormChange = (data: Partial<BlogFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setFormData((prev) => ({ ...prev, image: null }));
        setImagePreview(null);
        setImageFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditMode && selectedBlog) {
                await updateBlog(selectedBlog.id, formData);
            } else {
                await createBlog(formData);
            }
            setShowFormModal(false);
            resetForm();
        } catch (err) {}
    };

    const resetForm = () => {
        setFormData(defaultFormData);
        setImagePreview(null);
        setImageFile(null);
        setIsEditMode(false);
        setSelectedBlog(null);
    };
    const handleEdit = (blog: BlogPost) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            image: null,
            writer: blog.writer,
            date: blog.date,
            description: blog.description,
        });
        setImagePreview(blog.image);
        setIsEditMode(true);
        setShowFormModal(true);
    };

    const handleDelete = async () => {
        if (selectedBlog) {
            await deleteBlog(selectedBlog.id);
            setShowDeleteModal(false);
            setSelectedBlog(null);
        }
    };

    return (
        <div className="container mx-auto  font-sans">
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">Blog Management</h1>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => {
                                    resetForm();
                                    setShowFormModal(true);
                                }}
                                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                            >
                                <PlusCircle size={20} className="mr-2" />
                                Create New Blog
                            </button>

                            <button onClick={fetchBlogs} className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" disabled={isLoading}>
                                <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-yellow-600' : 'text-gray-600'}`} />
                                Refresh
                            </button>

                            <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                                {sortedBlogs.length} {sortedBlogs.length === 1 ? 'blog' : 'blogs'} found
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row gap-3">
                            <SearchFilter
                                searchFilter={searchFilter}
                                onSearchChange={(value) => {
                                    setSearchFilter(value);
                                    setCurrentPage(1);
                                }}
                            />

                            <SortDropdown sortField={sortField} sortDirection={sortDirection} sortOptions={sortOptions} onSort={(field, direction) => handleSort(field, direction || 'asc')} />
                        </div>

                        <ActiveFilters
                            searchFilter={searchFilter}
                            activeFilters={activeFilters}
                            onClearSearchFilter={() => setSearchFilter('')}
                            onToggleFilter={toggleFilter}
                            onClearAllFilters={clearAllFilters}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="flex flex-col items-center">
                                <Loader className="animate-spin text-yellow-500 h-8 w-8 mb-3" />
                                <span className="text-gray-600">Loading blog posts...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Writer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentBlogs.map((blog) => (
                                            <BlogTableRow
                                                key={blog.id}
                                                blog={blog}
                                                onViewBlog={(blog) => {
                                                    setSelectedBlog(blog);
                                                    setShowViewModal(true);
                                                }}
                                                onEditBlog={handleEdit}
                                                onDeleteBlog={(blog) => {
                                                    setSelectedBlog(blog);
                                                    setShowDeleteModal(true);
                                                }}
                                                isActionLoading={isActionLoading}
                                            />
                                        ))}

                                        {currentBlogs.length === 0 && !isLoading && <BlogEmptyState hasFilters={searchFilter !== '' || getActiveFiltersCount() > 0} onClearFilters={clearAllFilters} />}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className="bg-gray-50 px-4 py-3">
                                    <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={sortedBlogs.length} itemsPerPage={BLOGS_PER_PAGE} onPageChange={setCurrentPage} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showViewModal && selectedBlog && <BlogViewModal blog={selectedBlog} onClose={() => setShowViewModal(false)} onEdit={handleEdit} />}

            {showFormModal && (
                <BlogFormModal
                    isEditMode={isEditMode}
                    formData={formData}
                    imagePreview={imagePreview}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        setShowFormModal(false);
                        resetForm();
                    }}
                    onFormChange={handleFormChange}
                    onImageUpload={handleImageUpload}
                    onImageRemove={handleImageRemove}
                />
            )}

            {showDeleteModal && selectedBlog && (
                <DeleteConfirmationModal
                    blog={selectedBlog}
                    isDeleting={isActionLoading[`delete_${selectedBlog.id}`]}
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setSelectedBlog(null);
                    }}
                />
            )}
        </div>
    );
};

export default Blog;
