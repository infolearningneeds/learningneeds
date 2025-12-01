'use client'

import { useState, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, Shield, Sparkles, ArrowRight, BookOpen, Award, Users } from 'lucide-react'
import type { SignInFormData, Message } from '@/lib/types'

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<Message>({ type: '', text: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single()

      const userRole = roleData?.role || 'user'

      setMessage({ 
        type: 'success', 
        text: `Successfully signed in${userRole === 'admin' ? ' as admin' : ''}! Redirecting...` 
      })

      setTimeout(() => {
        if (userRole === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/profile')
        }
      }, 1000)

    } catch (error) {
      const err = error as Error
      setMessage({ 
        type: 'error', 
        text: err.message || 'Invalid email or password' 
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-indigo-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex">
        {/* Left Side - Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24">
          

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent mt-2">
                Learning Needs
              </span>
            </h1>
           

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Premium Content Library</h3>
                  <p className="text-gray-300 text-sm">Access thousands of expertly curated educational materials</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Expert Curated</h3>
                  <p className="text-gray-300 text-sm">Created by experienced educators and learning specialists</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                  <Users className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Trusted Community</h3>
                  <p className="text-gray-300 text-sm">Join thousands of educators and learners worldwide</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white mb-1">5000+</div>
                <div className="text-sm text-gray-300">Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-300">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-300">Welcome back! Please enter your details.</p>
              </div>

              {/* Message Alert */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 border ${
                  message.type === 'success' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  {message.type === 'success' && message.text.includes('admin') && (
                    <Shield className="w-5 h-5 text-amber-400" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Form */}
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-500 bg-white/5 text-indigo-400 focus:ring-indigo-400 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-gray-300 group-hover:text-white transition">Remember me</span>
                  </label>
                  <a href="#" className="text-indigo-300 hover:text-indigo-200 font-medium transition">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="mt-6 flex items-center">
                <div className="flex-1 border-t border-white/10"></div>
                <span className="px-4 text-sm text-gray-400">or</span>
                <div className="flex-1 border-t border-white/10"></div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  Don&apos;t have an account?
                  <a href="/signup" className="ml-2 text-indigo-300 hover:text-indigo-200 font-semibold transition">
                    Sign Up
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