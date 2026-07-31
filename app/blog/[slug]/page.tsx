'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, User, Heart } from 'lucide-react';
import { useParams } from 'next/navigation';
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

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [reactionCount, setReactionCount] = useState<number>(0);
  const [hasReacted, setHasReacted] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;

      if (data) {
        setCurrentBlog(data);
        setReactionCount(data.reaction || 0);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .neq('slug', slug)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      setRelatedBlogs(data || []);
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  async function handleReaction(): Promise<void> {
    if (isLiking || !currentBlog) return;
    setIsLiking(true);

    try {
      const newReactionCount = hasReacted ? Math.max(0, reactionCount - 1) : reactionCount + 1;
      
      // Update in database
      const { error } = await supabase
        .from('blogs')
        .update({ reaction: newReactionCount })
        .eq('id', currentBlog.id);

      if (error) throw error;

      setReactionCount(newReactionCount);
      setHasReacted(!hasReacted);
    } catch (error) {
      console.error('Error updating reaction:', error);
    } finally {
      setTimeout(() => {
        setIsLiking(false);
      }, 300);
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function calculateReadTime(html: string): string {
    if (typeof document === 'undefined') return '5 min read';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  function handleShare(): void {
    if (navigator.share) {
      navigator.share({
        title: currentBlog!.title,
        text: currentBlog!.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // If blog not found, show 404
  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-emerald-600 hover:text-emerald-700">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Header */}
      <div className="w-full bg-[#1a1a1a] border-b border-gray-800 py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Articles</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight max-w-5xl mx-auto text-white">
            {currentBlog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentBlog.created_at)}</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{calculateReadTime(currentBlog.long_description)}</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{currentBlog.author_name || currentBlog.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              {currentBlog.cover_image && (
                <div className="relative w-full h-[350px] md:h-[550px] mb-16 overflow-hidden">
                  <Image
                    src={currentBlog.cover_image}
                    alt={currentBlog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <article>
                <div
                  className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                  prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-gray-400 hover:prose-a:decoration-gray-900 prose-a:transition-colors
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-base
                  prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:text-gray-800
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-ul:text-gray-700 prose-ul:text-lg
                  prose-ol:text-gray-700 prose-ol:text-lg
                  prose-li:my-2 prose-li:leading-relaxed
                  prose-img:rounded-none"
                  dangerouslySetInnerHTML={{ __html: currentBlog.long_description }}
                />

                {/* Divider */}
                <div className="my-16 border-t border-gray-200"></div>

                {/* Engagement Section */}
                <div className="flex flex-wrap items-center gap-6">
                  <button
                    onClick={handleReaction}
                    disabled={isLiking}
                    className={`flex items-center gap-3 px-6 py-3 border transition-all font-medium ${
                      hasReacted
                        ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                        : 'bg-transparent text-gray-900 border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${isLiking ? 'animate-pulse' : ''}`}
                      fill={hasReacted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <span>{reactionCount}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-3 px-6 py-3 border border-gray-300 bg-transparent text-gray-900 hover:border-gray-900 transition-all font-medium"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </article>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-12">
                
                {/* Author Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-medium">Written By</h3>
                  
                  <div className="flex items-start gap-4 mb-8">
                    <div className="relative flex-shrink-0 w-14 h-14">
                      <Image
                        src={currentBlog.author_image || currentBlog.user_image}
                        alt={currentBlog.author_name || currentBlog.username}
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-xl text-gray-900 mb-1">
                        {currentBlog.author_name || currentBlog.username}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Content creator sharing insights and knowledge with the community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-medium">Article Info</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Published</span>
                      <span className="text-gray-900 font-medium">{formatDate(currentBlog.created_at)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reading Time</span>
                      <span className="text-gray-900 font-medium">{calculateReadTime(currentBlog.long_description)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reactions</span>
                      <span className="text-gray-900 font-medium">{reactionCount}</span>
                    </div>
                  </div>
                </div>

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-medium">More Articles</h3>
                    
                    <div className="space-y-8">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link
                          key={relatedBlog.id}
                          href={`/blog/${relatedBlog.slug}`}
                          className="group block w-full"
                        >
                          {relatedBlog.cover_image && (
                            <div className="relative w-full h-32 mb-4 overflow-hidden">
                              <Image
                                src={relatedBlog.cover_image}
                                alt={relatedBlog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          
                          <h4 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                            {relatedBlog.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(relatedBlog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/blog"
                      className="mt-8 block w-full text-center py-3 border border-gray-300 text-gray-900 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all font-medium"
                    >
                      View All Articles
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}