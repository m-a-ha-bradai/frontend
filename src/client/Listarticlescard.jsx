import React, { useEffect, useState } from 'react';

import { fetcharticles } from '../services/articleservice';
import Card from './Card';

const Listarticlescard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcharticles();
        setArticles(response.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="card-container">
      {articles.map((art) => (
        <Card
          key={art._id}
          imageart={art.imageart}
          reference={art.reference}
          designation={art.designation}
          prix={art.prix}
        />
      ))}
    </div>
  );
};

export default Listarticlescard