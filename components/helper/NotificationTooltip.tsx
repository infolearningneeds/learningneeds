'use client'

import React, { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'

const NotificationTooltip = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-51">
      <div 
        className={`
          relative w-80 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] 
          shadow-2xl transition-all duration-300 opacity-100 translate-x-0 scale-100
        `}
      >
        <div className="relative rounded-2xl bg-white p-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer z-10"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>

          {/* Icon */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
              <AlertCircle className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              We are updating!
            </h3>
          </div>

          {/* Content */}
          <div className="space-y-2 text-gray-600">
            <p className="text-sm leading-relaxed">
              Our website is undergoing some improvements to serve you better. During this time, you might experience minor changes.
            </p>
            <p className="text-sm font-medium text-gray-700">
              Thank you for your patience and understanding!
            </p>
          </div>

          {/* Decorative element */}
          <div className="absolute -top-1 -right-1 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-20 blur-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}

export default NotificationTooltip