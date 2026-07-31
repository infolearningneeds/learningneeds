/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User, Lock, Mail, Phone, Upload, Eye, EyeOff, Shield, Sparkles, ArrowRight, BookOpen, GraduationCap, TrendingUp } from 'lucide-react'
import { isAdminEmail } from '@/lib/adminEmails'
import { setUserRole } from '@/lib/auth'
import type { SignUpFormData, Message } from '@/lib/types'

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    avatar: null
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<Message>({ type: '', text: '' })

  const isAdminSignup = isAdminEmail(formData.email)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, avatar: file })
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
    const fileName = `${userId}.${fileExt}`
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

  const handleSubmit = async () => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      setLoading(false)
      return
    }

    try {
      const userRole = isAdminEmail(formData.email) ? 'admin' : 'user'

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: userRole
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        let avatarUrl: string | null = null
        if (formData.avatar) {
          avatarUrl = await uploadAvatar(authData.user.id)
        }

        if (avatarUrl) {
          await supabase.auth.updateUser({
            data: { avatar_url: avatarUrl }
          })
        }

        await setUserRole(authData.user.id, userRole)

        setMessage({ 
          type: 'success', 
          text: `${userRole === 'admin' ? 'Admin account' : 'Account'} created successfully! Check your email to verify.` 
        })

        setTimeout(() => {
          router.push('/signin')
        }, 2000)
      }

    } catch (error) {
      const err = error as Error
      setMessage({ 
        type: 'error', 
        text: err.message || 'An error occurred during sign up' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-indigo-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex">
        {/* Left Side - Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Start Your
              <span className="block bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent mt-1">
                Learning Journey
              </span>
            </h1>
          

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-0.5">Instant Access</h3>
                  <p className="text-gray-300 text-xs">Download worksheets and materials immediately after purchase</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-0.5">Quality Education</h3>
                  <p className="text-gray-300 text-xs">Curated by experienced teachers and education experts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-0.5">Track Progress</h3>
                  <p className="text-gray-300 text-xs">Monitor your purchases and access history anytime</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl font-bold text-white mb-0.5">5000+</div>
                <div className="text-xs text-gray-300">Resources</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-0.5">10K+</div>
                <div className="text-xs text-gray-300">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-0.5">4.9★</div>
                <div className="text-xs text-gray-300">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 mt-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-6 flex justify-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create {isAdminSignup && 'Admin '}Account
                </h2>
                <p className="text-gray-300">
                  {isAdminSignup ? 'Creating admin account with elevated privileges' : 'Fill in your details to get started'}
                </p>
              </div>

              {/* Admin Badge */}
              {isAdminSignup && (
                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300">
                    Admin email detected - You'll have admin privileges
                  </span>
                </div>
              )}

              {/* Message Alert */}
              {message.text && (
                <div className={`mb-4 p-4 rounded-xl text-sm font-medium flex items-center gap-2 border ${
                  message.type === 'success' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  <span>{message.text}</span>
                </div>
              )}

              {/* Avatar Upload */}
              <div className="mb-5 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden cursor-pointer hover:border-white/40 transition">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-8 pr-3 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-8 pr-3 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone and Password Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 5678"
                        className="w-full pl-8 pr-3 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 6 chars"
                        className="w-full pl-8 pr-9 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-0.5 rounded border-gray-500 bg-white/5 text-indigo-400 focus:ring-indigo-400 focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-300">
                    I agree to the <a href="#" className="text-indigo-300 hover:text-indigo-200 font-medium">Terms</a> and <a href="#" className="text-indigo-300 hover:text-indigo-200 font-medium">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full ${isAdminSignup ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-500/30' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30'} text-white py-3 rounded-xl font-semibold focus:ring-4 focus:ring-indigo-500/50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="mt-5 flex items-center">
                <div className="flex-1 border-t border-white/10"></div>
                <span className="px-4 text-sm text-gray-400">or</span>
                <div className="flex-1 border-t border-white/10"></div>
              </div>

              {/* Sign In Link */}
              <div className="mt-5 text-center">
                <p className="text-gray-300 text-sm">
                  Already have an account?
                  <a href="/signin" className="ml-2 text-indigo-300 hover:text-indigo-200 font-semibold transition">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}