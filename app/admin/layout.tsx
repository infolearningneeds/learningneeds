'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import {
  Shield, Users, Package, ShoppingCart, FileText, Image,
  MessageSquare, Megaphone, Menu, X, ArrowLeft, BarChart3, Newspaper
} from 'lucide-react'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false) // mobile default hidden
  const [desktopSidebar, setDesktopSidebar] = useState(true) // for >= md screens
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0
  })

  useEffect(() => {
    checkAdminAccess()
    fetchStats()

    // Hide main footer in admin
    const footer = document.querySelector('footer')
    if (footer) footer.style.display = 'none'

    return () => {
      const footer = document.querySelector('footer')
      if (footer) footer.style.display = 'block'
    }
  }, [])

  // Detect desktop to show sidebar automatically
  useEffect(() => {
    const updateSidebar = () => {
      if (window.innerWidth >= 768) {
        setDesktopSidebar(true)
      } else {
        setDesktopSidebar(false)
      }
    }

    updateSidebar()
    window.addEventListener('resize', updateSidebar)
    return () => window.removeEventListener('resize', updateSidebar)
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/signin')

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single()

      if (!roleData || roleData.role !== 'admin') {
        router.push('/profile')
        return
      }

    } catch (error) {
      console.error(error)
      router.push('/signin')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { count: userCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })

      setStats(prev => ({
        ...prev,
        totalUsers: userCount || 0
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, path: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'blog', label: 'Blog', icon: FileText, path: '/admin/blog' },
    { id: 'gallery', label: 'Gallery', icon: Image, path: '/admin/gallery' },
    { id: 'contact', label: 'Messages', icon: MessageSquare, path: '/admin/contact' },
    { id: 'notices', label: 'Notices', icon: Megaphone, path: '/admin/notices' },
    { id: 'career', label: 'Career', icon: FileText, path: '/admin/career' },
    { id: 'newsletter', label: 'Newsletter', icon: Newspaper, path: '/admin/newsletter' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4">●</div>
          <p className="text-amber-300 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <div className="min-h-screen bg-indigo-950 pt-20">

      {/* MOBILE TOP-BAR MENU BUTTON */}
      <div className="md:hidden fixed top-20 left-0 z-50 p-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-indigo-900/60 backdrop-blur-xl border border-white/10 rounded-lg text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* SIDEBAR (Desktop always visible, mobile slides in) */}
      {/* SIDEBAR – No external CSS, no <style jsx>, no scrollbar ever */}
      <aside
        className={`
    fixed inset-y-0 top-20 z-50 bg-indigo-900/60 backdrop-blur-xl border-r border-white/10
    transition-transform duration-300 ease-out flex flex-col
    ${desktopSidebar ? 'md:w-64 md:translate-x-0' : 'md:w-20'}
    ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
  `}
      >
        <div className="flex flex-col h-full">
          {/* Header – always visible */}
          <div className="p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-white font-bold text-lg hidden md:block">
                Admin Panel
              </span>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable menu – ONLY this scrolls + scrollbar completely hidden */}
          <nav
            className="flex-1 overflow-y-auto px-4 pb-4"
            style={{
              msOverflowStyle: 'none',      /* IE + Edge */
              scrollbarWidth: 'none',       /* Firefox */
            } as React.CSSProperties}
          >
            {/* This extra div kills WebKit scrollbar */}
            <div className="[-webkit-scrollbar{display:none}] space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.path

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.path)
                      if (isMobile) setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-indigo-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Footer button – always visible */}
          <div className="p-4 border-t border-white/10 shrink-0">
            <button
              onClick={() => router.push('/profile')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-indigo-300 hover:bg-white/5 hover:text-white rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium hidden md:block">Back to Profile</span>
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main
        className={`transition-all duration-300 p-4 md:p-6 ${desktopSidebar ? 'md:ml-64' : 'md:ml-20'
          }`}
      >
        {children}
      </main>
    </div>
  )
}
