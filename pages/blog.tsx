
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
