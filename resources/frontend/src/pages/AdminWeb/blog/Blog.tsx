import React, { useState, useEffect, useMemo } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Eye,
    Filter,
    Loader,
    ArrowDown,
    Search,
    RefreshCw,
    X,
    Star,
    CheckCircle,
    ToggleLeft,
    ToggleRight,
    PlusCircle,
    Edit2,
    Trash2,
    Calendar,
    User,
    Tag,
    FileText,
} from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Loader/Spinner';
import Header from '../../MainWeb/NavBar/Header';
import Footer from '../../MainWeb/Footer/Footer';

// Blog type definitions
interface BlogPost {
    id: string;
    title: string;
    category: string;
    image: string | null;
    writer: string;
    date: string;
    description: string;
    is_featured?: boolean;
    is_published?: boolean;
    views?: number;
    read_time?: string;
}

interface BlogFormData {
    title: string;
    category: string;
    image: string | null;
    writer: string;
    date: string;
    description: string;
    is_featured: boolean;
    is_published: boolean;
}

// Sort options
const sortOptions = [
    { label: 'Latest First', field: 'date', direction: 'desc' },
    { label: 'Oldest First', field: 'date', direction: 'asc' },
    { label: 'Title: A to Z', field: 'title', direction: 'asc' },
    { label: 'Title: Z to A', field: 'title', direction: 'desc' },
    { label: 'Category: A to Z', field: 'category', direction: 'asc' },
    { label: 'Category: Z to A', field: 'category', direction: 'desc' },
    { label: 'Most Viewed', field: 'views', direction: 'desc' },
    { label: 'Least Viewed', field: 'views', direction: 'asc' },
];

// Filter categories
const filterCategories = [
    {
        name: 'status',
        label: 'Status',
        options: [
            { value: 'published', label: 'Published', filter: (blog: BlogPost) => blog.is_published === true },
            { value: 'draft', label: 'Draft', filter: (blog: BlogPost) => blog.is_published === false },
        ],
    },
    {
        name: 'featured',
        label: 'Featured',
        options: [
            { value: 'featured', label: 'Featured', filter: (blog: BlogPost) => blog.is_featured === true },
            { value: 'regular', label: 'Regular', filter: (blog: BlogPost) => blog.is_featured === false },
        ],
    },
    {
        name: 'category',
        label: 'Category',
        options: [
            { value: 'News', label: 'News', filter: (blog: BlogPost) => blog.category === 'News' },
            { value: 'Events', label: 'Events', filter: (blog: BlogPost) => blog.category === 'Events' },
            { value: 'Tips', label: 'Tips', filter: (blog: BlogPost) => blog.category === 'Tips' },
        ],
    },
];

const Blog: React.FC = () => {
    // State variables
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [showViewModal, setShowViewModal] = useState<boolean>(false);
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortField, setSortField] = useState<string>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActionLoading, setIsActionLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        category: 'News',
        image: null,
        writer: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        is_featured: false,
        is_published: false,
    });

    // Advanced filtering states
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);

    const blogsPerPage = 10;

    // Fetch blogs on mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch blogs
    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/blogs');
            const data = response.data;

            if (data.status === 'success') {
                // Add default values for missing fields
                const enrichedData = data.data.map((blog: BlogPost) => ({
                    ...blog,
                    is_featured: blog.is_featured ?? false,
                    is_published: blog.is_published ?? true,
                    views: blog.views ?? Math.floor(Math.random() * 1000),
                    read_time: blog.read_time ?? `${Math.floor(blog.description.length / 200)} min read`,
                }));
                setBlogs(enrichedData);
            } else {
                throw new Error(data.message || 'Failed to fetch blogs');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
            // Use mock data for development
            const mockData: BlogPost[] = [
                {
                    id: '0196c215-bf11-71a3-93f2-9f0f5f94343f',
                    title: 'The Ultimate Guide to Finding Your Perfect Match',
                    category: 'Tips',
                    image: null,
                    writer: 'Sarah Johnson',
                    date: '2024-01-15',
                    description:
                        'Discover expert tips and strategies for navigating the modern dating landscape. Learn how to create an authentic profile, communicate effectively, and build meaningful connections.',
                    is_featured: true,
                    is_published: true,
                    views: 1250,
                    read_time: '5 min read',
                },
                {
                    id: '0196c215-bf78-7288-b29c-ef9c5f29657c',
                    title: 'Traditional vs Modern Wedding Ceremonies',
                    category: 'Events',
                    image: null,
                    writer: 'Michael Chen',
                    date: '2024-01-10',
                    description: 'Exploring the balance between cultural traditions and contemporary preferences in wedding ceremonies. Find inspiration for your special day.',
                    is_featured: false,
                    is_published: true,
                    views: 890,
                    read_time: '8 min read',
                },
                {
                    id: '0196c215-bf79-7065-ab40-9746709ddb49',
                    title: 'Latest Matchmaking Trends in 2024',
                    category: 'News',
                    image: null,
                    writer: 'Emma Thompson',
                    date: '2024-01-05',
                    description: 'Stay updated with the latest trends in matchmaking and online dating. From AI-powered matching to virtual reality dates.',
                    is_featured: false,
                    is_published: false,
                    views: 450,
                    read_time: '3 min read',
                },
            ];
            setBlogs(mockData);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle featured status
    const toggleFeatured = async (blogId: string) => {
        setIsActionLoading((prev) => ({ ...prev, [`featured_${blogId}`]: true }));
        try {
            const blog = blogs.find((b) => b.id === blogId);
            if (!blog) return;

            const response = await axios.put(`/api/blogs/${blogId}/featured`, {
                is_featured: !blog.is_featured,
            });

            if (response.data.status === 'success') {
                setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === blogId ? { ...b, is_featured: !b.is_featured } : b)));
                toast.success(`Blog ${!blog.is_featured ? 'featured' : 'unfeatured'} successfully`);
            }
        } catch (err) {
            toast.error('Failed to update featured status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`featured_${blogId}`]: false }));
        }
    };

    // Toggle published status
    const togglePublished = async (blogId: string) => {
        setIsActionLoading((prev) => ({ ...prev, [`published_${blogId}`]: true }));
        try {
            const blog = blogs.find((b) => b.id === blogId);
            if (!blog) return;

            const response = await axios.put(`/api/blogs/${blogId}/publish`, {
                is_published: !blog.is_published,
            });

            if (response.data.status === 'success') {
                setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === blogId ? { ...b, is_published: !b.is_published } : b)));
                toast.success(`Blog ${!blog.is_published ? 'published' : 'unpublished'} successfully`);
            }
        } catch (err) {
            toast.error('Failed to update publish status');
        } finally {
            setIsActionLoading((prev) => ({ ...prev, [`published_${blogId}`]: false }));
        }
    };

    // Delete blog
    const deleteBlog = async () => {
        if (!selectedBlog) return;

        setIsActionLoading((prev) => ({ ...prev, [`delete_${selectedBlog.id}`]: true }));
        try {
            const response = await axios.delete(`/api/blogs/${selectedBlog.id}`);

            if (response.data.status === 'success') {
                setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== selectedBlog.id));
                setShowDeleteModal(false);
                setSelectedBlog(null);
                toast.success('Blog deleted successfully');
            }
        } catch (err) {
            toast.error('Failed to delete blog');
        } finally {
            setIsActionLoading((prev) => ({
                ...prev,
                [`delete_${selectedBlog.id}`]: false,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const apiUrl = isEditMode && selectedBlog ? `/api/blogs/${selectedBlog.id}` : '/api/blogs';
        const method = isEditMode ? 'put' : 'post';

        try {
            const response = await axios[method](apiUrl, formData);

            if (response.data.status === 'success') {
                if (isEditMode) {
                    setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === selectedBlog?.id ? { ...b, ...formData } : b)));
                    toast.success('Blog updated successfully');
                } else {
                    const newBlog: BlogPost = {
                        id: Date.now().toString(),
                        ...formData,
                        views: 0,
                        read_time: `${Math.floor(formData.description.length / 200)} min read`,
                    };
                    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
                    toast.success('Blog created successfully');
                }

                setShowFormModal(false);
                resetForm();
            }
        } catch (err) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} blog`);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            category: 'News',
            image: null,
            writer: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
            is_featured: false,
            is_published: false,
        });
        setImagePreview(null);
        setIsEditMode(false);
        setSelectedBlog(null);
    };

    // Handle edit
    const handleEdit = (blog: BlogPost) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            image: blog.image,
            writer: blog.writer,
            date: blog.date,
            description: blog.description,
            is_featured: blog.is_featured || false,
            is_published: blog.is_published !== undefined ? blog.is_published : true,
        });
        setImagePreview(blog.image);
        setIsEditMode(true);
        setShowFormModal(true);
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData((prev) => ({ ...prev, image: result }));
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Apply filters
    const filteredBlogs = useMemo(() => {
        let result = [...blogs];

        // Apply text search
        if (searchFilter) {
            const lowerFilter = searchFilter.toLowerCase();
            result = result.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(lowerFilter) ||
                    blog.description.toLowerCase().includes(lowerFilter) ||
                    blog.writer.toLowerCase().includes(lowerFilter) ||
                    blog.category.toLowerCase().includes(lowerFilter),
            );
        }

        // Apply category filters
        Object.entries(activeFilters).forEach(([category, values]) => {
            if (values.length > 0) {
                const categoryFilters = filterCategories.find((c) => c.name === category);
                if (categoryFilters) {
                    const filtersToApply = categoryFilters.options.filter((option) => values.includes(option.value)).map((option) => option.filter);

                    if (filtersToApply.length > 0) {
                        result = result.filter((blog) => filtersToApply.some((filterFn) => filterFn(blog)));
                    }
                }
            }
        });

        return result;
    }, [blogs, searchFilter, activeFilters]);

    // Apply sorting
    const sortedBlogs = useMemo(() => {
        if (!sortField) return filteredBlogs;

        return [...filteredBlogs].sort((a, b) => {
            let aValue = a[sortField as keyof BlogPost];
            let bValue = b[sortField as keyof BlogPost];

            // Handle date comparisons
            if (sortField === 'date') {
                const dateA = aValue ? new Date(aValue as string).getTime() : 0;
                const dateB = bValue ? new Date(bValue as string).getTime() : 0;
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Handle number comparisons
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // Handle string sorting
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredBlogs, sortField, sortDirection]);

    // Toggle filter
    const toggleFilter = (category: string, value: string) => {
        setActiveFilters((prev) => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];

            return {
                ...prev,
                [category]: newValues.length > 0 ? newValues : [],
            };
        });
        setCurrentPage(1);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSearchFilter('');
        setActiveFilters({});
        setCurrentPage(1);
    };

    // Get active filters count
    const getActiveFiltersCount = () => {
        return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
    };

    // Pagination
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="max-w-7xl mx-auto mt-14 pt-6 px-4">
                {/* Page Header */}
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

                    {/* Search and filters */}
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search blogs by title, content, writer..."
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    value={searchFilter}
                                    onChange={(e) => {
                                        setSearchFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                {searchFilter && (
                                    <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" onClick={() => setSearchFilter('')}>
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Sort dropdown */}
                            <div className="relative">
                                <button onClick={() => setSortDropdownOpen(!sortDropdownOpen)} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                                    <ArrowDown size={16} className="mr-2" />
                                    Sort
                                    {sortField && (
                                        <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                            {sortOptions.find((o) => o.field === sortField && o.direction === sortDirection)?.label || 'Custom'}
                                        </span>
                                    )}
                                </button>

                                {sortDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                                        <div className="py-1">
                                            {sortOptions.map((option, index) => (
                                                <button
                                                    key={index}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                                                    onClick={() => {
                                                        setSortField(option.field);
                                                        setSortDirection(option.direction);
                                                        setSortDropdownOpen(false);
                                                    }}
                                                >
                                                    {option.field === sortField && option.direction === sortDirection ? (
                                                        <CheckCircle size={14} className="mr-2 text-yellow-600" />
                                                    ) : (
                                                        <div className="w-4 h-4 mr-2" />
                                                    )}
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filter dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                                        getActiveFiltersCount() > 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Filter size={16} className="mr-2" />
                                    Filters
                                    {getActiveFiltersCount() > 0 && (
                                        <span className="ml-2 bg-white text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">{getActiveFiltersCount()}</span>
                                    )}
                                </button>

                                {filterDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-sm font-medium text-gray-700">Filters</h3>
                                            <button onClick={clearAllFilters} className="text-xs text-yellow-600 hover:text-yellow-800">
                                                Clear all
                                            </button>
                                        </div>

                                        {filterCategories.map((category) => (
                                            <div key={category.name} className="mb-3">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">{category.label}</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {category.options.map((option) => {
                                                        const isActive = (activeFilters[category.name] || []).includes(option.value);
                                                        return (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => toggleFilter(category.name, option.value)}
                                                                className={`px-3 py-1 text-xs rounded-full ${
                                                                    isActive ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                                }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Active filters display */}
                        {(searchFilter || getActiveFiltersCount() > 0) && (
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-600">Active filters:</span>

                                {searchFilter && (
                                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                        Search: {searchFilter}
                                        <button onClick={() => setSearchFilter('')} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}

                                {Object.entries(activeFilters).map(([category, values]) =>
                                    values.map((value) => {
                                        const categoryConfig = filterCategories.find((c) => c.name === category);
                                        const optionConfig = categoryConfig?.options.find((o) => o.value === value);

                                        return (
                                            <div key={`${category}-${value}`} className="flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                                                {categoryConfig?.label}: {optionConfig?.label}
                                                <button onClick={() => toggleFilter(category, value)} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        );
                                    }),
                                )}

                                <button onClick={clearAllFilters} className="ml-2 text-xs text-yellow-600 hover:text-yellow-800 underline">
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Blog table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="flex flex-col items-center">
                                <Spinner size="lg" color="yellow-500" text="Loading blog posts..." />
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentBlogs.map((blog) => (
                                            <tr key={blog.id} className={`${blog.is_featured ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition-colors`}>
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
                                                            <div className="text-sm text-gray-500">{blog.read_time}</div>
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
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => togglePublished(blog.id)}
                                                        disabled={isActionLoading[`published_${blog.id}`]}
                                                        className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                            blog.is_published ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {isActionLoading[`published_${blog.id}`] ? (
                                                            <Loader size={12} className="animate-spin mr-1" />
                                                        ) : blog.is_published ? (
                                                            <ToggleRight size={12} className="mr-1 text-green-600" />
                                                        ) : (
                                                            <ToggleLeft size={12} className="mr-1 text-gray-600" />
                                                        )}
                                                        {blog.is_published ? 'Published' : 'Draft'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => toggleFeatured(blog.id)}
                                                        disabled={isActionLoading[`featured_${blog.id}`]}
                                                        className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                            blog.is_featured ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {isActionLoading[`featured_${blog.id}`] ? (
                                                            <Loader size={12} className="animate-spin mr-1" />
                                                        ) : (
                                                            <Star size={12} className={`mr-1 ${blog.is_featured ? 'fill-yellow-500' : ''}`} />
                                                        )}
                                                        {blog.is_featured ? 'Featured' : 'Regular'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blog.views?.toLocaleString() || '0'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBlog(blog);
                                                            setShowViewModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button onClick={() => handleEdit(blog)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBlog(blog);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {currentBlogs.length === 0 && !isLoading && (
                                            <tr>
                                                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                                    <div className="flex flex-col items-center">
                                                        <FileText size={48} className="text-gray-400 mb-2" />
                                                        <p className="mb-2">No blogs found</p>
                                                        {(searchFilter || getActiveFiltersCount() > 0) && (
                                                            <button onClick={clearAllFilters} className="text-yellow-600 hover:text-yellow-800 text-sm underline">
                                                                Clear all filters
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{indexOfFirstBlog + 1}</span> to <span className="font-medium">{Math.min(indexOfLastBlog, sortedBlogs.length)}</span>{' '}
                                            of <span className="font-medium">{sortedBlogs.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        currentPage === i + 1 ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* View Modal */}
            {showViewModal && selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">View Blog Post</h2>
                                <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {selectedBlog.image && <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-lg" />}

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedBlog.title}</h3>

                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center">
                                            <User size={16} className="mr-1" />
                                            {selectedBlog.writer}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-1" />
                                            {new Date(selectedBlog.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <Tag size={16} className="mr-1" />
                                            {selectedBlog.category}
                                        </div>
                                        <div className="flex items-center">
                                            <Eye size={16} className="mr-1" />
                                            {selectedBlog.views} views
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 mb-4">
                                        {selectedBlog.is_featured && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Featured</span>}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedBlog.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {selectedBlog.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>

                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowViewModal(false);
                                        handleEdit(selectedBlog);
                                    }}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                                >
                                    Edit Blog
                                </button>
                                <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                                <button
                                    onClick={() => {
                                        setShowFormModal(false);
                                        resetForm();
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
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
                                            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        >
                                            <option value="News">News</option>
                                            <option value="Events">Events</option>
                                            <option value="Tips">Tips</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Writer <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.writer}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, writer: e.target.value }))}
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
                                            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_published}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">Published</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_featured}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">Featured</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                        rows={6}
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
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData((prev) => ({ ...prev, image: null }));
                                                            setImagePreview(null);
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500">
                                                            <span>Upload a file</span>
                                                            <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowFormModal(false);
                                            resetForm();
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
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
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center mb-4">
                            <Trash2 className="h-8 w-8 text-red-500 mr-3" />
                            <h3 className="text-lg font-medium text-gray-900">Delete Blog Post</h3>
                        </div>

                        <p className="text-gray-500 mb-6">Are you sure you want to delete "{selectedBlog.title}"? This action cannot be undone.</p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedBlog(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteBlog}
                                disabled={isActionLoading[`delete_${selectedBlog.id}`]}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                {isActionLoading[`delete_${selectedBlog.id}`] ? (
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
            )}

            <Footer />
        </div>
    );
};

export default Blog;
