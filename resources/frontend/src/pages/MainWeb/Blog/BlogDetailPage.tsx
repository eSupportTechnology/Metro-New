import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag, RefreshCw, FileText, ChevronRight } from 'lucide-react';
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

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [imageLoadError, setImageLoadError] = useState<boolean>(false);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (id) {
            fetchBlogDetail();
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const fetchBlogDetail = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await blogService.getBlogById(id!);
            setBlogPost(data);
            const allPosts = await blogService.fetchBlogs();
            const related = allPosts.filter((post) => post.category === data.category && post.id !== data.id).slice(0, 3);
            setRelatedPosts(related);
        } catch (err: any) {
            setError('Failed to load blog post. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        fetchBlogDetail();
    };

    const handleImageError = () => {
        setImageLoadError(true);
    };

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-[500px] bg-gray-200 rounded-2xl mb-8"></div>
            <div className="max-w-4xl mx-auto px-4">
                <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="font-sans bg-gray-50 min-h-screen">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <LoadingSkeleton />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !blogPost) {
        return (
            <div className="font-sans bg-gray-50 min-h-screen">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-lg mx-auto">
                        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="h-10 w-10 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
                            <p className="text-gray-600 mb-8">{error || 'Blog post not found'}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleRetry}
                                    className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    <RefreshCw className="mr-2 h-5 w-5" />
                                    Try Again
                                </button>
                                <button
                                    onClick={() => navigate('/blog')}
                                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Back to Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <Header />

            <main className="pt-24 pb-16">
                <div className="relative h-[500px] overflow-hidden mb-16">
                    {blogPost.image && !imageLoadError ? (
                        <img src={blogPost.image} alt={blogPost.title} className="w-full h-full object-cover" onError={handleImageError} loading="lazy" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-300 flex items-center justify-center">
                            <FileText className="h-32 w-32 text-white opacity-50" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="max-w-5xl mx-auto">
                            <button onClick={() => navigate('/blog')} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300 group">
                                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                                Back to Articles
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-block px-4 py-1.5 text-sm font-bold bg-yellow-400 text-gray-900 rounded-full">{blogPost.category}</span>
                                {blogPost.featured && <span className="inline-block px-4 py-1.5 text-sm font-bold bg-orange-500 text-white rounded-full">Featured</span>}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{blogPost.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                                        <User className="h-5 w-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Written by</p>
                                        <p className="font-semibold">{blogPost.writer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        <span>
                                            {new Date(blogPost.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    {blogPost.readTime && (
                                        <div className="flex items-center">
                                            <Clock className="h-5 w-5 mr-2" />
                                            <span>{blogPost.readTime} min read</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <article className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{blogPost.description}</p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <Tag className="h-5 w-5 text-gray-400" />
                                <span className="font-semibold text-gray-700">Category:</span>
                                <div className="flex gap-2">
                                    <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">{blogPost.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 mb-16 shadow-lg">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-6">
                                <User className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">About the Author</h3>
                                <p className="text-lg font-semibold text-gray-700">{blogPost.writer}</p>
                            </div>
                        </div>
                    </div>
                </article>

                {relatedPosts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Articles</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Discover more articles in the same category that might interest you</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                                    onClick={() => navigate(`/blog/detail/${post.id}`)}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        {post.image && !imageLoadError ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                                                <FileText className="h-16 w-16 text-yellow-600" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 text-xs font-bold text-yellow-800 bg-yellow-100 rounded-full mb-3">{post.category}</span>
                                        <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">{post.title}</h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4">{post.description}</p>
                                        <div className="flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                            Read More
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
