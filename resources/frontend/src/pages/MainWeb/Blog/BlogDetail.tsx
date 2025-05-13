import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Clock, Share2, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
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

const BlogDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [imageLoadError, setImageLoadError] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            fetchBlogPost();
        }
    }, [id]);

    const fetchBlogPost = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await blogService.fetchBlogs();
            const post = data.find((p) => p.id === id);

            if (post) {
                setBlogPost(post);

                // Fetch related posts from the same category
                const related = data.filter((p) => p.id !== id && p.category === post.category).slice(0, 3);

                // If not enough posts in same category, add from other categories
                if (related.length < 3) {
                    const otherPosts = data.filter((p) => p.id !== id && !related.includes(p)).slice(0, 3 - related.length);
                    related.push(...otherPosts);
                }

                setRelatedPosts(related);
            } else {
                setError('Blog post not found');
            }
        } catch (err: any) {
            setError('Failed to load blog post. Please try again later.');
            console.error('Error fetching blog post:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    const handleImageError = () => {
        setImageLoadError(true);
    };

    if (isLoading) {
        return (
            <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !blogPost) {
        return (
            <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-12">
                            <div className="mb-6">
                                <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Blog post not found'}</h2>
                            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or couldn't be loaded.</p>
                            <button
                                onClick={() => navigate('/blog')}
                                className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="font-sans bg-gradient-to-b from-yellow-50 to-white min-h-screen">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button onClick={() => navigate('/blog')} className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </button>

                    {/* Main Article */}
                    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Hero Image */}
                        <div className="h-64 md:h-96 overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-50">
                            {blogPost.image && !imageLoadError ? (
                                <img src={blogPost.image} alt={blogPost.title} className="w-full h-full object-cover" onError={handleImageError} />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <FileText className="h-20 w-20 text-yellow-600" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Category and Tags */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-800 bg-yellow-200 rounded-full">{blogPost.category}</span>
                                {blogPost.readTime && (
                                    <span className="flex items-center text-xs text-gray-500">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {blogPost.readTime} min read
                                    </span>
                                )}
                                {blogPost.featured && <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Featured</span>}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blogPost.title}</h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    <span>By {blogPost.writer}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>
                                        {new Date(blogPost.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Article Description */}
                            <div className="prose prose-lg max-w-none mb-8">
                                <p className="text-lg leading-relaxed text-gray-700">{blogPost.description}</p>
                            </div>

                            {/* Share Button */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <button onClick={handleShare} className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share Article
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Author Info */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Author</h3>
                        <div className="flex items-start">
                            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
                                <User className="h-8 w-8 text-gray-700" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800">{blogPost.writer}</h4>
                                <p className="text-gray-600 mt-1">
                                    {blogPost.writer} is a passionate writer covering various topics in {blogPost.category}. With years of experience in the field, they bring valuable insights and
                                    practical advice to readers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Related Articles</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((post) => (
                                    <div key={post.id} className="cursor-pointer" onClick={() => navigate(`/blog/detail/${post.id}`)}>
                                        <div className="h-32 rounded-lg overflow-hidden mb-3">
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="h-full bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
                                                    <FileText className="h-8 w-8 text-yellow-600" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-gray-800 mb-1 line-clamp-2 hover:text-yellow-600 transition-colors">{post.title}</h4>
                                        <p className="text-sm text-gray-600">{post.category}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;
