'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from('Articles').select('*');
      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>My Articles</div>
        <div style={styles.navLinks}>
          <Link href="/" style={styles.navLink}>
            Home
          </Link>
          <Link href="/add-article" style={styles.navLink}>
            Add Article
          </Link>
          <Link href="/about-us" style={styles.navLink}>
            About Us
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>Welcome to the Homepage</h1>
        <p style={styles.subheading}>Explore the latest articles below:</p>
        <div style={styles.grid}>
          {articles.map((article) => (
            <div key={article.id} style={styles.card}>
              <img
                src={article.image || 'https://c.ndtvimg.com/2025-01/hm8m7qrg_south-korea-yoon-arrest_625x300_03_January_25.jpeg'}
                alt={article.title}
                style={styles.thumbnail}
              />
              <h2 style={styles.cardTitle}>{article.title}</h2>
              <p style={styles.cardAuthor}>By: {article.author || 'Unknown'}</p>
              <Link href={`/article/${article.id}`} style={styles.readMore}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0070f3',
    padding: '10px 20px',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navBrand: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
  mainContent: {
    padding: '20px',
  },
  heading: {
    fontSize: '28px',
    textAlign: 'center',
    margin: '20px 0',
  },
  subheading: {
    fontSize: '18px',
    textAlign: 'center',
    margin: '10px 0 20px',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  cardTitle: {
    fontSize: '18px',
    margin: '10px 15px',
  },
  cardAuthor: {
    fontSize: '14px',
    margin: '0 15px',
    color: '#666',
  },
  readMore: {
    display: 'inline-block',
    margin: '15px',
    color: '#0070f3',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#555',
  },
};
