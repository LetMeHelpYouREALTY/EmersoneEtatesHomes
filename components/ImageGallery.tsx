
import React, { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  title = "Gallery",
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];
  
  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex] || null);
  };

  return (
    <section className={`image-gallery ${className}`}>
      <div className="gallery-container">
        <h2>{title}</h2>
        
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="gallery-image"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="gallery-overlay">
                <h3>{image.title}</h3>
                <span className="view-icon">👁️</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="no-images">
            <p>No images available for this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            
            <button 
              className="modal-nav prev" 
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              ❮
            </button>
            
            <div className="modal-image-container">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="modal-image"
                unoptimized
              />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                {selectedImage.category && (
                  <span className="modal-category">{selectedImage.category}</span>
                )}
              </div>
            </div>
            
            <button 
              className="modal-nav next" 
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              ❯
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .image-gallery {
          padding: 3rem 2rem;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .gallery-container h2 {
          color: #1e40af;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border-color: #1e40af;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .gallery-item {
          position: relative;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
          background: white;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .gallery-item:hover {
          transform: translateY(-5px);
        }

        .gallery-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: end;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          transform: translateY(0);
        }

        .gallery-overlay h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .view-icon {
          font-size: 1.5rem;
        }

        .no-images {
          text-align: center;
          padding: 3rem;
          color: #64748b;
          font-size: 1.1rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .modal-close {
          position: absolute;
          top: -3rem;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          z-index: 1001;
        }

        .modal-nav {
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 2rem;
          padding: 1rem;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .modal-nav:hover {
          background: rgba(255,255,255,0.2);
        }

        .modal-image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
        }

        .modal-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .modal-info {
          color: white;
          text-align: center;
          margin-top: 1rem;
        }

        .modal-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .modal-category {
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            flex-direction: column;
            gap: 1rem;
          }

          .modal-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          .modal-nav.prev {
            left: 1rem;
          }

          .modal-nav.next {
            right: 1rem;
          }

          .category-filter {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;
