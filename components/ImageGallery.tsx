
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: 'exterior' | 'interior' | 'amenities' | 'community';
}

interface ImageGalleryProps {
  category?: 'all' | 'exterior' | 'interior' | 'amenities' | 'community';
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  category = 'all', 
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(category);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Sample images - in production these would come from a CMS or API
  const images: GalleryImage[] = [
    {
      id: 1,
      src: '/design 05_new 2_1749651606209.jpg',
      alt: 'Luxury home exterior with modern architecture',
      title: 'Modern Luxury Home',
      category: 'exterior'
    },
    {
      id: 2,
      src: '/Dr. Duffy Blue_Headshot_1749651931522.jpg',
      alt: 'Professional headshot',
      title: 'Dr. Duffy - Your Real Estate Expert',
      category: 'community'
    },
    {
      id: 3,
      src: '/bhhs-logo.jpg',
      alt: 'Berkshire Hathaway HomeServices logo',
      title: 'Trusted Real Estate Partner',
      category: 'community'
    },
    // Placeholder images for demonstration
    ...Array.from({ length: 9 }, (_, i) => ({
      id: i + 4,
      src: `/design 05_new 2_1749651606209.jpg`,
      alt: `Gallery image ${i + 4}`,
      title: `Property Feature ${i + 4}`,
      category: ['exterior', 'interior', 'amenities', 'community'][i % 4] as GalleryImage['category']
    }))
  ];

  const categories = [
    { key: 'all', label: 'All Photos', icon: '📸' },
    { key: 'exterior', label: 'Exterior', icon: '🏠' },
    { key: 'interior', label: 'Interior', icon: '🛋️' },
    { key: 'amenities', label: 'Amenities', icon: '🏊‍♂️' },
    { key: 'community', label: 'Community', icon: '🌟' }
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <section className={`image-gallery ${className}`}>
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>Photo Gallery</h2>
          <p>Explore luxury living at Emerson Estates</p>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span className="filter-label">{cat.label}</span>
              <span className="filter-count">
                ({cat.key === 'all' ? images.length : images.filter(img => img.category === cat.key).length})
              </span>
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="loading-gallery">
            <div className="loading-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="loading-placeholder">
                  <div className="loading-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(image)}
              >
                <div className="image-container">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className={`gallery-image ${loadedImages.has(image.id) ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(image.id)}
                    unoptimized
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3>{image.title}</h3>
                      <p>Click to view</p>
                      <div className="zoom-icon">🔍</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && !isLoading && (
          <div className="no-images">
            <div className="no-images-icon">📷</div>
            <h3>No images found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            <button 
              className="lightbox-nav prev" 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              ❮
            </button>
            
            <button 
              className="lightbox-nav next" 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              ❯
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-image-container">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="lightbox-image"
                  unoptimized
                />
              </div>
              
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.alt}</p>
                <div className="lightbox-meta">
                  <span className="image-category">
                    {categories.find(cat => cat.key === selectedImage.category)?.icon} 
                    {categories.find(cat => cat.key === selectedImage.category)?.label}
                  </span>
                  <span className="image-counter">
                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .image-gallery {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-header h2 {
          font-size: 2.5rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .gallery-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #64748b;
        }

        .filter-btn:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          border-color: #1e40af;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .filter-icon {
          font-size: 1.2rem;
        }

        .filter-count {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .loading-gallery {
          margin-bottom: 2rem;
        }

        .loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loading-placeholder {
          height: 250px;
          background: #f1f5f9;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .loading-shimmer {
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .gallery-item {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
          cursor: pointer;
        }

        .image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .image-container {
          transform: translateY(-5px);
        }

        .gallery-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .gallery-image.loaded {
          opacity: 1;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          text-align: center;
        }

        .gallery-item:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .overlay-content p {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .zoom-icon {
          font-size: 2rem;
        }

        .no-images {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
        }

        .no-images-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .lightbox-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10001;
          transition: background 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10001;
          transition: background 0.3s ease;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-nav.prev {
          left: 2rem;
        }

        .lightbox-nav.next {
          right: 2rem;
        }

        .lightbox-content {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          max-width: 1000px;
          max-height: 80vh;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          animation: scaleIn 0.3s ease;
        }

        .lightbox-image-container {
          position: relative;
          max-height: 60vh;
          overflow: hidden;
        }

        .lightbox-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .lightbox-info {
          padding: 2rem;
        }

        .lightbox-info h3 {
          color: #1e40af;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .lightbox-info p {
          color: #64748b;
          margin-bottom: 1rem;
        }

        .lightbox-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #9ca3af;
        }

        .image-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 768px) {
          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 1rem;
          }

          .filter-btn {
            flex-shrink: 0;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .lightbox-nav {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .lightbox-nav.prev {
            left: 1rem;
          }

          .lightbox-nav.next {
            right: 1rem;
          }

          .lightbox-close {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }

          .lightbox-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;
