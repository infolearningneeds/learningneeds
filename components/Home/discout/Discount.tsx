import React from 'react'

const Discount = () => {
  return (
    <div className="w-full bg-linear-to-r from-orange-500 to-orange-600 py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Limited Time Offer - Up to 50% Off!</h2>
        </div>
        
        <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md">
          Connect With Us Today
        </button>
      </div>
    </div>
  )
}

export default Discount