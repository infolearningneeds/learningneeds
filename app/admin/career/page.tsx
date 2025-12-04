/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { 
  User, Mail, Phone, MapPin, Globe, Linkedin, FileText, Download, 
  Search, Filter, Calendar, RefreshCw, Eye, X, Briefcase, ExternalLink 
} from 'lucide-react'
import toast from 'react-hot-toast'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  location: string
  portfolio: string | null
  linkedin: string | null
  resume_url: string
  cover_letter_url: string | null
  created_at: string
}

const AdminCareerPage = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [dateFilter, setDateFilter] = useState<string>('all')

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setApplications(data || [])
      setFilteredApplications(data || [])
    } catch (err: any) {
      toast.error('Failed to fetch applications')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      )
    }

    if (dateFilter !== 'all') {
      const now = new Date()
      filtered = filtered.filter(app => {
        const appDate = new Date(app.created_at)
        const diffDays = Math.floor((now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24))
        switch(dateFilter) {
          case 'today': return diffDays === 0
          case 'week': return diffDays <= 7
          case 'month': return diffDays <= 30
          default: return true
        }
      })
    }

    setFilteredApplications(filtered)
  }, [searchTerm, dateFilter, applications])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
    } catch {
      toast.error('Failed to download file')
    }
  }

  const weekCount = applications.filter(app => {
    const diffDays = Math.floor((Date.now() - new Date(app.created_at).getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 mt-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Career Applications</h1>
              <p className="text-gray-600 mt-1">Manage and review job applications</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Applications", value: applications.length, icon: User, color: "orange" },
              { label: "This Week", value: weekCount, icon: Calendar, color: "blue" },
              { label: "Filtered Results", value: filteredApplications.length, icon: Filter, color: "green" }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}>
                    <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6 mb-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Search Applications</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name, email, phone, location..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date Filter</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold">{filteredApplications.length}</span> of <span className="font-bold">{applications.length}</span>
              </p>
              <button
                onClick={fetchApplications}
                className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600">No applications found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-5">
                  {/* Applicant Info */}
                  <div className="flex-1 flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{app.full_name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{app.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{app.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(app.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors text-sm"
                    >
                      <Eye className="w-5 h-5" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(app.resume_url, `${app.full_name}_Resume.pdf`)}
                      className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors text-sm"
                    >
                      <Download className="w-5 h-5" />
                      Resume
                    </button>
                    {app.cover_letter_url && (
                      <button
                        onClick={() => handleDownload(app.cover_letter_url!, `${app.full_name}_CoverLetter.pdf`)}
                        className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors text-sm"
                      >
                        <Download className="w-5 h-5" />
                        Cover
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal - Mobile First */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-5 sm:p-6 rounded-t-2xl flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-orange-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", value: selectedApplication.full_name },
                      { label: "Email", value: selectedApplication.email },
                      { label: "Phone", value: selectedApplication.phone },
                      { label: "Location", value: selectedApplication.location },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="text-gray-900 font-semibold mt-1 break-all">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(selectedApplication.portfolio || selectedApplication.linkedin) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Globe className="w-6 h-6 text-orange-500" />
                      Links
                    </h3>
                    <div className="space-y-3">
                      {selectedApplication.portfolio && (
                        <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
                          <div className="flex items-center gap-3">
                            <Globe className="w-6 h-6 text-orange-500" />
                            <span className="font-medium text-gray-900 truncate max-w-60">Portfolio</span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-500" />
                        </a>
                      )}
                      {selectedApplication.linkedin && (
                        <a href={selectedApplication.linkedin} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
                          <div className="flex items-center gap-3">
                            <Linkedin className="w-6 h-6 text-orange-500" />
                            <span className="font-medium text-gray-900 truncate max-w-60">LinkedIn</span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-500" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-500" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleDownload(selectedApplication.resume_url, `${selectedApplication.full_name}_Resume.pdf`)}
                      className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 rounded-xl p-5 transition group"
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="text-left">
                          <p className="font-bold text-gray-900">Resume</p>
                          <p className="text-sm text-gray-600">Download PDF</p>
                        </div>
                      </div>
                      <Download className="w-6 h-6 text-blue-600 group-hover:translate-y-1 transition" />
                    </button>

                    {selectedApplication.cover_letter_url && (
                      <button
                        onClick={() => handleDownload(selectedApplication.cover_letter_url!, `${selectedApplication.full_name}_CoverLetter.pdf`)}
                        className="flex items-center justify-between bg-green-50 hover:bg-green-100 rounded-xl p-5 transition group"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div className="text-left">
                            <p className="font-bold text-gray-900">Cover Letter</p>
                            <p className="text-sm text-gray-600">Download PDF</p>
                          </div>
                        </div>
                        <Download className="w-6 h-6 text-green-600 group-hover:translate-y-1 transition" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-600">Submitted on</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {formatDate(selectedApplication.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCareerPage