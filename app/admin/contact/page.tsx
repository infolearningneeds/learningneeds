'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Trash2, Eye, EyeOff, Search, Calendar, Phone, User, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactSubmission {
  id: string
  name: string
  email: string
  contact: string
  message: string
  status: 'read' | 'unread'
  created_at: string
}

const AdminContactPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'read' | 'unread'>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [selectedStatus])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus)
      }

      const { data, error } = await query

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast.error('Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAs = async (id: string, status: 'read' | 'unread') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      await fetchSubmissions()
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, status } : null)
      }
      toast.success(`Marked as ${status}`)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchSubmissions()
      if (selectedSubmission?.id === id) setSelectedSubmission(null)
      toast.success('Submission deleted!')
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const filteredSubmissions = submissions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const unreadCount = submissions.filter(s => s.status === 'unread').length
  const readCount = submissions.filter(s => s.status === 'read').length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-amber-300 text-lg">Loading submissions...</p>
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
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Contact Submissions</h1>
              <p className="text-indigo-300 text-sm sm:text-base">Manage incoming messages from visitors</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Messages', value: submissions.length, icon: Mail, color: 'blue' },
            { label: 'Unread', value: unreadCount, icon: EyeOff, color: 'orange' },
            { label: 'Read', value: readCount, icon: Eye, color: 'green' }
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

        {/* Filters + Search */}
        <div className="space-y-5 mb-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Messages', value: 'all' as const, color: 'amber' },
              { label: 'Unread', value: 'unread' as const, color: 'orange' },
              { label: 'Read', value: 'read' as const, color: 'green' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setSelectedStatus(tab.value)}
                className={`px-5 py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  selectedStatus === tab.value
                    ? `bg-${tab.color}-500 text-white shadow-lg`
                    : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-indigo-900/30 border border-white/10 rounded-xl text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
        </div>

        {/* Submissions List - Mobile Cards + Desktop Table */}
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-20 bg-indigo-900/30 rounded-2xl border border-white/10">
            <Mail className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-300 text-lg">No submissions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-900/50 border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-indigo-300" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{submission.name}</p>
                              <p className="text-indigo-400 text-sm">{submission.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-indigo-300">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{submission.contact}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-indigo-300 text-sm max-w-md truncate">
                            {submission.message}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-indigo-300 text-sm">
                          {formatDate(submission.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.status === 'unread'
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMarkAs(submission.id, submission.status === 'read' ? 'unread' : 'read')}
                              className="p-2 hover:bg-blue-500/20 rounded-lg transition"
                            >
                              {submission.status === 'read' ? (
                                <EyeOff className="w-4 h-4 text-orange-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-green-400" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(submission.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-indigo-900/40 transition cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{submission.name}</p>
                        <p className="text-indigo-400 text-sm">{submission.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      submission.status === 'unread'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}>
                      {submission.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-indigo-300">
                      <Phone className="w-4 h-4" />
                      <span>{submission.contact}</span>
                    </div>
                    <p className="text-indigo-300 line-clamp-2">{submission.message}</p>
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(submission.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkAs(submission.id, submission.status === 'read' ? 'unread' : 'read')
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-white text-sm"
                    >
                      {submission.status === 'read' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      Mark as {submission.status === 'read' ? 'Unread' : 'Read'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(submission.id)
                      }}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal - Full Mobile Experience */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-indigo-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-indigo-900/80 backdrop-blur border-b border-white/10 p-5 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              <div>
                <label className="block text-indigo-300 text-sm mb-2">Name</label>
                <p className="text-white text-lg font-semibold">{selectedSubmission.name}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-indigo-300 text-sm mb-2">Email</label>
                  <a href={`mailto:${selectedSubmission.email}`} className="text-blue-400 hover:text-blue-300 break-all">
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <label className="block text-indigo-300 text-sm mb-2">Phone</label>
                  <a href={`tel:${selectedSubmission.contact}`} className="text-blue-400 hover:text-blue-300">
                    {selectedSubmission.contact}
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-indigo-300 text-sm mb-2">Message</label>
                <div className="bg-indigo-950 p-5 rounded-xl text-white whitespace-pre-wrap text-base leading-relaxed">
                  {selectedSubmission.message}
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <label className="block text-indigo-300 text-sm mb-2">Received</label>
                  <p className="text-white">{formatDate(selectedSubmission.created_at)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedSubmission.status === 'unread'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {selectedSubmission.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleMarkAs(selectedSubmission.id, selectedSubmission.status === 'read' ? 'unread' : 'read')}
                    className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-xl text-white font-medium transition"
                  >
                    Mark as {selectedSubmission.status === 'read' ? 'Unread' : 'Read'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Message
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminContactPage