/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Plus, Edit, Trash2, Eye, EyeOff, Search, Calendar, ThumbsUp, Upload, Image as ImageIcon, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Blog {
  id: string
  user_image: string
  username: string
  author_name: string
  author_image: string
  title: string
  slug: string
  long_description: string
  cover_image: string
  reaction: number
  published: boolean
  created_at: string
  updated_at: string
}

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author_name: '',
    author_image: '',
    long_description: '',
    cover_image: '',
    published: false
  })

  const coverImageRef = useRef<HTMLInputElement>(null)
  const authorImageRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchBlogs()
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setFormData(prev => ({
        ...prev,
        author_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        author_image: user.user_metadata?.avatar_url || ''
      }))
    }
  }

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const response = await fetch('/api/admin/blog', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.blogs || [])
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File, type: 'cover' | 'author') => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `blog-images/${fileName}`
      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, { upsert: true })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)
      if (type === 'cover') {
        setFormData(prev => ({ ...prev, cover_image: publicUrl }))
      } else {
        setFormData(prev => ({ ...prev, author_image: publicUrl }))
      }
      toast.success('Image uploaded!')
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'author') => {
    const file = e.target.files?.[0]
    if (file) uploadImage(file, type)
  }

  const insertFormatting = (tag: string) => {
    const editor = editorRef.current
    if (!editor) return
    const selection = window.getSelection()
    if (!selection?.rangeCount) return
    const range = selection.getRangeAt(0)
    const selectedText = range.toString() || 'Your text here'
    let html = ''
    switch (tag) {
      case 'h2': html = `<h2 class="text-2xl font-bold my-4">${selectedText}</h2>`; break
      case 'h3': html = `<h3 class="text-xl font-semibold my-3">${selectedText}</h3>`; break
      case 'p': html = `<p class="my-3">${selectedText}</p>`; break
      case 'bold': html = `<strong>${selectedText}</strong>`; break
      case 'italic': html = `<em>${selectedText}</em>`; break
      case 'ul': html = `<ul class="list-disc pl-6 my-3 space-y-1"><li>${selectedText}</li><li>Another item</li></ul>`; break
      case 'blockquote': html = `<blockquote class="border-l-4 border-amber-500 pl-4 italic my-4">${selectedText}</blockquote>`; break
    }
    range.deleteContents()
    const fragment = range.createContextualFragment(html)
    range.insertNode(fragment)
    range.collapse(false)
    setFormData(prev => ({ ...prev, long_description: editor.innerHTML }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.slug || !formData.long_description.trim()) {
      toast.error('Title, slug, and content are required')
      return
    }
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const url = '/api/admin/blog'
      const method = editingBlog ? 'PUT' : 'POST'
      const body = editingBlog ? { ...formData, id: editingBlog.id } : formData
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        toast.success(editingBlog ? 'Blog updated!' : 'Blog created!')
        fetchBlogs()
        setShowModal(false)
        resetForm()
      } else {
        toast.error('Failed to save blog')
      }
    } catch (error) {
      toast.error('Error saving blog')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        toast.success('Blog deleted')
        fetchBlogs()
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      author_name: blog.author_name || blog.username,
      author_image: blog.author_image || blog.user_image,
      long_description: blog.long_description,
      cover_image: blog.cover_image,
      published: blog.published
    })
    setShowModal(true)
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = blog.long_description
    }, 100)
  }

  const resetForm = () => {
    setEditingBlog(null)
    loadUserInfo()
    setFormData(prev => ({
      ...prev,
      title: '',
      slug: '',
      long_description: '',
      cover_image: '',
      published: false
    }))
    if (editorRef.current) editorRef.current.innerHTML = ''
  }

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.author_name || blog.username).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-indigo-500/20 p-4 sm:p-6 lg:p-8 mt-10">
        <div className="max-w-7xl mx-auto">

          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-2xl">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Blog Management</h1>
                <p className="text-indigo-300 text-sm sm:text-base">Create and manage blog posts</p>
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true) }}
              className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-medium text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Blogs', value: blogs.length, icon: FileText, color: 'cyan' },
              { label: 'Published', value: blogs.filter(b => b.published).length, icon: Eye, color: 'green' },
              { label: 'Drafts', value: blogs.filter(b => !b.published).length, icon: EyeOff, color: 'orange' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
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

          {/* Search - Full Width */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Blog List - Card Layout on Mobile */}
          <div className="space-y-5">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-400">No blogs found</p>
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div key={blog.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                  <div className="flex flex-col gap-5">
                    {/* Cover Image - Full width on mobile */}
                    {blog.cover_image && (
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-48 sm:h-56 object-cover rounded-xl"
                      />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                        <p className="text-indigo-300 text-sm mt-1">{blog.slug}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                          <div className="flex items-center gap-2">
                            <img src={blog.author_image || blog.user_image} alt="" className="w-8 h-8 rounded-full" />
                            <span className="text-gray-300">{blog.author_name || blog.username}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.published ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'}`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                          <div className="flex items-center gap-1 text-gray-400">
                            <ThumbsUp className="w-4 h-4" /> {blog.reaction}
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar className="w-4 h-4" /> {formatDate(blog.created_at)}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <button onClick={() => handleEdit(blog)} className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl transition">
                          <Edit className="w-5 h-5 text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete(blog.id)} className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition">
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal - Responsive & Scrollable */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Sticky Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-800 to-purple-800 p-5 sm:p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button onClick={() => { setShowModal(false); resetForm() }} className="p-2 hover:bg-white/10 rounded-xl transition">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
                {/* Title & Slug - Stack on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-indigo-300 font-medium mb-2 text-sm sm:text-base">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setFormData({ ...formData, title })
                        if (!editingBlog) setFormData(prev => ({ ...prev, slug: generateSlug(title) }))
                      }}
                      className="w-full px-4 sm:px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter blog title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-300 font-medium mb-2 text-sm sm:text-base">Slug *</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                      required
                    />
                  </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-indigo-300 font-medium mb-2 text-sm sm:text-base">Author Name *</label>
                    <input
                      type="text"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-300 font-medium mb-2 text-sm sm:text-base">Author Image</label>
                    <div className="flex flex-wrap items-center gap-3">
                      <input type="file" ref={authorImageRef} onChange={(e) => handleFileSelect(e, 'author')} accept="image/*" className="hidden" />
                      <button
                        type="button"
                        onClick={() => authorImageRef.current?.click()}
                        disabled={uploading}
                        className="px-4 sm:px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition disabled:opacity-50 text-sm"
                      >
                        Upload Avatar
                      </button>
                      {formData.author_image && <img src={formData.author_image} alt="Author" className="w-12 h-12 rounded-full object-cover" />}
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-indigo-300 font-medium mb-2 text-sm sm:text-base">Cover Image</label>
                  <div className="flex flex-wrap items-center gap-4">
                    <input type="file" ref={coverImageRef} onChange={(e) => handleFileSelect(e, 'cover')} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => coverImageRef.current?.click()}
                      disabled={uploading}
                      className="px-5 sm:px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition disabled:opacity-50 text-sm"
                    >
                      {uploading ? 'Uploading...' : 'Upload Cover'}
                    </button>
                    {formData.cover_image && (
                      <img src={formData.cover_image} alt="Cover" className="h-20 sm:h-24 rounded-xl object-cover shadow-lg" />
                    )}
                  </div>
                </div>

                {/* Rich Editor */}
                <div>
                  <label className="block text-indigo-300 font-medium mb-3 text-sm sm:text-base">Content *</label>
                  <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
                    <div className="flex flex-wrap gap-2 p-3 sm:p-4 border-b border-white/10">
                      {['h2', 'h3', 'p', 'bold', 'italic', 'ul', 'blockquote'].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => insertFormatting(tag)}
                          className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs sm:text-sm font-medium transition"
                        >
                          {tag === 'bold' ? 'B' : tag === 'italic' ? 'I' : tag.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <div
                      ref={editorRef}
                      contentEditable
                      onInput={(e) => setFormData({ ...formData, long_description: e.currentTarget.innerHTML })}
                      className="min-h-96 p-5 sm:p-6 text-white prose prose-invert max-w-none focus:outline-none text-base empty:before:content-['Start_writing_your_blog_post...'] empty:before:text-gray-500"
                      dangerouslySetInnerHTML={{ __html: formData.long_description }}
                    />
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="publish"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="publish" className="text-white font-medium cursor-pointer text-sm sm:text-base">Publish immediately</label>
                </div>

                {/* Actions - Stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transition disabled:opacity-50 text-base"
                  >
                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm() }}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminBlogPage