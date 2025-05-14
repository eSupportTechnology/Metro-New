import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, ArrowRight, FileText, Search, RefreshCw, TrendingUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../NavBar/Header';
import Footer from '../Footer/Footer';
import blogService from '../../../services/blog/blogService';

interface BlogPost {
    id: string;
    title: string;
    category: string;
    image: string | null;
    writer: string;
    date: string;
    description: string;
    readTime?: number;
    featured?: boolean;
}

const POSTS_PER_PAGE = 9;

const BlogPage = () => {
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchBlogData();
    }, []);

    const fetchBlogData = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await blogService.fetchBlogs();
            setBlogPosts(data);
        } catch (err: any) {
            setError('Failed to load blog posts. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReadMore = (postId: string) => {
        navigate(`/blog/detail/${postId}`);
    };

    const handleRetry = () => {
        fetchBlogData();
    };

    const handleImageError = (postId: string) => {
        setImageLoadErrors((prev) => new Set(prev).add(postId));
    };

    const filteredPosts = useMemo(() => {
        let filtered = blogPosts;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        return filtered;
    }, [blogPosts, selectedCategory, searchQuery]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(blogPosts.map((post) => post.category)));
        return ['all', ...uniqueCategories];
    }, [blogPosts]);

    const featuredPosts = useMemo(() => {
        return blogPosts.filter((post) => post.featured).slice(0, 3);
    }, [blogPosts]);

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
    );

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">Our Blog</h1>

                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-yellow-400 text-gray-800 shadow-md transform scale-105'
                                            : 'bg-white text-gray-600 hover:bg-yellow-100 border border-gray-200'
                                    }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="max-w-md mx-auto mb-8 p-6 bg-red-50 rounded-lg text-center">
                            <p className="text-red-700 mb-4">{error}</p>
                            <button onClick={handleRetry} className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry
                            </button>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, index) => (
                                <LoadingSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {featuredPosts.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                        <TrendingUp className="mr-2 h-6 w-6 text-yellow-600" />
                                        Featured Articles
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {featuredPosts.map((post) => (
                                            <article
                                                key={post.id}
                                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-yellow-400"
                                                onClick={() => handleReadMore(post.id)}
                                            >
                                                <div className="h-40 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                                                    <TrendingUp className="h-12 w-12 text-yellow-600" />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                                                    <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {paginatedPosts.length > 0 ? (
                                <>
                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {paginatedPosts.map((post, index) => (
                                            <article
                                                key={post.id}
                                                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="h-48 overflow-hidden cursor-pointer relative group" onClick={() => handleReadMore(post.id)}>
                                                    {post.image && !imageLoadErrors.has(post.id) ? (
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            onError={() => handleImageError(post.id)}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
                                                            <FileText className="h-12 w-12 text-yellow-500" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                                </div>

                                                <div className="p-6">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-800 bg-yellow-200 rounded-full">{post.category}</span>
                                                        {post.readTime && (
                                                            <span className="flex items-center text-xs text-gray-500">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {post.readTime} min read
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h2
                                                        className="text-xl font-bold text-gray-800 mb-3 hover:text-yellow-600 transition-colors cursor-pointer line-clamp-2"
                                                        onClick={() => handleReadMore(post.id)}
                                                    >
                                                        {post.title}
                                                    </h2>

                                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                                        <div className="flex items-center mr-6">
                                                            <User className="h-4 w-4 mr-1" />
                                                            <span>{post.writer}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            <span>
                                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.description}</p>

                                                    <button
                                                        onClick={() => handleReadMore(post.id)}
                                                        className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Read More
                                                        <ArrowRight className="ml-1 h-4 w-4" />
                                                    </button>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="mt-12 flex justify-center items-center gap-4">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>

                                            <div className="flex gap-2">
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        className={`px-4 py-2 rounded-md font-medium ${
                                                            currentPage === index + 1 ? 'bg-yellow-400 text-gray-800' : 'bg-white text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg mb-4">No blog posts found.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                        }}
                                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;
