/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react"
import { Bell, Plus, Edit2, Trash2, Calendar, Tag, AlertCircle, CheckCircle, Info, Sparkles, X } from "lucide-react"

interface Notice {
  id: number
  title: string
  date: string
  category: 'info' | 'important' | 'success'
  description: string
}

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    date: "",
    category: "info" as 'info' | 'important' | 'success',
    description: "",
  })

  const loadNotices = async () => {
    const res = await fetch("/api/notices")
    const data = await res.json()
    setNotices(data.notices || [])
  }

  useEffect(() => {
    loadNotices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = form.id ? "PUT" : "POST"

    await fetch("/api/notices", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setForm({ id: null, title: "", date: "", category: "info", description: "" })
    loadNotices()
  }

  const handleEdit = (notice: Notice) => {
    setForm(notice)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notice?")) return

    await fetch("/api/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    loadNotices()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "important": return <AlertCircle className="w-5 h-5" />
      case "success": return <CheckCircle className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  const getCategoryColors = (category: string) => {
    switch (category) {
      case "important": return "bg-red-500/10 text-red-400 border-red-500/30"
      case "success": return "bg-green-500/10 text-green-400 border-green-500/30"
      default: return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "important": return "from-red-500/20 to-orange-500/20"
      case "success": return "from-green-500/20 to-emerald-500/20"
      default: return "from-blue-500/20 to-cyan-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-900 p-4 sm:p-6 lg:p-8 mt-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Manage Notices
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">Create and manage system-wide notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-sm sm:text-base text-gray-300 font-medium">{notices.length} Active Notices</span>
          </div>
        </div>

        {/* Form Section - Mobile First */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {form.id ? "Edit Notice" : "Create New Notice"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                Notice Title
              </label>
              <input
                type="text"
                placeholder="Enter notice title..."
                className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all text-base"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Date & Category - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  Category
                </label>
                <select
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                >
                  <option value="info">Info</option>
                  <option value="important">Important</option>
                  <option value="success">Success</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                placeholder="Enter notice description..."
                className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all resize-none min-h-32"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-3"
            >
              {form.id ? (
                <>
                  <Edit2 className="w-6 h-6" />
                  Update Notice
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Create Notice
                </>
              )}
            </button>

            {/* Cancel Edit (Mobile) */}
            {form.id && (
              <button
                type="button"
                onClick={() => setForm({ id: null, title: "", date: "", category: "info", description: "" })}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-all"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Notices List */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              Existing Notices
            </h2>
            <span className="text-gray-400 text-sm sm:text-base">{notices.length} total</span>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No notices created yet</p>
              <p className="text-gray-500 text-sm mt-2">Create your first notice using the form above</p>
            </div>
          ) : (
            <div className="space-y-5">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className={`bg-gradient-to-br ${getCategoryGradient(notice.category)} backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    {/* Icon + Content */}
                    <div className={`p-3 rounded-xl border ${getCategoryColors(notice.category)} self-start`}>
                      {getCategoryIcon(notice.category)}
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-white text-lg sm:text-xl">{notice.title}</h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColors(notice.category)}`}>
                          {notice.category}
                        </span>
                      </div>

                      <p className="text-gray-300 text-base leading-relaxed">{notice.description}</p>
                    </div>

                    {/* Action Buttons - Always visible on mobile */}
                    <div className="flex gap-3 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity lg:absolute lg:top-6 lg:right-6">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="p-3 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 rounded-xl border border-yellow-600/30 transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="p-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-xl border border-red-600/30 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminNotices