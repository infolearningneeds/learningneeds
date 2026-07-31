'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Shield, Users, Package, ShoppingCart, FileText, Image,
  MessageSquare, Megaphone, Menu, X, ArrowLeft, BarChart3
} from 'lucide-react'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0
  })

  useEffect(() => {
    checkAdminAccess()
    fetchStats()
    
    // Hide footer on admin pages
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
    }
    
    // Show footer again when component unmounts
    return () => {
      const footer = document.querySelector('footer')
      if (footer) {
        footer.style.display = 'block'
      }
    }
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/signin')
        return
      }

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
      console.error('Error:', error)
      router.push('/signin')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch user count
      const { count: userCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
      
      setStats(prev => ({
        ...prev,
        totalUsers: userCount || 0
      }))
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: BarChart3, 
      path: '/admin/dashboard',
      color: 'blue'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      path: '/admin/users',
      color: 'indigo'
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: Package, 
      path: '/admin/products',
      color: 'purple'
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: ShoppingCart, 
      path: '/admin/orders',
      color: 'pink'
    },
    { 
      id: 'blog', 
      label: 'Blog', 
      icon: FileText, 
      path: '/admin/blog',
      color: 'cyan'
    },
    { 
      id: 'gallery', 
      label: 'Gallery', 
      icon: Image, 
      path: '/admin/gallery',
      color: 'emerald'
    },
    { 
      id: 'contact', 
      label: 'Messages', 
      icon: MessageSquare, 
      path: '/admin/contact',
      color: 'orange'
    },
    { 
      id: 'notices', 
      label: 'Notices', 
      icon: Megaphone, 
      path: '/admin/notices',
      color: 'red'
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-amber-300 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-950 pt-20">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300 fixed h-full top-20 z-40`}>
        <div className="p-4 h-full flex flex-col">
          {/* Logo/Header */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-white font-bold text-lg">Admin Panel</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'text-indigo-300 hover:bg-white/5 hover:text-white'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              )
            })}
          </nav>

          {/* Back to Profile */}
          <div className="pt-4 border-t border-white/10 mt-4">
            <button
              onClick={() => router.push('/profile')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-indigo-300 hover:bg-white/5 hover:text-white rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">Back to Profile</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-6`}>
        {children}
      </main>
    </div>
  )
}