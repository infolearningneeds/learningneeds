/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  X,
  Briefcase,
  ExternalLink
} from 'lucide-react';

// Initialize Supabase client from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string | null;
  linkedin: string | null;
  resume_url: string;
  cover_letter_url: string | null;
  created_at: string;
}

const AdminCareerPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Fetch applications from Supabase
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setApplications(data || []);
      setFilteredApplications(data || []);
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications based on search and date
  useEffect(() => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(app => {
        const appDate = new Date(app.created_at);
        const diffDays = Math.floor((now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));

        switch(dateFilter) {
          case 'today':
            return diffDays === 0;
          case 'week':
            return diffDays <= 7;
          case 'month':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    setFilteredApplications(filtered);
  }, [searchTerm, dateFilter, applications]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Career Applications</h1>
              <p className="text-gray-600">Manage and review job applications</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{applications.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">This Week</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {applications.filter(app => {
                      const diffDays = Math.floor((new Date().getTime() - new Date(app.created_at).getTime()) / (1000 * 60 * 60 * 24));
                      return diffDays <= 7;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Filtered Results</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{filteredApplications.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Applications
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, location, or phone..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
            <button
              onClick={fetchApplications}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Applications List */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No applications found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Applicant Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{app.full_name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">{app.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{app.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{app.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{formatDate(app.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View Details</span>
                      </button>
                      <button
                        onClick={() => handleDownload(app.resume_url, `${app.full_name}_Resume.pdf`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Resume</span>
                      </button>
                      {app.cover_letter_url && (
                        <button
                          onClick={() => handleDownload(app.cover_letter_url!, `${app.full_name}_CoverLetter.pdf`)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm font-medium">Cover Letter</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Application Details</h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Full Name</p>
                      <p className="text-gray-900 font-medium">{selectedApplication.full_name}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="text-gray-900 font-medium truncate">{selectedApplication.email}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="text-gray-900 font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-gray-900 font-medium">{selectedApplication.location}</p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(selectedApplication.portfolio || selectedApplication.linkedin) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-500" />
                      Links
                    </h3>
                    <div className="space-y-3">
                      {selectedApplication.portfolio && (
                        <a
                          href={selectedApplication.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                        >
                          <Globe className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                          <span className="text-gray-900 font-medium flex-1 truncate">{selectedApplication.portfolio}</span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      )}
                      {selectedApplication.linkedin && (
                        <a
                          href={selectedApplication.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                        >
                          <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                          <span className="text-gray-900 font-medium flex-1 truncate">{selectedApplication.linkedin}</span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleDownload(selectedApplication.resume_url, `${selectedApplication.full_name}_Resume.pdf`)}
                      className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition-colors group"
                    >
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div className="flex-1 text-left">
                        <p className="text-gray-900 font-medium">Resume</p>
                        <p className="text-sm text-gray-600">Click to download</p>
                      </div>
                      <Download className="w-5 h-5 text-blue-600 group-hover:translate-y-1 transition-transform" />
                    </button>
                    {selectedApplication.cover_letter_url && (
                      <button
                        onClick={() => handleDownload(selectedApplication.cover_letter_url!, `${selectedApplication.full_name}_CoverLetter.pdf`)}
                        className="flex items-center gap-3 bg-green-50 hover:bg-green-100 rounded-lg p-4 transition-colors group"
                      >
                        <FileText className="w-6 h-6 text-green-600" />
                        <div className="flex-1 text-left">
                          <p className="text-gray-900 font-medium">Cover Letter</p>
                          <p className="text-sm text-gray-600">Click to download</p>
                        </div>
                        <Download className="w-5 h-5 text-green-600 group-hover:translate-y-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Application Submitted</p>
                  <p className="text-gray-900 font-medium">{formatDate(selectedApplication.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCareerPage;