import React from 'react';
import SentimentBadge from './SentimentBadge';

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            <SentimentBadge sentiment={review.analysis.sentiment} />
          </div>

          <p>{review.text}</p>

          <div className="probabilities">
            <span>Good: {review.analysis.probabilities.Good}%</span>
            <span>Neutral: {review.analysis.probabilities.Neutral}%</span>
            <span>Bad: {review.analysis.probabilities.Bad}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
