import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import {
  extractFirstImageUrl,
  fetchKcmFeed,
  KCM_RSS_URL,
  type KcmRssItem,
} from '../lib/kcm-rss';
import styles from '../styles/Home.module.css';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
  enclosure?: {
    url: string;
    type: string;
  };
  image?: string;
}

interface BlogPageProps {
  posts: BlogPost[];
  error?: string;
}

const Blog = ({ posts, error }: BlogPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Get all unique categories
  const categories = Array.from(
    new Set(posts.flatMap(post => post.categories || []))
  );

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.categories?.includes(selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <Head>
        <title>Market Insights & Blog - Emerson Estates</title>
        <meta name="description" content="Stay informed with the latest real estate market insights, trends, and valuable information for home buyers and sellers in Las Vegas." />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Market Insights & Blog</h1>
            <p className={styles.subtitle}>Stay Informed with Expert Market Analysis</p>
            <p className={styles.description}>
              Get the latest real estate insights, market trends, and expert advice 
              to help you make informed decisions in the Las Vegas market.
            </p>
          </div>
        </section>

        {error && (
          <section className={styles.section}>
            <div className="error-message">
              <h2>Unable to Load Blog Posts</h2>
              <p>{error}</p>
              <p>Please check back later or contact us for the latest market insights.</p>
            </div>
          </section>
        )}

        {!error && (
          <>
            <section className={styles.section}>
              <div className="blog-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="category-filter">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="blog-stats">
                <p>Showing {filteredPosts.length} of {posts.length} articles</p>
              </div>
            </section>

            <section className={styles.section}>
              <div className="blog-grid">
                {filteredPosts.map((post, index) => (
                  <article key={post.guid || index} className="blog-card">
                    {(post.image || post.enclosure?.url) && (
                      <div className="blog-image">
                        <img
                          src={post.image || post.enclosure?.url}
                          alt={post.title}
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-date">{formatDate(post.pubDate)}</span>
                        {post.creator && (
                          <span className="blog-author">By {post.creator}</span>
                        )}
                      </div>

                      <h2 className="blog-title">
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </h2>

                      <p className="blog-excerpt">{post.contentSnippet}</p>

                      {post.categories && post.categories.length > 0 && (
                        <div className="blog-categories">
                          {post.categories.map(category => (
                            <span key={category} className="category-tag">
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="blog-actions">
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="read-more-btn"
                        >
                          Read Full Article →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="no-results">
                  <h3>No articles found</h3>
                  <p>Try adjusting your search or category filter.</p>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <div className="newsletter-signup">
                <h2>Stay Updated</h2>
                <p>Get the latest market insights delivered to your inbox.</p>
                <div className="signup-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="email-input"
                  />
                  <button className="signup-btn">Subscribe</button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <style jsx>{`
        .blog-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .category-select {
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          min-width: 200px;
        }

        .blog-stats {
          color: #64748b;
          margin-bottom: 2rem;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .blog-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border-color: #3b82f6;
        }

        .blog-image {
          height: 200px;
          overflow: hidden;
        }

        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 1.5rem;
        }

        .blog-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #64748b;
        }

        .blog-title {
          margin-bottom: 1rem;
          font-size: 1.5rem;
          line-height: 1.3;
        }

        .blog-title a {
          color: #1e40af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .blog-title a:hover {
          color: #3b82f6;
        }

        .blog-excerpt {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .blog-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .category-tag {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .blog-actions {
          text-align: right;
        }

        .read-more-btn {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .read-more-btn:hover {
          color: #1e40af;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
        }

        .newsletter-signup {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 3rem;
          border-radius: 16px;
          text-align: center;
        }

        .newsletter-signup h2 {
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .newsletter-signup p {
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .signup-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .email-input {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
        }

        .signup-btn {
          padding: 1rem 2rem;
          background: white;
          color: #1e40af;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
        }

        .error-message {
          text-align: center;
          padding: 3rem;
          background: #fef2f2;
          border-radius: 16px;
          color: #dc2626;
        }

        .error-message h2 {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .blog-controls {
            flex-direction: column;
          }

          .search-box {
            min-width: auto;
          }

          .category-select {
            min-width: auto;
            width: 100%;
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }

          .signup-form {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await fetchKcmFeed();

    const posts = feed.items.map((item: KcmRssItem) => {
      const htmlContent =
        item['content:encoded'] || item.content || item.contentSnippet || '';
      const image = extractFirstImageUrl(htmlContent);

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        creator: item.creator || item['dc:creator'] || '',
        content: htmlContent,
        contentSnippet: item.contentSnippet || '',
        guid: item.guid || item.link || '',
        categories: item.categories || [],
        isoDate: item.isoDate || '',
        enclosure: item.enclosure || null,
        image,
      };
    });

    return {
      props: {
        posts
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error(`Error fetching RSS feed (${KCM_RSS_URL}):`, error);

    return {
      props: {
        posts: [],
        error: 'Unable to fetch the latest blog posts. Please try again later.'
      },
      revalidate: 300 // Retry in 5 minutes if there's an error
    };
  }
};

export default Blog;