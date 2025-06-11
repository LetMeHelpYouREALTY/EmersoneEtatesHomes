
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

const BlogPage: NextPage = () => {
  const blogPosts = [
    {
      title: "Las Vegas Luxury Real Estate Market Trends for 2024",
      excerpt: "Explore the latest trends shaping the luxury real estate market in Las Vegas, including buyer preferences and price movements.",
      date: "January 15, 2024",
      category: "Market Analysis",
      readTime: "5 min read"
    },
    {
      title: "Top 10 Amenities Buyers Want in Luxury Las Vegas Homes",
      excerpt: "Discover what luxury home buyers are looking for in today's competitive Las Vegas market, from smart home features to resort-style amenities.",
      date: "January 10, 2024",
      category: "Buying Tips",
      readTime: "7 min read"
    },
    {
      title: "Emerson Estates: A Deep Dive into Las Vegas' Premier Community",
      excerpt: "Everything you need to know about living in Emerson Estates, from amenities and location benefits to property values and community culture.",
      date: "January 5, 2024",
      category: "Community Spotlight",
      readTime: "6 min read"
    },
    {
      title: "Investment Strategies for Las Vegas Luxury Real Estate",
      excerpt: "Learn how to build wealth through strategic luxury real estate investments in the Las Vegas market with insights from Dr. Duffy.",
      date: "December 28, 2023",
      category: "Investment",
      readTime: "8 min read"
    },
    {
      title: "Staging Your Luxury Home for Maximum Sale Price",
      excerpt: "Professional tips on how to stage your luxury property to appeal to high-end buyers and achieve the best possible sale price.",
      date: "December 20, 2023",
      category: "Selling Tips",
      readTime: "5 min read"
    },
    {
      title: "The Benefits of Working with a PhD Real Estate Agent",
      excerpt: "Understand the unique advantages of working with Dr. Duffy and how academic rigor translates to superior real estate outcomes.",
      date: "December 15, 2023",
      category: "Agent Insights",
      readTime: "4 min read"
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Las Vegas Real Estate Blog | Market Insights & Tips by Dr. Duffy"
        description="Stay informed with the latest Las Vegas real estate news, market insights, luxury home trends, and expert tips from Dr. Duffy at Emerson Estates."
        keywords="Las Vegas real estate blog, luxury home tips, market insights, property investment, real estate news Nevada, Dr. Duffy blog"
        pathname="/blog"
      />

      <main>
        {/* Hero Section */}
        <section className={styles.section} style={{ 
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', 
          color: 'white',
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Real Estate Insights & Tips
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
              Expert analysis, market trends, and practical advice for Las Vegas luxury real estate
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
              overflow: 'hidden',
              marginBottom: '3rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '400px' }}>
                <div style={{ 
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '4rem'
                }}>
                  📊
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#1e40af', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    FEATURED POST
                  </div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
                    {blogPosts[0].title}
                  </h2>
                  <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#666' }}>
                    {blogPosts[0].excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#888' }}>
                    <span>{blogPosts[0].date}</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Latest Articles
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {blogPosts.slice(1).map((post, index) => (
                <article 
                  key={index}
                  style={{ 
                    background: 'white', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)', 
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ 
                    height: '120px', 
                    background: `linear-gradient(135deg, #1e40af, #3b82f6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem'
                  }}>
                    {post.category === 'Market Analysis' && '📈'}
                    {post.category === 'Buying Tips' && '🏠'}
                    {post.category === 'Community Spotlight' && '🌟'}
                    {post.category === 'Investment' && '💰'}
                    {post.category === 'Selling Tips' && '💼'}
                    {post.category === 'Agent Insights' && '🎓'}
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      display: 'inline-block',
                      background: '#e0f2fe', 
                      color: '#1e40af', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem'
                    }}>
                      {post.category}
                    </div>
                    
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333', lineHeight: '1.4' }}>
                      {post.title}
                    </h3>
                    
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#666', fontSize: '0.95rem' }}>
                      {post.excerpt}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      fontSize: '0.85rem', 
                      color: '#888',
                      borderTop: '1px solid #f0f0f0',
                      paddingTop: '1rem'
                    }}>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className={styles.section}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#1e40af' }}>
              Stay Informed
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
              Subscribe to receive the latest market insights, luxury home trends, and expert tips 
              directly from Dr. Duffy.
            </p>
            
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '12px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  style={{
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    background: '#1e40af',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe to Newsletter
                </button>
              </form>
              
              <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem' }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Browse by Category
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {['Market Analysis', 'Buying Tips', 'Selling Tips', 'Investment', 'Community Spotlight', 'Agent Insights'].map((category, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>{category}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    {blogPosts.filter(post => post.category === category).length} articles
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default BlogPage;
import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  guid: string;
  contentSnippet: string;
}

interface BlogProps {
  posts: BlogPost[];
  error?: string;
}

const Blog: NextPage<BlogProps> = ({ posts, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean)));

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (error) {
    return (
      <Layout
        title="Market Insights Blog - Emerson Estates"
        description="Stay informed about Las Vegas real estate market trends and insights with our latest blog posts."
      >
        <SEOHead
          title="Market Insights Blog - Emerson Estates"
          description="Stay informed about Las Vegas real estate market trends and insights with our latest blog posts."
          keywords="Las Vegas real estate blog, market insights, property trends, real estate news"
          pathname="/blog"
        />
        
        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.title}>Market Insights Blog</h1>
              <p className={styles.subtitle}>Stay Informed About Real Estate Trends</p>
              <div className="error-message">
                <p>Sorry, we're having trouble loading the latest market insights. Please try again later.</p>
                <p className="error-details">{error}</p>
              </div>
            </div>
          </section>
        </main>

        <style jsx>{`
          .error-message {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            color: #dc2626;
            margin: 20px 0;
          }
          .error-details {
            font-size: 14px;
            color: #6b7280;
            margin-top: 8px;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout
      title="Market Insights Blog - Emerson Estates"
      description="Stay informed about Las Vegas real estate market trends and insights with our latest blog posts."
    >
      <SEOHead
        title="Market Insights Blog - Emerson Estates"
        description="Stay informed about Las Vegas real estate market trends and insights with our latest blog posts."
        keywords="Las Vegas real estate blog, market insights, property trends, real estate news"
        pathname="/blog"
      />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Market Insights Blog</h1>
            <p className={styles.subtitle}>Stay Informed About Real Estate Trends</p>
            <p className={styles.description}>
              Get the latest insights on the Las Vegas real estate market with expert analysis, 
              trends, and valuable information to help you make informed decisions.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="blog-container">
            {/* Search and Filter Controls */}
            <div className="blog-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              {categories.length > 0 && (
                <div className="filter-container">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-filter"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="blog-posts-grid">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <article key={post.guid || index} className="blog-post-card">
                    <div className="post-content">
                      <div className="post-meta">
                        <time className="post-date">{formatDate(post.pubDate)}</time>
                        {post.category && (
                          <span className="post-category">{post.category}</span>
                        )}
                      </div>
                      
                      <h2 className="post-title">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="post-link"
                        >
                          {post.title}
                        </a>
                      </h2>
                      
                      <p className="post-excerpt">
                        {post.contentSnippet || post.description}
                      </p>
                      
                      <div className="post-actions">
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
                ))
              ) : (
                <div className="no-results">
                  <h3>No posts found</h3>
                  <p>Try adjusting your search terms or filters.</p>
                </div>
              )}
            </div>

            {/* RSS Attribution */}
            <div className="rss-attribution">
              <p>
                Market insights powered by{" "}
                <a
                  href="https://www.simplifyingthemarket.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attribution-link"
                >
                  Simplifying The Market
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-controls {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-container {
          flex: 1;
          min-width: 250px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .filter-container {
          min-width: 180px;
        }

        .category-filter {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          background: white;
          cursor: pointer;
        }

        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .blog-post-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .blog-post-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .post-content {
          padding: 24px;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .post-date {
          color: #6b7280;
        }

        .post-category {
          background: #dbeafe;
          color: #1d4ed8;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .post-title {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 12px;
          color: #1a365d;
        }

        .post-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .post-link:hover {
          color: #2563eb;
        }

        .post-excerpt {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-actions {
          margin-top: auto;
        }

        .read-more-btn {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .read-more-btn:hover {
          color: #1d4ed8;
          transform: translateX(2px);
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-results h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: #374151;
        }

        .rss-attribution {
          text-align: center;
          padding: 30px 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }

        .attribution-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .attribution-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .blog-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container,
          .filter-container {
            min-width: 100%;
          }

          .blog-posts-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .post-content {
            padding: 20px;
          }

          .post-title {
            font-size: 18px;
          }
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const Parser = require('rss-parser');
    const parser = new Parser({
      customFields: {
        item: ['category', 'contentSnippet']
      }
    });

    const feed = await parser.parseURL('https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18');
    
    const posts: BlogPost[] = feed.items.slice(0, 20).map((item: any) => ({
      title: item.title || 'Untitled Post',
      description: item.contentSnippet || item.content || item.description || '',
      link: item.link || '#',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      category: item.category || item.categories?.[0] || 'Market Insights',
      guid: item.guid || item.link || Math.random().toString(),
      contentSnippet: item.contentSnippet || item.content || item.description || ''
    }));

    return {
      props: {
        posts
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    return {
      props: {
        posts: [],
        error: 'Unable to load market insights at this time.'
      },
      revalidate: 300 // Try again in 5 minutes on error
    };
  }
};

export default Blog;
