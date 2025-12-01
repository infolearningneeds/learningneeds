'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Plus, Edit, Trash2, Eye, EyeOff, Search, Calendar, ThumbsUp, Upload, Image as ImageIcon } from 'lucide-react'

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
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBlogs(data.blogs || [])
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File, type: 'cover' | 'author') => {
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      if (type === 'cover') {
        setFormData(prev => ({ ...prev, cover_image: publicUrl }))
      } else {
        setFormData(prev => ({ ...prev, author_image: publicUrl }))
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'author') => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      uploadImage(file, type)
    }
  }

  const insertFormatting = (tag: string) => {
    const editor = editorRef.current
    if (!editor) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString()

    let formattedText = ''
    switch (tag) {
      case 'h2':
        formattedText = `<h2>${selectedText || 'Heading 2'}</h2>`
        break
      case 'h3':
        formattedText = `<h3>${selectedText || 'Heading 3'}</h3>`
        break
      case 'p':
        formattedText = `<p>${selectedText || 'Paragraph'}</p>`
        break
      case 'bold':
        formattedText = `<strong>${selectedText || 'Bold text'}</strong>`
        break
      case 'italic':
        formattedText = `<em>${selectedText || 'Italic text'}</em>`
        break
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`
        break
      case 'blockquote':
        formattedText = `<blockquote>${selectedText || 'Quote'}</blockquote>`
        break
    }

    const content = editor.innerHTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    
    // Insert at cursor position
    range.deleteContents()
    const fragment = range.createContextualFragment(formattedText)
    range.insertNode(fragment)
    
    setFormData(prev => ({ ...prev, long_description: editor.innerHTML }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const url = '/api/admin/blog'
      const method = editingBlog ? 'PUT' : 'POST'
      const body = editingBlog 
        ? { ...formData, id: editingBlog.id }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        await fetchBlogs()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving blog:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        await fetchBlogs()
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
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
      if (editorRef.current) {
        editorRef.current.innerHTML = blog.long_description
      }
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
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.author_name || blog.username).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-amber-300 text-lg">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/20 rounded-xl">
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Blog Management</h1>
            <p className="text-indigo-300">Create and manage blog posts</p>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Blog Post</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Total Blogs</p>
              <p className="text-3xl font-bold text-white">{blogs.length}</p>
            </div>
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Published</p>
              <p className="text-3xl font-bold text-white">
                {blogs.filter(b => b.published).length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Drafts</p>
              <p className="text-3xl font-bold text-white">
                {blogs.filter(b => !b.published).length}
              </p>
            </div>
            <EyeOff className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-indigo-900/30 border border-white/10 rounded-xl text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-900/50 border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Reactions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-indigo-300">
                    No blogs found
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {blog.cover_image && (
                          <img src={blog.cover_image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="text-white font-medium">{blog.title}</p>
                          <p className="text-indigo-400 text-sm">{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <img src={blog.author_image || blog.user_image} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-indigo-300">{blog.author_name || blog.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {blog.published ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{blog.reaction}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(blog.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20 overflow-y-auto">
          <div className="bg-indigo-900 border border-white/10 rounded-2xl p-6 max-w-4xl w-full my-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-indigo-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value })
                      if (!editingBlog) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                      }
                    }}
                    className="w-full px-4 py-3 bg-indigo-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-indigo-300 mb-2">Slug (URL) *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-indigo-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-indigo-300 mb-2">Author Name *</label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-4 py-3 bg-indigo-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-indigo-300 mb-2">Author Image</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      ref={authorImageRef}
                      onChange={(e) => handleFileSelect(e, 'author')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => authorImageRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center space-x-2 px-4 py-3 bg-indigo-800 hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4 text-white" />
                      <span className="text-white">Upload</span>
                    </button>
                    {formData.author_image && (
                      <img src={formData.author_image} alt="" className="w-10 h-10 rounded-full object-cover" />
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-indigo-300 mb-2">Cover Image</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    ref={coverImageRef}
                    onChange={(e) => handleFileSelect(e, 'cover')}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverImageRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center space-x-2 px-4 py-3 bg-indigo-800 hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50"
                  >
                    <ImageIcon className="w-4 h-4 text-white" />
                    <span className="text-white">{uploading ? 'Uploading...' : 'Upload Cover'}</span>
                  </button>
                  {formData.cover_image && (
                    <img src={formData.cover_image} alt="" className="h-16 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-indigo-300 mb-2">Content *</label>
                <div className="bg-indigo-950 border border-white/10 rounded-xl overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-2 p-3 border-b border-white/10 bg-indigo-900/50">
                    <button type="button" onClick={() => insertFormatting('h2')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm">H2</button>
                    <button type="button" onClick={() => insertFormatting('h3')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm">H3</button>
                    <button type="button" onClick={() => insertFormatting('p')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm">P</button>
                    <button type="button" onClick={() => insertFormatting('bold')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm font-bold">B</button>
                    <button type="button" onClick={() => insertFormatting('italic')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm italic">I</button>
                    <button type="button" onClick={() => insertFormatting('ul')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm">List</button>
                    <button type="button" onClick={() => insertFormatting('blockquote')} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-sm">Quote</button>
                  </div>
                  {/* Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={(e) => setFormData({ ...formData, long_description: e.currentTarget.innerHTML })}
                    className="min-h-[300px] p-4 text-white focus:outline-none prose prose-invert max-w-none"
                    style={{
                      lineHeight: '1.6'
                    }}
                  />
                </div>
              </div>

              {/* Publish Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <label htmlFor="published" className="text-white">Publish immediately</label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="px-6 py-3 bg-indigo-800 text-white rounded-xl hover:bg-indigo-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlogPage