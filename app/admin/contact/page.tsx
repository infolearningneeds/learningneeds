'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Trash2, Eye, EyeOff, Search, Calendar, Phone, User } from 'lucide-react'

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
      
      // Build query based on selected status
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      // Apply status filter if not 'all'
      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching submissions:', error)
        alert('Failed to fetch submissions')
        return
      }

      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
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

      if (error) {
        console.error('Error updating submission:', error)
        alert('Failed to update submission status')
        return
      }

      await fetchSubmissions()
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status })
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting submission:', error)
        alert('Failed to delete submission')
        return
      }

      await fetchSubmissions()
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null)
      }
      alert('Submission deleted successfully!')
    } catch (error) {
      console.error('Error deleting submission:', error)
      alert('Failed to delete submission')
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
      <div className="flex items-center justify-center min-h-[60vh]">
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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Contact Submissions</h1>
            <p className="text-indigo-300">Manage incoming messages from visitors</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-white">{submissions.length}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Unread</p>
              <p className="text-3xl font-bold text-white">{unreadCount}</p>
            </div>
            <EyeOff className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Read</p>
              <p className="text-3xl font-bold text-white">{readCount}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedStatus === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setSelectedStatus('unread')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedStatus === 'unread'
              ? 'bg-orange-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setSelectedStatus('read')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            selectedStatus === 'read'
              ? 'bg-green-500 text-white'
              : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
          }`}
        >
          Read
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-indigo-900/30 border border-white/10 rounded-xl text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-300 text-lg">No submissions found</p>
          </div>
        ) : (
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
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{submission.name}</p>
                          <p className="text-indigo-400 text-sm">{submission.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{submission.contact}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-indigo-300 text-sm truncate max-w-xs">
                        {submission.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(submission.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {submission.status === 'unread' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          Unread
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                          Read
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAs(submission.id, submission.status === 'read' ? 'unread' : 'read')
                          }}
                          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title={submission.status === 'read' ? 'Mark as unread' : 'Mark as read'}
                        >
                          {submission.status === 'read' ? (
                            <EyeOff className="w-4 h-4 text-orange-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-green-400" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(submission.id)
                          }}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
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
        )}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-indigo-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-indigo-300 text-sm mb-2">Name</label>
                <p className="text-white text-lg font-medium">{selectedSubmission.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-indigo-300 text-sm mb-2">Email</label>
                  <a href={`mailto:${selectedSubmission.email}`} className="text-blue-400 hover:text-blue-300">
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
                <div className="bg-indigo-950 p-4 rounded-xl text-white whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>

              <div>
                <label className="block text-indigo-300 text-sm mb-2">Received</label>
                <p className="text-white">{formatDate(selectedSubmission.created_at)}</p>
              </div>

              <div>
                <label className="block text-indigo-300 text-sm mb-2">Status</label>
                <div className="flex items-center space-x-3">
                  {selectedSubmission.status === 'unread' ? (
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      Unread
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                      Read
                    </span>
                  )}
                  <button
                    onClick={() => handleMarkAs(selectedSubmission.id, selectedSubmission.status === 'read' ? 'unread' : 'read')}
                    className="px-4 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-xl text-white transition-all"
                  >
                    Mark as {selectedSubmission.status === 'read' ? 'Unread' : 'Read'}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 rounded-xl text-white transition-all"
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