'use client'

import { navLinks } from '@/constants/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { IoLogOutOutline } from 'react-icons/io5'
import CartIcon from '../helper/CartIcon'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

type Props = {
    openNav: () => void
}

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        const handleScroll = () => setNavBg(window.scrollY >= 90)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Get current user
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setShowDropdown(false)
    }

    // Get user's first name initial
    const getUserInitial = () => {
        const fullName = user?.user_metadata?.full_name || user?.email || 'U'
        return fullName.charAt(0).toUpperCase()
    }

    // Get avatar URL
    const getAvatarUrl = () => {
        return user?.user_metadata?.avatar_url || null
    }

    // Get user's display name
    const getDisplayName = () => {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    }

    return (
        <div className={`fixed w-full transition-all duration-200 h-[12vh] z-[1000] ${navBg ? 'bg-indigo-800 shadow-lg' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between h-full w-[95%] mx-auto">

                {/* Logo with gradient background and glow effect */}
                <Link href="/">
                    <div className="relative group">
                        {/* Glow effect behind logo */}
                        <div className="absolute -inset-2 rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>

                        {/* Logo container with gradient background */}
                        <div className="relative bg-linear-to-br from-white via-blue-50 to-cyan-50 p-2 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm">
                            <Image
                                src="/images/LN.webp"
                                alt="Logo"
                                width={160}
                                height={60}
                                className="cursor-pointer relative z-10"
                            />
                        </div>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.url}>
                            <p className="relative text-md w-fit block after:block after:content-[''] font-semibold after:absolute after:h-[3px] after:bg-yellow-400 text-white after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left cursor-pointer">
                                {link.label}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Right Section — Cart Icon & User Profile/Sign In */}
                <div className="flex items-center space-x-6">
                    {/* Cart Icon */}
                    <CartIcon />

                    {/* User Profile or Sign In Button */}
                    {user ? (
                        <div className="relative">
                            {/* Avatar/Initial Button */}
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="focus:outline-none group"
                            >
                                {/* Avatar or Initial Circle */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 overflow-hidden border-2 border-white relative">
                                    {getAvatarUrl() ? (
                                        <Image
                                            src={getAvatarUrl()!}
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                            sizes="40px"
                                        />
                                    ) : (
                                        <span className="text-lg">{getUserInitial()}</span>
                                    )}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {getDisplayName()}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        <Link href="/profile">
                                            <button
                                                onClick={() => setShowDropdown(false)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                My Profile
                                            </button>
                                        </Link>
                                        <Link href="/orders">
                                            <button
                                                onClick={() => setShowDropdown(false)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                My Orders
                                            </button>
                                        </Link>
                                       
                                    </div>
                                    <div className="border-t border-gray-100">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                        >
                                            <IoLogOutOutline className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Sign In Button */
                        <Link href="/signin">
                            <button
                                className="md:px-6 md:py-2 px-4 py-1 text-white font-semibold text-base bg-orange-600 hover:bg-orange-700 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Sign In
                            </button>
                        </Link>
                    )}

                    {/* Mobile Hamburger */}
                    <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-white lg:hidden" />
                </div>

            </div>

            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                ></div>
            )}
        </div>
    )
}

export default Nav