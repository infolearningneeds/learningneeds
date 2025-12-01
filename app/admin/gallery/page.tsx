'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Image as ImageIcon, Plus, Trash2, Upload, GraduationCap, Users } from 'lucide-react'
import Image from 'next/image'

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
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
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
      
      // Step 1: Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${uploadCategory}-${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Step 2: Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)

      // Step 3: Save to database via API
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
        alert('Image uploaded successfully!')
      } else {
        throw new Error('Failed to save to database')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
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
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        await fetchImages()
        alert('Image deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
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
        body: JSON.stringify({
          id,
          category: newCategory
        })
      })

      if (response.ok) {
        await fetchImages()
        alert('Category updated successfully!')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Failed to update category')
    }
  }

  const filteredImages = images

  const schoolImages = images.filter(img => img.category === 'school')
  const trainingImages = images.filter(img => img.category === 'training')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <ImageIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
            <p className="text-indigo-300">Upload and manage school & training images</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Total Images</p>
              <p className="text-3xl font-bold text-white">{images.length}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">School Images</p>
              <p className="text-3xl font-bold text-white">{schoolImages.length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Training Images</p>
              <p className="text-3xl font-bold text-white">{trainingImages.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          All Images
        </button>
        <button
          onClick={() => setSelectedCategory('school')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedCategory === 'school'
              ? 'bg-blue-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          School
        </button>
        <button
          onClick={() => setSelectedCategory('training')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedCategory === 'training'
              ? 'bg-purple-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          Training
        </button>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
          <p className="text-indigo-300 text-lg">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={image.image_url}
                  alt={`${image.category} image`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', image.image_url)
                    e.currentTarget.src = '/placeholder.png'
                  }}
                  unoptimized={image.image_url.includes('supabase.co') ? false : true}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <select
                    value={image.category}
                    onChange={(e) => handleCategoryChange(image.id, e.target.value as 'school' | 'training')}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="school">School</option>
                    <option value="training">Training</option>
                  </select>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-4">
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

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-indigo-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Image</h2>
            
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-indigo-300 mb-3">Select Category</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setUploadCategory('school')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      uploadCategory === 'school'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium">School</p>
                  </button>
                  <button
                    onClick={() => setUploadCategory('training')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      uploadCategory === 'training'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
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
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-indigo-800 hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50"
                >
                  <Upload className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">
                    {uploading ? 'Uploading...' : 'Choose Image'}
                  </span>
                </button>
                <p className="text-indigo-400 text-xs mt-2">Max file size: 10MB</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-indigo-800 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGalleryPage