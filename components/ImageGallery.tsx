
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category?: string;
  description?: string;
  photographer?: string;
  date?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
  enableLightbox?: boolean;
  enableSearch?: boolean;
  columns?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  title = "Gallery",
  className = '',
  enableLightbox = true,
  enableSearch = true,
  columns = 3
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];
  
  // Filter images by category and search
  const filteredImages = images.filter(img => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.description && img.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch && !imageLoadErrors.has(img.src);
  });

  const openModal = useCallback((image: GalleryImage) => {
    if (!enableLightbox) return;
    
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
    
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'image_view', {
        event_category: 'engagement',
        event_label: image.title
      });
    }
  }, [enableLightbox]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex] || null);
  }, [selectedImage, filteredImages]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleImageError = useCallback((src: string) => {
    setImageLoadErrors(prev => new Set([...prev, src]));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, closeModal, navigateImage, toggleFullscreen]);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${300}px, 1fr))`,
    gap: '1.5rem'
  };

  return (
    <section className={`image-gallery ${className}`}>
      <div className="gallery-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gallery-header"
        >
          <h2>{title}</h2>
          <div className="gallery-stats">
            {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="gallery-controls"
        >
          {/* Search Bar */}
          {enableSearch && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
          )}

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="category-filter">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="count">
                    ({category === 'all' ? images.length : images.filter(img => img.category === category).length})
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => setViewMode('masonry')}
              title="Masonry View"
            >
              ⊟
            </button>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          layout
          className={`gallery-grid ${viewMode}`}
          style={viewMode === 'grid' ? gridStyles : {}}
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="gallery-item"
                onClick={() => openModal(image)}
                whileHover={{ y: -5 }}
              >
                <div className="image-container">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="gallery-image"
                    unoptimized
                    onError={() => handleImageError(image.src)}
                    priority={index < 4}
                  />
                  
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3>{image.title}</h3>
                      {image.description && (
                        <p className="image-description">{image.description}</p>
                      )}
                      <div className="image-meta">
                        {image.photographer && (
                          <span className="photographer">📷 {image.photographer}</span>
                        )}
                        {image.date && (
                          <span className="date">📅 {image.date}</span>
                        )}
                      </div>
                    </div>
                    <div className="overlay-actions">
                      <button className="action-btn view">👁️</button>
                      <button className="action-btn download">⬇️</button>
                      <button className="action-btn share">📤</button>
                    </div>
                  </div>

                  {image.category && (
                    <div className="category-badge">
                      {image.category}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-images"
          >
            <div className="no-images-icon">🖼️</div>
            <h3>No images found</h3>
            <p>
              {searchQuery 
                ? `No images match "${searchQuery}". Try a different search term.`
                : 'No images available for this category.'
              }
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedImage && enableLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`modal-overlay ${isFullscreen ? 'fullscreen' : ''}`}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-info">
                  <h3>{selectedImage.title}</h3>
                  <div className="modal-meta">
                    {selectedImage.photographer && (
                      <span>📷 {selectedImage.photographer}</span>
                    )}
                    {selectedImage.date && (
                      <span>📅 {selectedImage.date}</span>
                    )}
                  </div>
                </div>
                
                <div className="modal-controls">
                  <button 
                    className="control-btn"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                  >
                    {isFullscreen ? '⤓' : '⤢'}
                  </button>
                  <button 
                    className="control-btn"
                    onClick={closeModal}
                    title="Close (Esc)"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button 
                    className="modal-nav prev" 
                    onClick={() => navigateImage('prev')}
                    title="Previous (←)"
                  >
                    ❮
                  </button>
                  
                  <button 
                    className="modal-nav next" 
                    onClick={() => navigateImage('next')}
                    title="Next (→)"
                  >
                    ❯
                  </button>
                </>
              )}
              
              {/* Main Image */}
              <div className="modal-image-container">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="modal-image"
                  unoptimized
                  priority
                />
                
                {selectedImage.description && (
                  <div className="image-caption">
                    <p>{selectedImage.description}</p>
                  </div>
                )}
              </div>

              {/* Image Counter */}
              {filteredImages.length > 1 && (
                <div className="image-counter">
                  {filteredImages.findIndex(img => img.src === selectedImage.src) + 1} / {filteredImages.length}
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions">
                <button className="modal-action-btn">
                  <span>⬇️</span> Download
                </button>
                <button className="modal-action-btn">
                  <span>📤</span> Share
                </button>
                <button className="modal-action-btn">
                  <span>ℹ️</span> Info
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          color: #1e40af;
          font-size: 3rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gallery-stats {
          color: #64748b;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .gallery-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }

        .category-filter {
          display: flex;
          gap: 0.75rem;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border-color: #1e40af;
          transform: translateY(-2px);
        }

        .count {
          background: rgba(0,0,0,0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
        }

        .filter-btn.active .count {
          background: rgba(255,255,255,0.2);
        }

        .view-controls {
          display: flex;
          gap: 0.5rem;
        }

        .view-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .view-btn:hover,
        .view-btn.active {
          background: #1e40af;
          color: white;
          border-color: #1e40af;
        }

        .gallery-grid {
          display: grid;
          gap: 2rem;
        }

        .gallery-grid.grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .gallery-grid.masonry {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-auto-rows: 20px;
        }

        .gallery-item {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          position: relative;
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .image-container {
          position: relative;
          overflow: hidden;
        }

        .gallery-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-grid.masonry .gallery-image {
          height: auto;
          min-height: 200px;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 40%,
            rgba(0,0,0,0.3) 70%,
            rgba(0,0,0,0.8) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          margin-top: auto;
        }

        .overlay-content h3 {
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .image-description {
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        .image-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.8);
        }

        .overlay-actions {
          display: flex;
          gap: 0.5rem;
          align-self: flex-end;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(30, 64, 175, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
          backdrop-filter: blur(10px);
        }

        .no-images {
          text-align: center;
          padding: 5rem 2rem;
          color: #64748b;
        }

        .no-images-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          opacity: 0.5;
        }

        .no-images h3 {
          color: #1e40af;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .no-images p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .reset-btn {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .reset-btn:hover {
          transform: translateY(-2px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-overlay.fullscreen {
          padding: 0;
        }

        .modal-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-overlay.fullscreen .modal-content {
          max-width: 100vw;
          max-height: 100vh;
          border-radius: 0;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
        }

        .modal-info h3 {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .modal-meta {
          display: flex;
          gap: 1rem;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
        }

        .modal-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .control-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          font-size: 2rem;
          padding: 1rem;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 1001;
        }

        .modal-nav:hover {
          background: rgba(0,0,0,0.7);
          transform: translateY(-50%) scale(1.1);
        }

        .modal-nav.prev {
          left: 2rem;
        }

        .modal-nav.next {
          right: 2rem;
        }

        .modal-image-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .modal-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .image-caption {
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          max-width: 600px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .image-counter {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
        }

        .modal-action-btn {
          flex: 1;
          background: rgba(255,255,255,0.1);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .modal-action-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .gallery-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .category-filter {
            justify-content: center;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .modal-nav {
            top: auto;
            bottom: 8rem;
            transform: none;
            padding: 0.75rem;
            font-size: 1.5rem;
          }

          .modal-nav.prev {
            left: 1rem;
          }

          .modal-nav.next {
            right: 1rem;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .modal-controls {
            align-self: flex-end;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;
