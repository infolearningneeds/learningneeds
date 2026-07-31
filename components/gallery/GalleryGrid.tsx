/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface GalleryItem {
    id: string;
    image_url: string;
    category: 'training' | 'school';
    created_at: string;
}

const GalleryGrid: React.FC = () => {
    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<'all' | 'training' | 'school'>('all');
    const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});
    const [page, setPage] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    const ITEMS_PER_PAGE = 12;

    // Fetch gallery data from API
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/gallery');
                
                if (response.ok) {
                    const data = await response.json();
                    setGalleryData(data.images || []);
                } else {
                    console.error('Failed to fetch gallery');
                }
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Get filtered data based on active category
    const getFilteredData = useCallback(() => {
        if (activeCategory === 'all') {
            return galleryData;
        }
        return galleryData.filter(item => item.category === activeCategory);
    }, [activeCategory, galleryData]);

    const filteredData = getFilteredData();

    useEffect(() => {
        // Reset and load initial items when category changes
        setDisplayedItems([]);
        setPage(0);
        
        setTimeout(() => {
            const filtered = getFilteredData();
            setDisplayedItems(filtered.slice(0, ITEMS_PER_PAGE));
            setPage(1);
        }, 300);
    }, [activeCategory, getFilteredData]);

    // Infinite scroll observer
    useEffect(() => {
        if (loading || loadingMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && displayedItems.length < filteredData.length) {
                    loadMoreItems();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (lastItemRef.current) {
            observerRef.current.observe(lastItemRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [displayedItems, filteredData, loading, loadingMore]);

    const loadMoreItems = useCallback(() => {
        if (loadingMore || displayedItems.length >= filteredData.length) return;

        setLoadingMore(true);
        setTimeout(() => {
            const nextPage = page + 1;
            const startIndex = page * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newItems = filteredData.slice(startIndex, endIndex);
            
            setDisplayedItems(prev => [...prev, ...newItems]);
            setPage(nextPage);
            setLoadingMore(false);
        }, 300);
    }, [page, filteredData, displayedItems, loadingMore]);

    const openPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selected) return;
        const idx = filteredData.findIndex(item => item.id === selected.id);
        const prev = filteredData[(idx - 1 + filteredData.length) % filteredData.length];
        setSelected(prev);
    }, [selected, filteredData]);

    const openNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selected) return;
        const idx = filteredData.findIndex(item => item.id === selected.id);
        const next = filteredData[(idx + 1) % filteredData.length];
        setSelected(next);
    }, [selected, filteredData]);

    // Modern masonry-style layout pattern
    const getGridClass = (index: number) => {
        const patterns = [
            "md:col-span-2 md:row-span-2", // Large square
            "md:col-span-1 md:row-span-1", // Normal
            "md:col-span-1 md:row-span-1", // Normal
            "md:col-span-1 md:row-span-2", // Tall
            "md:col-span-2 md:row-span-1", // Wide
            "md:col-span-1 md:row-span-1", // Normal
        ];
        return patterns[index % patterns.length];
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selected) return;
            if (e.key === 'ArrowLeft') openPrev(e as any);
            if (e.key === 'ArrowRight') openNext(e as any);
            if (e.key === 'Escape') setSelected(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selected, openPrev, openNext]);

    const getCategoryCount = (category: 'all' | 'training' | 'school') => {
        if (category === 'all') return galleryData.length;
        return galleryData.filter(item => item.category === category).length;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (galleryData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Expand className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Images Yet</h3>
                    <p className="text-gray-600">Gallery is empty. Images will appear here once uploaded.</p>
                </div>
            </div>
        );
    }

    if (filteredData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Category Filter Tabs */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h2>
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'all'
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            All Images
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'all' 
                                    ? 'bg-white/30' 
                                    : 'bg-blue-100 text-blue-600'
                            }`}>
                                {getCategoryCount('all')}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveCategory('training')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'training'
                                    ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            Training
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'training' 
                                    ? 'bg-white/30' 
                                    : 'bg-purple-100 text-purple-600'
                            }`}>
                                {getCategoryCount('training')}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveCategory('school')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'school'
                                    ? 'bg-green-600 text-white shadow-xl shadow-green-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            School
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'school' 
                                    ? 'bg-white/30' 
                                    : 'bg-green-100 text-green-600'
                            }`}>
                                {getCategoryCount('school')}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Expand className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Images in this category</h3>
                    <p className="text-gray-600">Try selecting a different category</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Category Filter Tabs */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h2>
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'all'
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            All Images
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'all' 
                                    ? 'bg-white/30' 
                                    : 'bg-blue-100 text-blue-600'
                            }`}>
                                {getCategoryCount('all')}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveCategory('training')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'training'
                                    ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            Training
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'training' 
                                    ? 'bg-white/30' 
                                    : 'bg-purple-100 text-purple-600'
                            }`}>
                                {getCategoryCount('training')}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveCategory('school')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                                activeCategory === 'school'
                                    ? 'bg-green-600 text-white shadow-xl shadow-green-600/40 scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border-2 border-gray-200'
                            }`}
                        >
                            School
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                                activeCategory === 'school' 
                                    ? 'bg-white/30' 
                                    : 'bg-green-100 text-green-600'
                            }`}>
                                {getCategoryCount('school')}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Modern Grid with Masonry Effect */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-4">
                    {displayedItems.map((item, i) => (
                        <div
                            key={item.id}
                            ref={i === displayedItems.length - 1 ? lastItemRef : null}
                            onClick={() => setSelected(item)}
                            className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl bg-gray-100 transform transition-all duration-500 hover:-translate-y-1 ${getGridClass(i)}`}
                            style={{
                                animation: `fadeSlideUp 0.6s ease-out ${(i % ITEMS_PER_PAGE) * 0.05}s both`
                            }}
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                {/* Loader */}
                                {!loaded[item.id] && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}

                                {/* Image with lazy loading */}
                                <Image
                                    src={item.image_url}
                                    alt={`${item.category} image`}
                                    fill
                                    loading="lazy"
                                    onLoad={() =>
                                        setLoaded(prev => ({ ...prev, [item.id]: true }))
                                    }
                                    className={`object-cover duration-700 ${loaded[item.id]
                                        ? "opacity-100 group-hover:scale-110"
                                        : "opacity-0"
                                        }`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>

                            {/* Category Badge */}
                            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${
                                item.category === 'training' 
                                    ? 'bg-purple-600/90 text-white' 
                                    : 'bg-green-600/90 text-white'
                            }`}>
                                {item.category === 'training' ? '🎯 Training' : '🏫 School'}
                            </div>

                            {/* Modern Overlay with Icon */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                                        <Expand className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Image Number Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                #{i + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                    <div className="flex items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* End of Gallery Indicator */}
                {!loadingMore && displayedItems.length >= filteredData.length && filteredData.length > ITEMS_PER_PAGE && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-sm">
                            You&apos;ve reached the end • {filteredData.length} images total
                        </p>
                    </div>
                )}
            </div>

            {/* Modern Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 pt-24"
                    onClick={() => setSelected(null)}
                    style={{ animation: "fadeIn 0.2s ease-out" }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelected(null)}
                        className="absolute top-24 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-white/20"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-24 left-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <p className="text-white font-semibold text-sm">
                            {filteredData.findIndex(item => item.id === selected.id) + 1} / {filteredData.length}
                        </p>
                    </div>

                    {/* Category Badge in Modal */}
                    <div className={`absolute top-36 left-6 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
                        selected.category === 'training' 
                            ? 'bg-purple-600/90 text-white' 
                            : 'bg-green-600/90 text-white'
                    }`}>
                        {selected.category === 'training' ? '🎯 Training' : '🏫 School'}
                    </div>

                    {/* Modal Image Container */}
                    <div
                        className="relative w-full max-w-3xl h-[55vh] mx-auto rounded-2xl overflow-hidden shadow-2xl"
                        onClick={e => e.stopPropagation()}
                        style={{ animation: "scaleIn 0.3s ease-out" }}
                    >
                        <Image
                            src={selected.image_url}
                            alt={`${selected.category} image`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={openPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20 hover:scale-110"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={openNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20 hover:scale-110"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>

                    {/* Keyboard Hint */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <p className="text-white text-xs flex items-center gap-3">
                            <span className="opacity-70">Use</span>
                            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
                            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
                            <span className="opacity-70">to navigate</span>
                        </p>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default GalleryGrid;