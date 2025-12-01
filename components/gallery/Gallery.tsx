import React from 'react'
import GalleryGrid from './GalleryGrid'

const Gallery = () => {
  return (
    <>
      {/* Top Blue Header Section */}
    
      {/* Gallery Section (separate, no blue background) */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <GalleryGrid />
      </section>
    </>
  )
}

export default Gallery
