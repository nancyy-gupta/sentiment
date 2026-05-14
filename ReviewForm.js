import React, { useState, useRef, useEffect } from 'react';

function ReviewForm({ onAddReview }) {
  const [review, setReview] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!review.trim()) return;
    onAddReview(review);
    setReview('');
    textareaRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        ref={textareaRef}
        rows="4"
        placeholder="Write your review..."
        value={review}
        onChange={e => setReview(e.target.value)}
      />
      <button type="submit">Analyze Review</button>
    </form>
  );
}

export default ReviewForm;
