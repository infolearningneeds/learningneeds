'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, Search, Mail, Phone, Shield, Calendar } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  mobile: string
  role: string
  created_at: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      // Get current session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        console.error('No session found')
        return
      }

      console.log('Fetching users from API...')

      // Call API route to fetch users
      const response = await fetch('/api/admin/list-users', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error fetching users:', response.statusText, errorData)
        return
      }

      const data = await response.json()
      console.log('Fetched users data:', data)
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'user':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-amber-300 text-lg">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 mt-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 sm:p-3 bg-indigo-500/20 rounded-xl">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Users Management</h1>
            <p className="text-indigo-300 text-sm sm:text-base">Manage all registered users</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-xs sm:text-sm mb-1">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{users.length}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-xs sm:text-sm mb-1">Admins</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-red-500/20 rounded-xl">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Regular Users */}
        <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-xs sm:text-sm mb-1">Regular Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {users.filter(u => u.role === 'user').length}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-500/20 rounded-xl">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, mobile, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-indigo-900/30 border border-white/10 
                   rounded-xl text-white placeholder-indigo-400 focus:outline-none 
                   focus:ring-2 focus:ring-amber-500/50 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="hidden md:block bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-900/50 border-b border-white/10">
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-indigo-300">Name</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-indigo-300">Email</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-indigo-300">Mobile</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-indigo-300">Role</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-indigo-300">Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-indigo-300"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 
                                    rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{user.mobile}</span>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(user.created_at)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users List - Mobile/Tablet Card View */}
      <div className="md:hidden space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-indigo-300">No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-indigo-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition-colors"
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 
                              rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">{user.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border mt-1 ${getRoleBadgeColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-indigo-300">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm break-all">{user.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-indigo-300">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{user.mobile}</span>
                </div>

                <div className="flex items-center space-x-2 text-indigo-300">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{formatDate(user.created_at)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

  )
}

export default UsersPage