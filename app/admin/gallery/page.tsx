'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Image as ImageIcon, Plus, Trash2, Upload, GraduationCap, Users, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface GalleryImage {
  id: string
  category: 'school' | 'training'
  image_url: string
  created_at: string
}

const AdminGalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'school' | 'training'>('all')
  const [showModal, setShowModal] = useState(false)
  const [uploadCategory, setUploadCategory] = useState<'school' | 'training'>('school')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [selectedCategory])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const url = selectedCategory === 'all' 
        ? '/api/admin/gallery'
        : `/api/admin/gallery?category=${selectedCategory}`

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${uploadCategory}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: uploadCategory,
          image_url: publicUrl
        })
      })

      if (response.ok) {
        await fetchImages()
        setShowModal(false)
        toast.success('Image uploaded successfully!')
      } else {
        throw new Error('Failed to save to database')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      uploadImage(file)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })

      if (response.ok) {
        await fetchImages()
        toast.success('Image deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Failed to delete image')
    }
  }

  const handleCategoryChange = async (id: string, newCategory: 'school' | 'training') => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, category: newCategory })
      })

      if (response.ok) {
        await fetchImages()
        toast.success('Category updated!')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Failed to update category')
    }
  }

  const schoolImages = images.filter(img => img.category === 'school')
  const trainingImages = images.filter(img => img.category === 'training')
  const filteredImages = selectedCategory === 'all' ? images : images.filter(i => i.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-amber-300 text-lg">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-500/20 p-4 sm:p-6 lg:p-8 mt-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <ImageIcon className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Gallery Management</h1>
              <p className="text-indigo-300 text-sm sm:text-base">Upload and manage school & training images</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-medium text-sm sm:text-base"
          >
            <Plus className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Images', value: images.length, icon: ImageIcon, color: 'emerald' },
            { label: 'School Images', value: schoolImages.length, icon: GraduationCap, color: 'blue' },
            { label: 'Training Images', value: trainingImages.length, icon: Users, color: 'purple' }
          ].map((stat, i) => (
            <div key={i} className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-indigo-900/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-300 text-sm">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 text-${stat.color}-400`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: 'All Images', value: 'all' as const, color: 'amber' },
            { label: 'School', value: 'school' as const, color: 'blue' },
            { label: 'Training', value: 'training' as const, color: 'purple' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              className={`px-5 py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                selectedCategory === tab.value
                  ? `bg-${tab.color}-500 text-white shadow-lg`
                  : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Fully Responsive */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-300 text-lg">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group relative"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.image_url}
                    alt={`${image.category} image`}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.png'
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                    <select
                      value={image.category}
                      onChange={(e) => handleCategoryChange(image.id, e.target.value as 'school' | 'training')}
                      className="w-full max-w-32 px-3 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="school">School</option>
                      <option value="training">Training</option>
                    </select>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    image.category === 'school'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal - Mobile First */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-indigo-900 border border-white/10 rounded-2xl w-full max-w-md sm:max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Upload Image</h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={uploading}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-indigo-300 mb-4 text-sm sm:text-base">Select Category</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setUploadCategory('school')}
                    className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center ${
                      uploadCategory === 'school'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <GraduationCap className="w-10 h-10 text-blue-400 mb-2" />
                    <p className="text-white font-medium">School</p>
                  </button>
                  <button
                    onClick={() => setUploadCategory('training')}
                    className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center ${
                      uploadCategory === 'training'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Users className="w-10 h-10 text-purple-400 mb-2" />
                    <p className="text-white font-medium">Training</p>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-800 hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50 font-medium"
                >
                  <Upload className="w-5 h-5 text-white" />
                  <span className="text-white">
                    {uploading ? 'Uploading...' : 'Choose Image'}
                  </span>
                </button>
                <p className="text-indigo-400 text-xs text-center mt-2">Max file size: 10MB</p>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowModal(false)}
                disabled={uploading}
                className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGalleryPage