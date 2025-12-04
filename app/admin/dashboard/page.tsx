/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Users, Package, ShoppingCart, FileText,
    Image, MessageSquare, Megaphone, TrendingUp,
    Activity, DollarSign, Calendar,
    BarChart3
} from 'lucide-react'

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalBlogPosts: 0,
        totalGalleryImages: 0,
        totalMessages: 0,
        totalNotices: 0,
        revenue: 0
    })



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
    useEffect(() => {
        fetchStats()
    }, [])
    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            color: 'blue',
            change: '+12%',
            changeType: 'positive'
        },
        {
            title: 'Products',
            value: stats.totalProducts,
            icon: Package,
            color: 'purple',
            change: '+8%',
            changeType: 'positive'
        },
        {
            title: 'Orders',
            value: stats.totalOrders,
            icon: ShoppingCart,
            color: 'pink',
            change: '+23%',
            changeType: 'positive'
        },
        {
            title: 'Revenue',
            value: `$${stats.revenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'emerald',
            change: '+15%',
            changeType: 'positive'
        },
        {
            title: 'Blog Posts',
            value: stats.totalBlogPosts,
            icon: FileText,
            color: 'cyan',
            change: '+5',
            changeType: 'neutral'
        },
        {
            title: 'Gallery Images',
            value: stats.totalGalleryImages,
            icon: Image,
            color: 'amber',
            change: '+12',
            changeType: 'neutral'
        },
        {
            title: 'Messages',
            value: stats.totalMessages,
            icon: MessageSquare,
            color: 'orange',
            change: '+7',
            changeType: 'neutral'
        },
        {
            title: 'Active Notices',
            value: stats.totalNotices,
            icon: Megaphone,
            color: 'red',
            change: '2 new',
            changeType: 'neutral'
        }
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
            purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
            pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
            emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
            cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
            amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
            orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
            red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
        }
        return colors[color] || colors.blue
    }

    return (
        <div className="px-4 sm:px-6 md:px-8 py-6 overflow-x-hidden mt-10">

            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-sm sm:text-base text-indigo-300">
                    Welcome back! Here's what's happening with your platform.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon
                    const colors = getColorClasses(stat.color)
                    return (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 
                     p-4 sm:p-6 hover:bg-white/10 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2 sm:p-3 ${colors.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
                                </div>
                                <span className={`text-xs sm:text-sm font-semibold 
                            ${stat.changeType === 'positive' ? 'text-emerald-400' : 'text-indigo-300'}`}>
                                    {stat.change}
                                </span>
                            </div>

                            <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-indigo-300 text-xs sm:text-sm font-medium">{stat.title}</p>
                        </div>
                    )
                })}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Recent Activity */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                    <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Activity</h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {[
                            { action: 'New user registered', time: '5 minutes ago', icon: Users, color: 'blue' },
                            { action: 'New order placed', time: '15 minutes ago', icon: ShoppingCart, color: 'pink' },
                            { action: 'Product updated', time: '1 hour ago', icon: Package, color: 'purple' },
                            { action: 'New message received', time: '2 hours ago', icon: MessageSquare, color: 'orange' },
                            { action: 'Blog post published', time: '3 hours ago', icon: FileText, color: 'cyan' }
                        ].map((activity, index) => {
                            const Icon = activity.icon
                            const colors = getColorClasses(activity.color)
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className={`p-2 ${colors.bg} rounded-lg`}>
                                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm sm:text-base font-medium">{activity.action}</p>
                                        <p className="text-indigo-300 text-xs sm:text-sm">{activity.time}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                    <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Quick Actions</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            { label: 'Add Product', icon: Package, path: '/admin/products' },
                            { label: 'New Blog Post', icon: FileText, path: '/admin/blog' },
                            { label: 'Upload Image', icon: Image, path: '/admin/gallery' },
                            { label: 'Create Notice', icon: Megaphone, path: '/admin/notices' }
                        ].map((action, index) => {
                            const Icon = action.icon
                            return (
                                <button
                                    key={index}
                                    className="p-3 sm:p-4 bg-white/5 hover:bg-amber-500/20 
                         rounded-xl border border-white/10 hover:border-amber-500/30 
                         transition-all group text-center"
                                >
                                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 mx-auto 
                            group-hover:scale-110 transition-transform" />
                                    <p className="text-white text-xs sm:text-sm font-semibold">{action.label}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                <div className="
        flex flex-col sm:flex-row 
        sm:items-center sm:justify-between 
        mb-4 sm:mb-6
        space-y-3 sm:space-y-0
    ">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Performance Overview
                        </h2>
                    </div>

                    <select
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-white/5 border border-white/10
                rounded-xl text-white text-sm sm:text-base 
                focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                    </select>
                </div>

                <div className="h-48 sm:h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                    <div className="text-center">
                        <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400/50 mx-auto mb-4" />
                        <p className="text-indigo-300 text-sm sm:text-base">
                            Chart visualization coming soon
                        </p>
                    </div>
                </div>
            </div>

        </div>

    )
}