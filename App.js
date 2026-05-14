import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { analyzeSentiment } from './utils/sentimentEngine';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const sampleReviews = [
      'Very comfortable and breathable. I wore it for 12 hours.',
      'The shoe feels flimsy and uncomfortable.',
      'The design is okay and looks decent.',
    ];

    const analyzed = sampleReviews.map(text => ({
      text,
      analysis: analyzeSentiment(text),
    }));

    setReviews(analyzed);
  }, []);

  const addReview = text => {
    const newReview = {
      text,
      analysis: analyzeSentiment(text),
    };

    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="app">
      <h1>Shoe Review Sentiment Analyzer</h1>
      <ProductCard />
      <ReviewForm onAddReview={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default App;
