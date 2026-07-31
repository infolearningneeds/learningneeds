'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Camera, Save, Edit2, X, Check, MapPin, MessageSquare, Shield, Bell, Trash2 } from 'lucide-react'

interface ProfileFormData {
  fullName: string
  email: string
  phone: string
  bio: string
  location: string
  avatar: File | null
}

interface Message {
  type: 'success' | 'error' | ''
  text: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<Message>({ type: '', text: '' })
  const [avatarPreview, setAvatarPreview] = useState<string>('https://via.placeholder.com/150')
  const [userRole, setUserRole] = useState<string>('user')
  
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    avatar: null
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async (): Promise<void> => {
    try {
      setPageLoading(true)
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/signin')
        return
      }

      // Fetch user role from database
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single()
      
      if (roleData) {
        setUserRole(roleData.role)
      }

      setFormData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        bio: user.user_metadata?.bio || '',
        location: user.user_metadata?.location || '',
        avatar: null
      })

      if (user.user_metadata?.avatar_url) {
        setAvatarPreview(user.user_metadata.avatar_url)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setMessage({
        type: 'error',
        text: 'Failed to load profile data'
      })
    } finally {
      setPageLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!formData.avatar) return null

    const fileExt = formData.avatar.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, formData.avatar, { upsert: true })

    if (uploadError) {
      console.error('Avatar upload error:', uploadError)
      return null
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSave = async (): Promise<void> => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')

      // Upload avatar if changed
      let avatarUrl = user.user_metadata?.avatar_url
      if (formData.avatar) {
        const newAvatarUrl = await uploadAvatar(user.id)
        if (newAvatarUrl) avatarUrl = newAvatarUrl
      }

      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          bio: formData.bio,
          location: formData.location,
          avatar_url: avatarUrl
        }
      })

      if (error) throw error

      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      })
      setIsEditing(false)
      
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      const err = error as Error
      setMessage({ 
        type: 'error', 
        text: err.message || 'Failed to update profile' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (): void => {
    setIsEditing(false)
    fetchUserProfile()
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-indigo-300 text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 mt-10">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Profile Settings</h1>
          <p className="text-indigo-300 text-lg">Manage your personal information and account preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-8 p-5 rounded-2xl text-sm font-medium flex items-center space-x-3 backdrop-blur-sm ${
            message.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {message.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Gradient Header */}
              <div className={`h-40 ${userRole === 'admin' ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600'} relative transition-all duration-500`}>
                <div className="absolute inset-0 bg-black/20"></div>
                {userRole === 'admin' && (
                  <div className="absolute top-4 right-4 flex items-center space-x-2 bg-amber-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
                    <Shield className="w-5 h-5 text-amber-300" />
                    <span className="text-amber-100 font-semibold text-sm">Admin Account</span>
                  </div>
                )}
              </div>

              {/* Profile Content */}
              <div className="px-8 pb-8">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 mb-8">
                  <div className="relative inline-block group">
                    <div className="w-36 h-36 rounded-3xl border-4 border-indigo-950 shadow-2xl overflow-hidden bg-indigo-900 relative">
                      <img
                        src={avatarPreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                      {!isEditing && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-3 rounded-2xl cursor-pointer shadow-xl hover:bg-indigo-600 transition-all hover:scale-105">
                        <Camera className="w-5 h-5" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 sm:mt-0 flex space-x-3">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-8 py-3 bg-indigo-500 text-white rounded-2xl font-semibold hover:bg-indigo-600 transition-all flex items-center space-x-2 shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
                      >
                        <Edit2 className="w-5 h-5" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCancel}
                          className="px-6 py-3 bg-white/10 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all flex items-center space-x-2 border border-white/20"
                        >
                          <X className="w-5 h-5" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="px-8 py-3 bg-indigo-500 text-white rounded-2xl font-semibold hover:bg-indigo-600 transition-all flex items-center space-x-2 shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Full Name
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-white placeholder-indigo-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                        <User className="w-5 h-5 text-indigo-400" />
                        <span className="text-white font-medium text-lg">{formData.fullName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                      <Mail className="w-5 h-5 text-indigo-400" />
                      <span className="text-white font-medium text-lg">{formData.email}</span>
                      <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">Verified</span>
                    </div>
                  </div>

                  {/* Account Role */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Account Role
                    </label>
                    <div className="flex items-center space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                      <Shield className={`w-5 h-5 ${userRole === 'admin' ? 'text-amber-400' : 'text-indigo-400'}`} />
                      <span className="text-white font-medium text-lg capitalize">{userRole}</span>
                      {userRole === 'admin' && (
                        <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30 flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>Admin Access</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-white placeholder-indigo-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                        <Phone className="w-5 h-5 text-indigo-400" />
                        <span className="text-white font-medium text-lg">{formData.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Bio
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-indigo-400" />
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-white placeholder-indigo-400 resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    ) : (
                      <div className="flex items-start space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                        <MessageSquare className="w-5 h-5 text-indigo-400 mt-1" />
                        <p className="text-white/80 leading-relaxed">{formData.bio || 'No bio added yet'}</p>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold text-indigo-200 mb-3 uppercase tracking-wider">
                      Location
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-white placeholder-indigo-400"
                          placeholder="City, Country"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3 py-4 px-5 bg-white/5 rounded-2xl border border-white/10">
                        <MapPin className="w-5 h-5 text-indigo-400" />
                        <span className="text-white font-medium text-lg">{formData.location || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Account Settings */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-5 py-4 hover:bg-white/10 rounded-2xl transition-all text-white font-medium flex items-center space-x-3 group border border-transparent hover:border-white/20">
                  <div className="p-2 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                    <Shield className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span>Change Password</span>
                </button>
                <button className="w-full text-left px-5 py-4 hover:bg-white/10 rounded-2xl transition-all text-white font-medium flex items-center space-x-3 group border border-transparent hover:border-white/20">
                  <div className="p-2 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>Privacy Settings</span>
                </button>
                <button className="w-full text-left px-5 py-4 hover:bg-white/10 rounded-2xl transition-all text-white font-medium flex items-center space-x-3 group border border-transparent hover:border-white/20">
                  <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <Bell className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Notifications</span>
                </button>
              </div>
            </div>

            {/* Admin Panel (only show for admins) */}
            {userRole === 'admin' && (
              <div className="bg-amber-500/10 backdrop-blur-xl rounded-3xl border border-amber-500/30 p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <h2 className="text-xl font-bold text-amber-300">Admin Panel</h2>
                </div>
                <p className="text-amber-200/80 text-sm mb-4">You have administrator privileges</p>
                <button 
                  onClick={() => {
                    console.log('Navigating to admin dashboard...')
                    window.location.href = '/admin/dashboard'
                  }}
                  className="w-full text-left px-5 py-4 hover:bg-amber-500/20 rounded-2xl transition-all text-amber-200 font-medium flex items-center space-x-3 group border border-amber-500/30 hover:border-amber-500/50"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            )}

            {/* Danger Zone */}
            <div className="bg-rose-500/10 backdrop-blur-xl rounded-3xl border border-rose-500/30 p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-rose-300 mb-4">Danger Zone</h2>
              <button className="w-full text-left px-5 py-4 hover:bg-rose-500/20 rounded-2xl transition-all text-rose-300 font-medium flex items-center space-x-3 group border border-rose-500/30 hover:border-rose-500/50">
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}