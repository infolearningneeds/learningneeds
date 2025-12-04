'use client'

import React, { useState, useEffect } from 'react';
import { Upload, X, Plus, Save, AlertCircle, CheckCircle, Loader2, Trash2, Package, DollarSign, Archive } from 'lucide-react';

type ProductCategory = 'Book' | 'Learning Aid' | 'PDF';

interface Product {
  id?: string;
  title: string;
  description: string;
  category: ProductCategory;
  original_price: number;
  discount_price: number | null;
  available: boolean;
  stock_quantity: number | null;
  pdf_url?: string | null;
  product_images?: Array<{
    id: string;
    image_url: string;
    display_order: number;
  }>;
}

export default function AdminProductPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Book' as ProductCategory,
    originalPrice: 0,
    discountPrice: null as number | null,
    available: true,
    stockQuantity: null as number | null,
    images: [] as File[],
    pdfFile: null as File | null,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        showNotification('error', 'Failed to fetch products');
      }
    } catch (error) {
      showNotification('error', 'Error fetching products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (formData.images.length + files.length > 4) {
      showNotification('error', 'Maximum 4 images allowed');
      return;
    }

    const newImages = [...formData.images, ...files].slice(0, 4);
    setFormData({ ...formData, images: newImages });

    const newPreviews = [...imagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        showNotification('error', 'PDF file must be under 50MB');
        return;
      }
      setFormData({ ...formData, pdfFile: file });
      setPdfPreview(file.name);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const removePdf = () => {
    setFormData({ ...formData, pdfFile: null });
    setPdfPreview(null);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      showNotification('error', 'Title and description are required');
      return;
    }

    if (formData.images.length === 0) {
      showNotification('error', 'At least 1 image is required');
      return;
    }

    if (formData.category === 'PDF' && !formData.pdfFile) {
      showNotification('error', 'PDF file is required for PDF category');
      return;
    }

    if (formData.category !== 'PDF' && formData.stockQuantity === null) {
      showNotification('error', 'Stock quantity is required for physical products');
      return;
    }

    setLoading(true);

    try {
      const apiFormData = new FormData();
      apiFormData.append('title', formData.title);
      apiFormData.append('description', formData.description);
      apiFormData.append('category', formData.category);
      apiFormData.append('originalPrice', formData.originalPrice.toString());
      if (formData.discountPrice) {
        apiFormData.append('discountPrice', formData.discountPrice.toString());
      }
      apiFormData.append('available', formData.available.toString());
      if (formData.stockQuantity !== null) {
        apiFormData.append('stockQuantity', formData.stockQuantity.toString());
      }

      formData.images.forEach(image => {
        apiFormData.append('images', image);
      });

      if (formData.pdfFile) {
        apiFormData.append('pdfFile', formData.pdfFile);
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        body: apiFormData,
      });

      const result = await response.json();

      if (result.success) {
        showNotification('success', 'Product created successfully!');
        setIsCreating(false);
        resetForm();
        fetchProducts();
      } else {
        showNotification('error', result.error || 'Failed to create product');
      }
    } catch (error) {
      showNotification('error', 'Error creating product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products?productId=${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showNotification('success', 'Product deleted successfully');
        fetchProducts();
      } else {
        showNotification('error', result.error || 'Failed to delete product');
      }
    } catch (error) {
      showNotification('error', 'Error deleting product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Book',
      originalPrice: 0,
      discountPrice: null,
      available: true,
      stockQuantity: 0,
      images: [],
      pdfFile: null,
    });
    setImagePreviews([]);
    setPdfPreview(null);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Book':
        return 'bg-purple-100 text-purple-800';
      case 'Learning Aid':
        return 'bg-blue-100 text-blue-800';
      case 'PDF':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-6 md:p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage books, learning aids, and digital PDFs</p>
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base shadow-md"
          >
            <Plus className="w-5 h-5" />
            {isCreating ? 'Cancel' : 'Create Product'}
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 shadow-md ${notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm sm:text-base">{notification.message}</span>
          </div>
        )}

        {/* Create Product Form */}
        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Create New Product</h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter product title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter product description"
                />
              </div>

              {/* Category and Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ProductCategory,
                        stockQuantity: e.target.value === "PDF" ? null : 0,
                        pdfFile: e.target.value !== "PDF" ? null : formData.pdfFile,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="Book">Book</option>
                    <option value="Learning Aid">Learning Aid</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>

                {formData.category !== "PDF" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={formData.stockQuantity || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockQuantity: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      min="0"
                    />
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPrice: parseFloat(e.target.value) || null,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    min="0"
                    step="0.01"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images * (Max 4)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={formData.images.length >= 4}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center cursor-pointer ${formData.images.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 text-center">
                      Click to upload images ({formData.images.length}/4)
                    </span>
                  </label>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Upload */}
              {formData.category === 'PDF' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF File * (Max 50MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                    {!pdfPreview ? (
                      <>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="flex flex-col items-center cursor-pointer">
                          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Click to upload PDF</span>
                        </label>
                      </>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-4 rounded-lg gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            📄
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{pdfPreview}</p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {(formData.pdfFile!.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removePdf}
                          className="text-red-500 hover:text-red-700 self-end sm:self-center"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full sm:flex-1 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create Product
                    </>
                  )}
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products List - Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Existing Products</h2>
          </div>
          {loading && products.length === 0 ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{product.discount_price || product.original_price}
                        </div>
                        {product.discount_price && (
                          <div className="text-xs text-gray-500 line-through">
                            ₹{product.original_price}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock_quantity ?? 'Digital'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {product.available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(product.id!)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          disabled={loading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Products List - Mobile/Tablet Cards */}
        <div className="lg:hidden">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Existing Products</h2>
          </div>

          {loading && products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
                >
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="ml-3 text-red-600 hover:text-red-900 transition-colors flex-shrink-0"
                      disabled={loading}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${getCategoryBadgeColor(product.category)}`}>
                        {product.category}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-end gap-2">
                      <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {product.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          ₹{product.discount_price || product.original_price}
                        </span>
                        {product.discount_price && (
                          <span className="text-xs text-gray-500 line-through ml-1">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="flex items-center justify-end gap-2">
                      <Archive className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {product.stock_quantity ?? 'Digital'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}