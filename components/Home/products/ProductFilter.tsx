'use client'

import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  original_price: number;
  discount_price: number | null;
  available: boolean;
  stock_quantity: number | null;
  product_images?: Array<{
    id: string;
    image_url: string;
    display_order: number;
  }>;
  pdf_url?: string | null;
}

export default function ProductFilter() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products?available=true');
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories from fetched products
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 15000]);
    setSelectedRating(0);
  };

  const filteredProducts = products.filter(product => {
    // Get display price (discount price if available, otherwise original price)
    const displayPrice = product.discount_price || product.original_price;
    
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = displayPrice >= priceRange[0] && displayPrice <= priceRange[1];
    // Rating filter - placeholder (you can add a reviews field later)
    const ratingMatch = selectedRating === 0; // For now, show all products when rating filter is active
    
    return categoryMatch && priceMatch && ratingMatch;
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-10">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-rose-600" />
          <p className="mt-4 text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-10">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-6 h-6" />
              <p className="font-semibold">{error}</p>
            </div>
            <button
              onClick={fetchProducts}
              className="mt-4 w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-10">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Our Products
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredProducts.length} products found
            </p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 flex-shrink-0`}>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:sticky lg:top-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Category
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-3">
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-gray-700 group-hover:text-rose-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No categories available</p>
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Price Range
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-rose-600"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 15000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-rose-600"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Minimum Rating
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-3">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-600' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === 0}
                      onChange={() => setSelectedRating(0)}
                      className="w-4 h-4 border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-gray-700 group-hover:text-rose-600 transition-colors">
                      All Ratings
                    </span>
                  </label>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 15000) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Active Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
                      >
                        {cat}
                        <button
                          onClick={() => handleCategoryToggle(cat)}
                          className="hover:text-rose-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 15000) && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                        <button
                          onClick={() => setPriceRange([0, 15000])}
                          className="hover:text-rose-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-6 bg-gray-50 rounded-lg">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg mb-2">No products found matching your filters.</p>
                  <p className="text-gray-400 text-sm mb-4">Try adjusting your filter criteria</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}