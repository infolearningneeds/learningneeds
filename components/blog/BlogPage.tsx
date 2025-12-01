'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Clock, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Blog {
    id: string;
    user_image: string;
    username: string;
    author_name: string;
    author_image: string;
    title: string;
    slug: string;
    long_description: string;
    reaction: number;
    cover_image: string;
    created_at: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blog.reaction);

    // Helper function to strip HTML tags - SSR SAFE
    const stripHtml = (html: string): string => {
        // Check if we're in the browser
        if (typeof window !== 'undefined') {
            const tmp = document.createElement('DIV');
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || '';
        }
        // Server-side fallback: use regex to strip HTML tags
        return html.replace(/<[^>]*>/g, '');
    };

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Helper function to calculate read time
    const calculateReadTime = (content: string): string => {
        const wordsPerMinute = 200;
        const text = stripHtml(content);
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setIsLiked(!isLiked);
        setLikeCount(newLikeCount);

        // Update in database
        try {
            await supabase
                .from('blogs')
                .update({ reaction: newLikeCount })
                .eq('id', blog.id);
        } catch (error) {
            console.error('Error updating reaction:', error);
            // Revert on error
            setIsLiked(isLiked);
            setLikeCount(likeCount);
        }
    };

    return (
        <Link href={`/blog/${blog.slug}`}>
            <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                {/* Cover Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    {blog.cover_image ? (
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-lime-500" />
                    )}

                    {/* Floating Stats Badge */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold text-gray-800">{likeCount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10 rounded-full ring-2 ring-emerald-500/20 overflow-hidden">
                            <Image
                                src={blog.author_image || blog.user_image}
                                alt={blog.author_name || blog.username}
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">
                                {blog.author_name || blog.username}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(blog.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {calculateReadTime(blog.long_description)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                        {stripHtml(blog.long_description)}
                    </p>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
                                    ? 'bg-red-50 text-red-500'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Heart
                                className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''
                                    }`}
                            />
                            <span className="text-sm font-semibold">{likeCount}</span>
                        </button>

                        <div className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold rounded-full group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                            Read More
                        </div>
                    </div>
                </div>

                {/* Decorative Gradient Border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/5 pointer-events-none" />
            </article>
        </Link>
    );
};

// Main Component
const BlogGrid = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setBlogs(data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-lime-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading articles...</p>
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-lime-50/30 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">No articles yet</h2>
                    <p className="text-xl text-gray-600">Check back soon for new content!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-lime-50/30 py-16 px-4">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600 mb-4">
                    Featured Articles
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover insights, tutorials, and stories from our community of developers
                </p>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogGrid;